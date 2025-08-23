"""
EchoPress AI Backend - Export Schemas
Pydantic models for export data validation
"""

from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime

class ExportBase(BaseModel):
    """Base export model"""
    draft_id: str = Field(..., description="Associated draft ID")
    cms_type: str = Field(..., description="CMS type (wordpress, ghost, medium, webflow, markdown)")
    status: str = Field(..., description="Export status")
    url: Optional[str] = Field(None, description="Published URL")
    log: Optional[str] = Field(None, description="Export log")
    metadata: Optional[Dict[str, Any]] = Field(None, description="Export metadata")

class ExportCreate(ExportBase):
    """Create export"""
    pass

class ExportUpdate(BaseModel):
    """Update export"""
    status: Optional[str] = Field(None, description="Updated export status")
    url: Optional[str] = Field(None, description="Updated published URL")
    log: Optional[str] = Field(None, description="Updated export log")
    metadata: Optional[Dict[str, Any]] = Field(None, description="Updated export metadata")

class ExportResponse(ExportBase):
    """Export response"""
    id: str = Field(..., description="Export ID")
    created_at: datetime = Field(..., description="Creation timestamp")
    completed_at: Optional[datetime] = Field(None, description="Completion timestamp")

    class Config:
        from_attributes = True

class ExportListResponse(BaseModel):
    """List of exports response"""
    exports: list[ExportResponse] = Field(..., description="List of exports")
    total: int = Field(..., description="Total number of exports")
    page: int = Field(..., description="Current page number")
    limit: int = Field(..., description="Items per page")
    pages: int = Field(..., description="Total number of pages")

class ExportRequest(BaseModel):
    """Export request"""
    cms_type: str = Field(..., description="Target CMS type")
    metadata: Optional[Dict[str, Any]] = Field(None, description="Export configuration")
