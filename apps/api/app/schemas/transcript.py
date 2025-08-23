"""
EchoPress AI Backend - Transcript Schemas
Pydantic models for transcript data validation
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class TranscriptSegmentBase(BaseModel):
    """Base transcript segment model"""
    start_ms: int = Field(..., description="Start time in milliseconds")
    end_ms: int = Field(..., description="End time in milliseconds")
    text: str = Field(..., description="Segment text content")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Confidence score")
    speaker: Optional[str] = Field(None, description="Speaker identifier")
    topic: Optional[str] = Field(None, description="Topic classification")

class TranscriptSegmentCreate(TranscriptSegmentBase):
    """Create transcript segment"""
    pass

class TranscriptSegmentResponse(TranscriptSegmentBase):
    """Transcript segment response"""
    id: str = Field(..., description="Segment ID")
    transcript_id: str = Field(..., description="Parent transcript ID")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: Optional[datetime] = Field(None, description="Last update timestamp")

    class Config:
        from_attributes = True

class TranscriptBase(BaseModel):
    """Base transcript model"""
    episode_id: str = Field(..., description="Associated episode ID")
    text: str = Field(..., description="Full transcript text")
    language: str = Field(..., description="Language code")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Overall confidence score")
    diarization_data: Optional[Dict[str, Any]] = Field(None, description="Speaker diarization data")

class TranscriptCreate(TranscriptBase):
    """Create transcript"""
    pass

class TranscriptUpdate(BaseModel):
    """Update transcript"""
    text: Optional[str] = Field(None, description="Updated transcript text")
    confidence: Optional[float] = Field(None, ge=0.0, le=1.0, description="Updated confidence score")
    diarization_data: Optional[Dict[str, Any]] = Field(None, description="Updated diarization data")

class TranscriptResponse(TranscriptBase):
    """Transcript response"""
    id: str = Field(..., description="Transcript ID")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: Optional[datetime] = Field(None, description="Last update timestamp")
    segments: List[TranscriptSegmentResponse] = Field(default_factory=list, description="Transcript segments")

    class Config:
        from_attributes = True

class TranscriptListResponse(BaseModel):
    """List of transcripts response"""
    transcripts: List[TranscriptResponse] = Field(..., description="List of transcripts")
    total: int = Field(..., description="Total number of transcripts")
    page: int = Field(..., description="Current page number")
    limit: int = Field(..., description="Items per page")
    pages: int = Field(..., description="Total number of pages")
