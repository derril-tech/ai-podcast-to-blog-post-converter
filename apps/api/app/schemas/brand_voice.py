"""
EchoPress AI Backend - Brand Voice Schemas
Pydantic models for brand voice data validation
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class BrandVoiceBase(BaseModel):
    """Base brand voice model"""
    workspace_id: str = Field(..., description="Associated workspace ID")
    name: str = Field(..., description="Brand voice name")
    description: Optional[str] = Field(None, description="Brand voice description")
    tone: str = Field(..., description="Tone (e.g., professional, casual, technical)")
    style_guide: str = Field(..., description="Style guide instructions")
    banned_terms: List[str] = Field(default_factory=list, description="Terms to avoid")
    tone_examples: List[str] = Field(default_factory=list, description="Example tone phrases")
    is_active: bool = Field(default=True, description="Whether brand voice is active")

class BrandVoiceCreate(BrandVoiceBase):
    """Create brand voice"""
    pass

class BrandVoiceUpdate(BaseModel):
    """Update brand voice"""
    name: Optional[str] = Field(None, description="Updated brand voice name")
    description: Optional[str] = Field(None, description="Updated brand voice description")
    tone: Optional[str] = Field(None, description="Updated tone")
    style_guide: Optional[str] = Field(None, description="Updated style guide")
    banned_terms: Optional[List[str]] = Field(None, description="Updated banned terms")
    tone_examples: Optional[List[str]] = Field(None, description="Updated tone examples")
    is_active: Optional[bool] = Field(None, description="Updated active status")

class BrandVoiceResponse(BrandVoiceBase):
    """Brand voice response"""
    id: str = Field(..., description="Brand voice ID")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: Optional[datetime] = Field(None, description="Last update timestamp")

    class Config:
        from_attributes = True

class BrandVoiceListResponse(BaseModel):
    """List of brand voices response"""
    brand_voices: List[BrandVoiceResponse] = Field(..., description="List of brand voices")
    total: int = Field(..., description="Total number of brand voices")
    page: int = Field(..., description="Current page number")
    limit: int = Field(..., description="Items per page")
    pages: int = Field(..., description="Total number of pages")
