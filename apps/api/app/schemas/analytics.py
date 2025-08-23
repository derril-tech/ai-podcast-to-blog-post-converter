"""
EchoPress AI Backend - Analytics Schemas
Pydantic models for analytics data validation
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class AnalyticsBase(BaseModel):
    """Base analytics model"""
    episode_id: str = Field(..., description="Associated episode ID")
    metric: str = Field(..., description="Metric name")
    value: float = Field(..., description="Metric value")
    metadata: Optional[Dict[str, Any]] = Field(None, description="Additional metric data")

class AnalyticsCreate(AnalyticsBase):
    """Create analytics entry"""
    pass

class AnalyticsResponse(AnalyticsBase):
    """Analytics response"""
    id: str = Field(..., description="Analytics ID")
    captured_at: datetime = Field(..., description="Timestamp when metric was captured")

    class Config:
        from_attributes = True

class ContentPerformanceBase(BaseModel):
    """Base content performance model"""
    draft_id: str = Field(..., description="Associated draft ID")
    metric_type: str = Field(..., description="Performance metric type")
    score: float = Field(..., ge=0.0, le=100.0, description="Performance score")
    details: Optional[Dict[str, Any]] = Field(None, description="Detailed breakdown")

class ContentPerformanceCreate(ContentPerformanceBase):
    """Create content performance entry"""
    pass

class ContentPerformanceResponse(ContentPerformanceBase):
    """Content performance response"""
    id: str = Field(..., description="Performance ID")
    captured_at: datetime = Field(..., description="Timestamp when performance was captured")

    class Config:
        from_attributes = True

class AnalyticsSummary(BaseModel):
    """Analytics summary for dashboard"""
    total_episodes: int = Field(..., description="Total number of episodes")
    total_blog_posts: int = Field(..., description="Total number of blog posts published")
    avg_processing_time: float = Field(..., description="Average processing time in minutes")
    success_rate: float = Field(..., ge=0.0, le=100.0, description="Success rate percentage")
    organic_traffic: int = Field(..., description="Total organic traffic")
    avg_position: float = Field(..., description="Average search position")
    click_through_rate: float = Field(..., ge=0.0, le=100.0, description="Click-through rate percentage")

class AnalyticsListResponse(BaseModel):
    """List of analytics entries response"""
    analytics: List[AnalyticsResponse] = Field(..., description="List of analytics entries")
    total: int = Field(..., description="Total number of entries")
    page: int = Field(..., description="Current page number")
    limit: int = Field(..., description="Items per page")
    pages: int = Field(..., description="Total number of pages")

class PerformanceListResponse(BaseModel):
    """List of performance entries response"""
    performance: List[ContentPerformanceResponse] = Field(..., description="List of performance entries")
    total: int = Field(..., description="Total number of entries")
    page: int = Field(..., description="Current page number")
    limit: int = Field(..., description="Items per page")
    pages: int = Field(..., description="Total number of pages")
