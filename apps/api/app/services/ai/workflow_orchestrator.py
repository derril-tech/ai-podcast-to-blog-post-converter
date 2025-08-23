"""
EchoPress AI Backend - Workflow Orchestrator
LangGraph-based workflow for end-to-end podcast to blog conversion
"""

import asyncio
import logging
from typing import Dict, Any, List, Optional
from datetime import datetime
import json

from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from pydantic import BaseModel, Field

from app.core.config import settings
from app.models.episode import Episode
from app.models.transcript import Transcript, TranscriptSegment
from app.models.draft import Draft
from app.models.brand_voice import BrandVoice
from app.services.ai.transcription_service import TranscriptionService
from app.services.ai.content_generation_service import ContentGenerationService, BlogPostDraft

logger = logging.getLogger(__name__)

class WorkflowState(BaseModel):
    """State for the LangGraph workflow"""
    episode_id: str = Field(description="Episode ID")
    episode: Optional[Episode] = Field(default=None, description="Episode model")
    audio_file_path: Optional[str] = Field(default=None, description="Path to audio file")
    transcript: Optional[Transcript] = Field(default=None, description="Generated transcript")
    segments: List[TranscriptSegment] = Field(default_factory=list, description="Transcript segments")
    brand_voice: Optional[BrandVoice] = Field(default=None, description="Brand voice configuration")
    blog_post: Optional[BlogPostDraft] = Field(default=None, description="Generated blog post")
    draft: Optional[Draft] = Field(default=None, description="Final draft")
    status: str = Field(default="initialized", description="Current workflow status")
    error: Optional[str] = Field(default=None, description="Error message if any")
    progress: float = Field(default=0.0, description="Progress percentage")
    logs: List[str] = Field(default_factory=list, description="Workflow logs")

