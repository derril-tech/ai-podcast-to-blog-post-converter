"""
EchoPress AI Backend - Content Generation Service
RAG-based content generation with citations and brand voice enforcement
"""

import asyncio
import logging
from typing import Dict, Any, List, Optional
import json
from datetime import datetime

import openai
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import PGVector
from langchain.schema import Document
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field

from app.core.config import settings
from app.models.episode import Episode
from app.models.transcript import Transcript, TranscriptSegment
from app.models.draft import Draft
from app.models.brand_voice import BrandVoice

logger = logging.getLogger(__name__)

class Citation(BaseModel):
    """Citation model for RAG-generated content"""
    text: str = Field(description="The cited text from the transcript")
    start_ms: int = Field(description="Start time in milliseconds")
    end_ms: int = Field(description="End time in milliseconds")
    speaker: Optional[str] = Field(description="Speaker name if available")
    confidence: float = Field(description="Confidence score")

class BlogPostSection(BaseModel):
    """Blog post section with citations"""
    title: str = Field(description="Section title")
    content: str = Field(description="Section content")
    citations: List[Citation] = Field(description="Citations for this section")

class BlogPostDraft(BaseModel):
    """Complete blog post draft"""
    title: str = Field(description="Blog post title")
    introduction: str = Field(description="Introduction paragraph")
    sections: List[BlogPostSection] = Field(description="Main content sections")
    conclusion: str = Field(description="Conclusion paragraph")
    key_takeaways: List[str] = Field(description="Key takeaways from the episode")

