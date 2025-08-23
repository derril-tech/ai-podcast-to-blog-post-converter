"""
EchoPress AI Backend - Analytics Model
SQLAlchemy model for analytics and performance tracking
"""

from sqlalchemy import Column, String, DateTime, Text, ForeignKey, Float, Integer, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Analytics(Base):
    __tablename__ = "analytics"
    
    id = Column(String, primary_key=True, index=True)
    episode_id = Column(String, ForeignKey("episodes.id"), nullable=False)
    metric = Column(String, nullable=False)  # views, engagement_rate, seo_score, readability_score, citation_coverage
    value = Column(Float, nullable=False)
    metadata = Column(JSON)  # Additional metric data
    captured_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    episode = relationship("Episode", back_populates="analytics")

class ContentPerformance(Base):
    __tablename__ = "content_performance"
    
    id = Column(String, primary_key=True, index=True)
    draft_id = Column(String, ForeignKey("drafts.id"), nullable=False)
    metric_type = Column(String, nullable=False)  # seo, readability, engagement, accessibility
    score = Column(Float, nullable=False)
    details = Column(JSON)  # Detailed breakdown of scores
    captured_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    draft = relationship("Draft", back_populates="performance_metrics")
