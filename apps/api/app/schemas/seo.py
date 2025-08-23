"""
EchoPress AI Backend - SEO Schemas
Pydantic models for SEO data validation
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class SEODataBase(BaseModel):
    """Base SEO data model"""
    title: str = Field(..., description="SEO title")
    meta_description: str = Field(..., description="Meta description")
    slug: str = Field(..., description="URL slug")
    keywords: List[str] = Field(default_factory=list, description="Target keywords")
    faqs: List[Dict[str, str]] = Field(default_factory=list, description="FAQ items")
    schema_markup: Optional[Dict[str, Any]] = Field(None, description="JSON-LD schema markup")
    internal_links: List[str] = Field(default_factory=list, description="Suggested internal links")
    readability_score: Optional[float] = Field(None, ge=0.0, le=10.0, description="Readability score")
    seo_score: Optional[float] = Field(None, ge=0.0, le=100.0, description="Overall SEO score")

class SEODataCreate(SEODataBase):
    """Create SEO data"""
    pass

class SEODataUpdate(BaseModel):
    """Update SEO data"""
    title: Optional[str] = Field(None, description="Updated SEO title")
    meta_description: Optional[str] = Field(None, description="Updated meta description")
    slug: Optional[str] = Field(None, description="Updated URL slug")
    keywords: Optional[List[str]] = Field(None, description="Updated target keywords")
    faqs: Optional[List[Dict[str, str]]] = Field(None, description="Updated FAQ items")
    schema_markup: Optional[Dict[str, Any]] = Field(None, description="Updated JSON-LD schema markup")
    internal_links: Optional[List[str]] = Field(None, description="Updated internal links")
    readability_score: Optional[float] = Field(None, ge=0.0, le=10.0, description="Updated readability score")
    seo_score: Optional[float] = Field(None, ge=0.0, le=100.0, description="Updated SEO score")

class SEODataResponse(SEODataBase):
    """SEO data response"""
    id: str = Field(..., description="SEO data ID")
    draft_id: str = Field(..., description="Associated draft ID")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: Optional[datetime] = Field(None, description="Last update timestamp")

    class Config:
        from_attributes = True

class SEOOptimizationRequest(BaseModel):
    """SEO optimization request"""
    keywords: List[str] = Field(..., description="Target keywords")
    target_audience: Optional[str] = Field(None, description="Target audience")
    content_type: Optional[str] = Field(None, description="Content type")
    competitors: Optional[List[str]] = Field(None, description="Competitor URLs")
    custom_instructions: Optional[str] = Field(None, description="Custom optimization instructions")

class SEOAnalysisResponse(BaseModel):
    """SEO analysis response"""
    score: float = Field(..., ge=0.0, le=100.0, description="Overall SEO score")
    recommendations: List[str] = Field(..., description="SEO recommendations")
    issues: List[str] = Field(default_factory=list, description="SEO issues found")
    opportunities: List[str] = Field(default_factory=list, description="SEO opportunities")
    analysis_data: Dict[str, Any] = Field(..., description="Detailed analysis data")
