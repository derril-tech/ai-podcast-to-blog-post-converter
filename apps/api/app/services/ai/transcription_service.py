"""
EchoPress AI Backend - Transcription Service
Audio transcription and diarization using OpenAI Whisper and pyannote.audio
"""

import asyncio
import logging
from typing import Dict, Any, Optional, List
import json
import tempfile
import os
from datetime import datetime

import openai
from pyannote.audio import Pipeline
from pyannote.audio.pipelines.utils.hook import ProgressHook
import torch

from app.core.config import settings
from app.models.transcript import Transcript, TranscriptSegment
from app.models.episode import Episode

logger = logging.getLogger(__name__)

class TranscriptionService:
    """Service for audio transcription and speaker diarization"""
    
    def __init__(self):
        self.openai_client = openai.AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        self.diarization_pipeline = None
        self._init_diarization()
    
    def _init_diarization(self):
        """Initialize pyannote.audio diarization pipeline"""
        try:
            if settings.ENABLE_PYANNOTE_DIARIZATION:
                # Note: Requires HuggingFace token for pyannote/speaker-diarization
                self.diarization_pipeline = Pipeline.from_pretrained(
                    "pyannote/speaker-diarization-3.1",
                    use_auth_token=settings.HUGGINGFACE_TOKEN
                )
                logger.info("Diarization pipeline initialized successfully")
        except Exception as e:
            logger.warning(f"Failed to initialize diarization pipeline: {e}")
            self.diarization_pipeline = None
    
    async def transcribe_audio(
        self, 
        audio_file_path: str, 
        episode: Episode,
        language: str = "en"
    ) -> Dict[str, Any]:
        """
        Transcribe audio file using OpenAI Whisper API
        
        Args:
            audio_file_path: Path to audio file
            episode: Episode model instance
            language: Language code (default: "en")
            
        Returns:
            Dict containing transcription data
        """
        try:
            logger.info(f"Starting transcription for episode {episode.id}")
            
            # Update episode status
            episode.status = "transcribing"
            
            # Transcribe with Whisper
            with open(audio_file_path, "rb") as audio_file:
                transcript_response = await self.openai_client.audio.transcriptions.create(
                    model="whisper-1",
                    file=audio_file,
                    language=language,
                    response_format="verbose_json",
                    timestamp_granularities=["word"]
                )
            
            # Extract transcription data
            transcription_data = {
                "text": transcript_response.text,
                "language": transcript_response.language,
                "duration": transcript_response.duration,
                "segments": transcript_response.segments,
                "words": transcript_response.words if hasattr(transcript_response, 'words') else []
            }
            
            # Perform diarization if enabled
            if self.diarization_pipeline and settings.ENABLE_PYANNOTE_DIARIZATION:
                diarization_data = await self._perform_diarization(audio_file_path)
                transcription_data["diarization"] = diarization_data
            
            # Create transcript segments
            segments = await self._create_segments(transcription_data)
            
            logger.info(f"Transcription completed for episode {episode.id}")
            
            return {
                "transcript": transcription_data["text"],
                "language": transcription_data["language"],
                "confidence": self._calculate_confidence(transcription_data),
                "diarization_data": transcription_data.get("diarization"),
                "segments": segments
            }
            
        except Exception as e:
            logger.error(f"Transcription failed for episode {episode.id}: {e}")
            episode.status = "failed"
            raise
    
    async def _perform_diarization(self, audio_file_path: str) -> Dict[str, Any]:
        """Perform speaker diarization using pyannote.audio"""
        try:
            # Run diarization
            diarization = self.diarization_pipeline(audio_file_path)
            
            # Extract speaker segments
            speaker_segments = []
            for turn, _, speaker in diarization.itertracks(yield_label=True):
                speaker_segments.append({
                    "start": turn.start,
                    "end": turn.end,
                    "speaker": speaker
                })
            
            return {
                "speaker_segments": speaker_segments,
                "num_speakers": len(set(segment["speaker"] for segment in speaker_segments))
            }
            
        except Exception as e:
            logger.error(f"Diarization failed: {e}")
            return {"speaker_segments": [], "num_speakers": 0}
    
    async def _create_segments(self, transcription_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Create transcript segments from transcription data"""
        segments = []
        
        for segment in transcription_data.get("segments", []):
            segment_data = {
                "start_ms": int(segment["start"] * 1000),
                "end_ms": int(segment["end"] * 1000),
                "text": segment["text"],
                "confidence": segment.get("avg_logprob", 0.0),
                "topic": await self._extract_topic(segment["text"])
            }
            segments.append(segment_data)
        
        return segments
    
    async def _extract_topic(self, text: str) -> str:
        """Extract topic from segment text using AI"""
        try:
            response = await self.openai_client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=[
                    {"role": "system", "content": "Extract a short topic (1-3 words) from this text segment."},
                    {"role": "user", "content": text}
                ],
                max_tokens=10,
                temperature=0.1
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            logger.warning(f"Topic extraction failed: {e}")
            return "general"
    
    def _calculate_confidence(self, transcription_data: Dict[str, Any]) -> float:
        """Calculate overall transcription confidence"""
        segments = transcription_data.get("segments", [])
        if not segments:
            return 0.0
        
        total_confidence = sum(segment.get("avg_logprob", 0.0) for segment in segments)
        return total_confidence / len(segments)
    
    async def process_episode(self, episode: Episode, audio_file_path: str) -> Transcript:
        """Process episode transcription end-to-end"""
        try:
            # Transcribe audio
            transcription_result = await self.transcribe_audio(audio_file_path, episode)
            
            # Create transcript record
            transcript = Transcript(
                id=f"transcript_{episode.id}",
                episode_id=episode.id,
                text=transcription_result["transcript"],
                language=transcription_result["language"],
                confidence=transcription_result["confidence"],
                diarization_data=transcription_result.get("diarization_data")
            )
            
            # Create transcript segments
            segments = []
            for segment_data in transcription_result["segments"]:
                segment = TranscriptSegment(
                    id=f"segment_{episode.id}_{len(segments)}",
                    transcript_id=transcript.id,
                    start_ms=segment_data["start_ms"],
                    end_ms=segment_data["end_ms"],
                    text=segment_data["text"],
                    confidence=segment_data["confidence"],
                    topic=segment_data["topic"]
                )
                segments.append(segment)
            
            # Update episode status
            episode.status = "drafting"
            
            return transcript, segments
            
        except Exception as e:
            logger.error(f"Episode processing failed: {e}")
            episode.status = "failed"
            raise
