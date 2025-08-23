"""
EchoPress AI Backend - Draft Schemas
Pydantic models for draft data validation
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class CitationBase(BaseModel):
    """Base citation model"""
    text: str = Field(..., description="Cited text from transcript")
    start_ms: int = Field(..., description="Start time in milliseconds")
    end_ms: int = Field(..., description="End time in milliseconds")
    speaker: Optional[str] = Field(None, description="Speaker name if available")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Confidence score")
    section: Optional[str] = Field(None, description="Section where citation appears")

class CitationCreate(CitationBase):
    """Create citation"""
    pass

class CitationResponse(CitationBase):
    """Citation response"""
    id: str = Field(..., description="Citation ID")
    created_at: datetime = Field(..., description="Creation timestamp")

    class Config:
        from_attributes = True

class DraftBase(BaseModel):
    """Base draft model"""
    episode_id: str = Field(..., description="Associated episode ID")
    title: str = Field(..., description="Blog post title")
    content: str = Field(..., description="Blog post content in markdown")
    version: int = Field(..., ge=1, description="Draft version number")
    status: str = Field(..., description="Draft status")
    citations: List[Dict[str, Any]] = Field(default_factory=list, description="Citations data")
    seo_data: Optional[Dict[str, Any]] = Field(None, description="SEO optimization data")
    brand_voice_id: Optional[str] = Field(None, description="Associated brand voice ID")

class DraftCreate(DraftBase):
    """Create draft"""
    pass

class DraftUpdate(BaseModel):
    """Update draft"""
    title: Optional[str] = Field(None, description="Updated blog post title")
    content: Optional[str] = Field(None, description="Updated blog post content")
    status: Optional[str] = Field(None, description="Updated draft status")
    citations: Optional[List[Dict[str, Any]]] = Field(None, description="Updated citations data")
    seo_data: Optional[Dict[str, Any]] = Field(None, description="Updated SEO optimization data")
    brand_voice_id: Optional[str] = Field(None, description="Updated brand voice ID")

class DraftResponse(DraftBase):
    """Draft response"""
    id: str = Field(..., description="Draft ID")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: Optional[datetime] = Field(None, description="Last update timestamp")
    citations: List[CitationResponse] = Field(default_factory=list, description="Citations")

    class Config:
        from_attributes = True

class DraftListResponse(BaseModel):
    """List of drafts response"""
    drafts: List[DraftResponse] = Field(..., description="List of drafts")
    total: int = Field(..., description="Total number of drafts")
    page: int = Field(..., description="Current page number")
    limit: int = Field(..., description="Items per page")
    pages: int = Field(..., description="Total number of pages")

class DraftRevisionRequest(BaseModel):
    """Request to revise a draft"""
    constraints: Dict[str, Any] = Field(..., description="Revision constraints")
    tone: Optional[str] = Field(None, description="Desired tone")
    length: Optional[str] = Field(None, description="Desired length")
    structure: Optional[str] = Field(None, description="Desired structure")