class WorkflowOrchestrator:
    """Orchestrates the end-to-end podcast to blog conversion workflow"""
    
    def __init__(self):
        self.transcription_service = TranscriptionService()
        self.content_generation_service = ContentGenerationService()
        self.graph = self._build_workflow_graph()
        self.memory = MemorySaver()
    
    def _build_workflow_graph(self) -> StateGraph:
        """Build the LangGraph workflow"""
        
        # Create state graph
        workflow = StateGraph(WorkflowState)
        
        # Add nodes
        workflow.add_node("validate_input", self._validate_input)
        workflow.add_node("transcribe_audio", self._transcribe_audio)
        workflow.add_node("generate_content", self._generate_content)
        workflow.add_node("create_draft", self._create_draft)
        workflow.add_node("handle_error", self._handle_error)
        
        # Add edges
        workflow.add_edge("validate_input", "transcribe_audio")
        workflow.add_edge("transcribe_audio", "generate_content")
        workflow.add_edge("generate_content", "create_draft")
        workflow.add_edge("create_draft", END)
        
        # Add conditional edges for error handling
        workflow.add_conditional_edges(
            "validate_input",
            self._should_continue,
            {
                "continue": "transcribe_audio",
                "error": "handle_error"
            }
        )
        
        workflow.add_conditional_edges(
            "transcribe_audio",
            self._should_continue,
            {
                "continue": "generate_content",
                "error": "handle_error"
            }
        )
        
        workflow.add_conditional_edges(
            "generate_content",
            self._should_continue,
            {
                "continue": "create_draft",
                "error": "handle_error"
            }
        )
        
        workflow.add_edge("handle_error", END)
        
        return workflow.compile(checkpointer=self.memory)
    
    async def _validate_input(self, state: WorkflowState) -> WorkflowState:
        """Validate input and prepare for processing"""
        try:
            state.logs.append(f"[{datetime.now()}] Validating input for episode {state.episode_id}")
            state.progress = 10.0
            
            # Validate episode exists
            if not state.episode:
                state.error = "Episode not found"
                state.status = "failed"
                return state
            
            # Validate audio file exists
            if not state.audio_file_path:
                state.error = "Audio file not found"
                state.status = "failed"
                return state
            
            # Update episode status
            state.episode.status = "processing"
            state.status = "validated"
            state.logs.append(f"[{datetime.now()}] Input validation completed")
            
            return state
            
        except Exception as e:
            state.error = f"Validation failed: {str(e)}"
            state.status = "failed"
            state.logs.append(f"[{datetime.now()}] Validation error: {str(e)}")
            return state
    
    async def _transcribe_audio(self, state: WorkflowState) -> WorkflowState:
        """Transcribe audio file"""
        try:
            state.logs.append(f"[{datetime.now()}] Starting audio transcription")
            state.progress = 25.0
            state.status = "transcribing"
            
            # Perform transcription
            transcript, segments = await self.transcription_service.process_episode(
                state.episode,
                state.audio_file_path
            )
            
            # Update state
            state.transcript = transcript
            state.segments = segments
            state.episode.status = "drafting"
            state.status = "transcribed"
            state.progress = 50.0
            state.logs.append(f"[{datetime.now()}] Transcription completed successfully")
            
            return state
            
        except Exception as e:
            state.error = f"Transcription failed: {str(e)}"
            state.status = "failed"
            state.logs.append(f"[{datetime.now()}] Transcription error: {str(e)}")
            return state
    
    async def _generate_content(self, state: WorkflowState) -> WorkflowState:
        """Generate blog post content using RAG"""
        try:
            state.logs.append(f"[{datetime.now()}] Starting content generation")
            state.progress = 75.0
            state.status = "generating"
            
            # Generate blog post
            blog_post = await self.content_generation_service.generate_blog_post(
                episode=state.episode,
                transcript=state.transcript,
                segments=state.segments,
                brand_voice=state.brand_voice
            )
            
            # Update state
            state.blog_post = blog_post
            state.status = "generated"
            state.progress = 90.0
            state.logs.append(f"[{datetime.now()}] Content generation completed")
            
            return state
            
        except Exception as e:
            state.error = f"Content generation failed: {str(e)}"
            state.status = "failed"
            state.logs.append(f"[{datetime.now()}] Content generation error: {str(e)}")
            return state
    
    async def _create_draft(self, state: WorkflowState) -> WorkflowState:
        """Create final draft from generated content"""
        try:
            state.logs.append(f"[{datetime.now()}] Creating final draft")
            state.progress = 95.0
            state.status = "finalizing"
            
            # Create draft
            draft = await self.content_generation_service.create_draft_from_blog_post(
                episode=state.episode,
                blog_post=state.blog_post
            )
            
            # Update state
            state.draft = draft
            state.episode.status = "completed"
            state.status = "completed"
            state.progress = 100.0
            state.logs.append(f"[{datetime.now()}] Workflow completed successfully")
            
            return state
            
        except Exception as e:
            state.error = f"Draft creation failed: {str(e)}"
            state.status = "failed"
            state.logs.append(f"[{datetime.now()}] Draft creation error: {str(e)}")
            return state
    
    async def _handle_error(self, state: WorkflowState) -> WorkflowState:
        """Handle workflow errors"""
        state.logs.append(f"[{datetime.now()}] Handling error: {state.error}")
        
        # Update episode status
        if state.episode:
            state.episode.status = "failed"
        
        state.status = "failed"
        return state
    
    def _should_continue(self, state: WorkflowState) -> str:
        """Determine if workflow should continue or handle error"""
        if state.error:
            return "error"
        return "continue"
    
    async def run_workflow(
        self,
        episode: Episode,
        audio_file_path: str,
        brand_voice: Optional[BrandVoice] = None,
        config: Optional[Dict[str, Any]] = None
    ) -> WorkflowState:
        """
        Run the complete workflow
        
        Args:
            episode: Episode model instance
            audio_file_path: Path to audio file
            brand_voice: Optional brand voice configuration
            config: Optional workflow configuration
            
        Returns:
            WorkflowState with results
        """
        try:
            logger.info(f"Starting workflow for episode {episode.id}")
            
            # Initialize state
            initial_state = WorkflowState(
                episode_id=episode.id,
                episode=episode,
                audio_file_path=audio_file_path,
                brand_voice=brand_voice,
                status="initialized",
                progress=0.0
            )
            
            # Run workflow
            config = config or {}
            config["configurable"] = {"thread_id": f"episode_{episode.id}"}
            
            result = await self.graph.ainvoke(initial_state, config)
            
            logger.info(f"Workflow completed for episode {episode.id}")
            return result
            
        except Exception as e:
            logger.error(f"Workflow failed for episode {episode.id}: {e}")
            # Return error state
            return WorkflowState(
                episode_id=episode.id,
                episode=episode,
                audio_file_path=audio_file_path,
                brand_voice=brand_voice,
                status="failed",
                error=str(e),
                progress=0.0,
                logs=[f"[{datetime.now()}] Workflow error: {str(e)}"]
            )
    
    async def get_workflow_status(self, episode_id: str) -> Optional[WorkflowState]:
        """Get current workflow status"""
        try:
            config = {"configurable": {"thread_id": f"episode_{episode_id}"}}
            state = await self.graph.aget_state(config)
            return state.values["validate_input"] if state else None
        except Exception as e:
            logger.error(f"Failed to get workflow status for episode {episode_id}: {e}")
            return None
    
    async def cancel_workflow(self, episode_id: str) -> bool:
        """Cancel running workflow"""
        try:
            config = {"configurable": {"thread_id": f"episode_{episode_id}"}}
            await self.graph.adelete(config)
            logger.info(f"Workflow cancelled for episode {episode_id}")
            return True
        except Exception as e:
            logger.error(f"Failed to cancel workflow for episode {episode_id}: {e}")
            return False