class ContentGenerationService:
    """Service for RAG-based content generation"""
    
    def __init__(self):
        self.openai_client = openai.AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        self.embeddings = OpenAIEmbeddings(openai_api_key=settings.OPENAI_API_KEY)
        self.llm = ChatOpenAI(
            model=settings.OPENAI_MODEL,
            temperature=0.7,
            openai_api_key=settings.OPENAI_API_KEY
        )
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len
        )
    
    async def generate_blog_post(
        self,
        episode: Episode,
        transcript: Transcript,
        segments: List[TranscriptSegment],
        brand_voice: Optional[BrandVoice] = None
    ) -> BlogPostDraft:
        """
        Generate blog post using RAG with transcript grounding
        
        Args:
            episode: Episode model instance
            transcript: Transcript model instance
            segments: List of transcript segments
            brand_voice: Optional brand voice configuration
            
        Returns:
            BlogPostDraft with citations
        """
        try:
            logger.info(f"Starting blog post generation for episode {episode.id}")
            
            # Create vector store from transcript segments
            vector_store = await self._create_vector_store(segments)
            
            # Generate blog post structure
            blog_structure = await self._generate_structure(episode, transcript, brand_voice)
            
            # Generate content for each section
            sections = []
            for section_info in blog_structure["sections"]:
                section_content = await self._generate_section_content(
                    section_info,
                    vector_store,
                    brand_voice
                )
                sections.append(section_content)
            
            # Generate introduction and conclusion
            introduction = await self._generate_introduction(episode, transcript, brand_voice)
            conclusion = await self._generate_conclusion(episode, transcript, brand_voice)
            key_takeaways = await self._extract_key_takeaways(transcript, brand_voice)
            
            blog_post = BlogPostDraft(
                title=blog_structure["title"],
                introduction=introduction,
                sections=sections,
                conclusion=conclusion,
                key_takeaways=key_takeaways
            )
            
            logger.info(f"Blog post generation completed for episode {episode.id}")
            return blog_post
            
        except Exception as e:
            logger.error(f"Blog post generation failed for episode {episode.id}: {e}")
            raise
    
    async def _create_vector_store(self, segments: List[TranscriptSegment]) -> PGVector:
        """Create vector store from transcript segments"""
        try:
            # Create documents from segments
            documents = []
            for segment in segments:
                doc = Document(
                    page_content=segment.text,
                    metadata={
                        "start_ms": segment.start_ms,
                        "end_ms": segment.end_ms,
                        "speaker": segment.speaker,
                        "confidence": segment.confidence,
                        "topic": segment.topic
                    }
                )
                documents.append(doc)
            
            # Split documents if needed
            split_docs = self.text_splitter.split_documents(documents)
            
            # Create vector store
            vector_store = PGVector.from_documents(
                documents=split_docs,
                embedding=self.embeddings,
                collection_name=f"episode_{segments[0].transcript_id}",
                connection_string=settings.DATABASE_URL
            )
            
            return vector_store
            
        except Exception as e:
            logger.error(f"Vector store creation failed: {e}")
            raise
    
    async def _generate_structure(
        self,
        episode: Episode,
        transcript: Transcript,
        brand_voice: Optional[BrandVoice]
    ) -> Dict[str, Any]:
        """Generate blog post structure and outline"""
        
        # Create prompt for structure generation
        structure_prompt = ChatPromptTemplate.from_template("""
        Create a blog post structure for a podcast episode about "{title}".
        
        Episode description: {description}
        Transcript length: {transcript_length} words
        
        Brand voice: {brand_voice}
        
        Generate a structure with:
        1. A compelling title
        2. 3-5 main sections with descriptive titles
        
        Return as JSON:
        {{
            "title": "Compelling Blog Post Title",
            "sections": [
                {{"title": "Section Title", "description": "What this section covers"}}
            ]
        }}
        """)
        
        # Get brand voice instructions
        brand_voice_instructions = ""
        if brand_voice:
            brand_voice_instructions = f"Tone: {brand_voice.tone}, Style: {brand_voice.style_guide}"
        
        # Generate structure
        response = await self.llm.agenerate([
            structure_prompt.format_messages(
                title=episode.title,
                description=episode.description or "",
                transcript_length=len(transcript.text.split()),
                brand_voice=brand_voice_instructions
            )
        ])
        
        # Parse response
        structure_text = response.generations[0][0].text
        try:
            structure = json.loads(structure_text)
            return structure
        except json.JSONDecodeError:
            logger.warning("Failed to parse structure JSON, using fallback")
            return {
                "title": f"Key Insights from: {episode.title}",
                "sections": [
                    {"title": "Introduction", "description": "Overview of the episode"},
                    {"title": "Main Discussion", "description": "Key points from the conversation"},
                    {"title": "Key Takeaways", "description": "Important insights and lessons"}
                ]
            }
    
    async def _generate_section_content(
        self,
        section_info: Dict[str, str],
        vector_store: PGVector,
        brand_voice: Optional[BrandVoice]
    ) -> BlogPostSection:
        """Generate content for a specific section using RAG"""
        
        # Retrieve relevant segments
        relevant_docs = vector_store.similarity_search(
            section_info["description"],
            k=5
        )
        
        # Create citations from retrieved documents
        citations = []
        for doc in relevant_docs:
            citation = Citation(
                text=doc.page_content,
                start_ms=doc.metadata["start_ms"],
                end_ms=doc.metadata["end_ms"],
                speaker=doc.metadata.get("speaker"),
                confidence=doc.metadata.get("confidence", 0.0)
            )
            citations.append(citation)
        
        # Generate content prompt
        content_prompt = ChatPromptTemplate.from_template("""
        Write a blog post section about "{section_title}".
        
        Section description: {section_description}
        
        Relevant transcript segments:
        {transcript_segments}
        
        Brand voice: {brand_voice}
        
        Write engaging, informative content that:
        1. Is grounded in the provided transcript segments
        2. Maintains the specified brand voice
        3. Is well-structured and readable
        4. Includes specific examples and insights
        
        Return only the content text, no additional formatting.
        """)
        
        # Format transcript segments
        transcript_text = "\n\n".join([
            f"Speaker {doc.metadata.get('speaker', 'Unknown')}: {doc.page_content}"
            for doc in relevant_docs
        ])
        
        # Get brand voice instructions
        brand_voice_instructions = ""
        if brand_voice:
            brand_voice_instructions = f"Tone: {brand_voice.tone}, Style: {brand_voice.style_guide}"
        
        # Generate content
        response = await self.llm.agenerate([
            content_prompt.format_messages(
                section_title=section_info["title"],
                section_description=section_info["description"],
                transcript_segments=transcript_text,
                brand_voice=brand_voice_instructions
            )
        ])
        
        content = response.generations[0][0].text.strip()
        
        return BlogPostSection(
            title=section_info["title"],
            content=content,
            citations=citations
        )
    
    async def _generate_introduction(
        self,
        episode: Episode,
        transcript: Transcript,
        brand_voice: Optional[BrandVoice]
    ) -> str:
        """Generate blog post introduction"""
        
        intro_prompt = ChatPromptTemplate.from_template("""
        Write an engaging introduction for a blog post about the podcast episode "{title}".
        
        Episode description: {description}
        Transcript length: {transcript_length} words
        
        Brand voice: {brand_voice}
        
        The introduction should:
        1. Hook the reader
        2. Provide context about the episode
        3. Set expectations for what the reader will learn
        4. Be 2-3 paragraphs long
        
        Return only the introduction text.
        """)
        
        brand_voice_instructions = ""
        if brand_voice:
            brand_voice_instructions = f"Tone: {brand_voice.tone}, Style: {brand_voice.style_guide}"
        
        response = await self.llm.agenerate([
            intro_prompt.format_messages(
                title=episode.title,
                description=episode.description or "",
                transcript_length=len(transcript.text.split()),
                brand_voice=brand_voice_instructions
            )
        ])
        
        return response.generations[0][0].text.strip()
    
    async def _generate_conclusion(
        self,
        episode: Episode,
        transcript: Transcript,
        brand_voice: Optional[BrandVoice]
    ) -> str:
        """Generate blog post conclusion"""
        
        conclusion_prompt = ChatPromptTemplate.from_template("""
        Write a conclusion for a blog post about the podcast episode "{title}".
        
        Brand voice: {brand_voice}
        
        The conclusion should:
        1. Summarize key insights
        2. Provide actionable takeaways
        3. End with a compelling call-to-action
        4. Be 1-2 paragraphs long
        
        Return only the conclusion text.
        """)
        
        brand_voice_instructions = ""
        if brand_voice:
            brand_voice_instructions = f"Tone: {brand_voice.tone}, Style: {brand_voice.style_guide}"
        
        response = await self.llm.agenerate([
            conclusion_prompt.format_messages(
                title=episode.title,
                brand_voice=brand_voice_instructions
            )
        ])
        
        return response.generations[0][0].text.strip()
    
    async def _extract_key_takeaways(
        self,
        transcript: Transcript,
        brand_voice: Optional[BrandVoice]
    ) -> List[str]:
        """Extract key takeaways from the transcript"""
        
        takeaways_prompt = ChatPromptTemplate.from_template("""
        Extract 3-5 key takeaways from this podcast transcript:
        
        {transcript}
        
        Brand voice: {brand_voice}
        
        Return as a JSON array of strings:
        ["Takeaway 1", "Takeaway 2", "Takeaway 3"]
        """)
        
        brand_voice_instructions = ""
        if brand_voice:
            brand_voice_instructions = f"Tone: {brand_voice.tone}, Style: {brand_voice.style_guide}"
        
        response = await self.llm.agenerate([
            takeaways_prompt.format_messages(
                transcript=transcript.text[:2000],  # Limit length
                brand_voice=brand_voice_instructions
            )
        ])
        
        try:
            takeaways_text = response.generations[0][0].text
            takeaways = json.loads(takeaways_text)
            return takeaways if isinstance(takeaways, list) else []
        except json.JSONDecodeError:
            logger.warning("Failed to parse takeaways JSON")
            return ["Key insights from the episode", "Important lessons learned", "Actionable next steps"]
    
    async def create_draft_from_blog_post(
        self,
        episode: Episode,
        blog_post: BlogPostDraft
    ) -> Draft:
        """Create a Draft model from generated blog post"""
        
        # Convert blog post to markdown
        markdown_content = self._convert_to_markdown(blog_post)
        
        # Create citations JSON
        all_citations = []
        for section in blog_post.sections:
            for citation in section.citations:
                all_citations.append({
                    "text": citation.text,
                    "start_ms": citation.start_ms,
                    "end_ms": citation.end_ms,
                    "speaker": citation.speaker,
                    "confidence": citation.confidence,
                    "section": section.title
                })
        
        # Create draft
        draft = Draft(
            id=f"draft_{episode.id}_v1",
            episode_id=episode.id,
            title=blog_post.title,
            content=markdown_content,
            version=1,
            status="completed",
            citations=all_citations,
            seo_data={
                "title": blog_post.title,
                "key_takeaways": blog_post.key_takeaways,
                "word_count": len(markdown_content.split()),
                "generated_at": datetime.now().isoformat()
            }
        )
        
        return draft
    
    def _convert_to_markdown(self, blog_post: BlogPostDraft) -> str:
        """Convert blog post to markdown format"""
        markdown = f"# {blog_post.title}\n\n"
        
        # Introduction
        markdown += f"{blog_post.introduction}\n\n"
        
        # Sections
        for section in blog_post.sections:
            markdown += f"## {section.title}\n\n"
            markdown += f"{section.content}\n\n"
            
            # Add citations if any
            if section.citations:
                markdown += "**References:**\n"
                for i, citation in enumerate(section.citations, 1):
                    speaker = citation.speaker or "Unknown"
                    markdown += f"{i}. {speaker} ({citation.start_ms//1000}s-{citation.end_ms//1000}s)\n"
                markdown += "\n"
        
        # Conclusion
        markdown += f"## Conclusion\n\n{blog_post.conclusion}\n\n"
        
        # Key takeaways
        markdown += "## Key Takeaways\n\n"
        for takeaway in blog_post.key_takeaways:
            markdown += f"- {takeaway}\n"
        
        return markdown
