"""
EchoPress AI Backend - Episode Schemas
Pydantic schemas for episode data validation
"""

from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class EpisodeBase(BaseModel):
    title: str
    description: Optional[str] = None

class EpisodeCreate(EpisodeBase):
    source_type: str  # "upload" or "url"
    source_url: Optional[str] = None
    workspace_id: str
    brand_voice_id: Optional[str] = None

class EpisodeUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None

class Episode(EpisodeBase):
    id: str
    audio_url: Optional[str] = None
    duration: Optional[int] = None
    status: str
    workspace_id: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class EpisodeResponse(BaseModel):
    success: bool = True
    data: Episode
    message: str = "Episode retrieved successfully"

class EpisodeListResponse(BaseModel):
    success: bool = True
    data: dict  # Will contain episodes and pagination info
    message: str = "Episodes retrieved successfully"
