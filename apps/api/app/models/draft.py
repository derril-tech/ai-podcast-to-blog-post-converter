"""
EchoPress AI Backend - Draft Model
SQLAlchemy model for blog post drafts
"""

from sqlalchemy import Column, String, DateTime, Text, ForeignKey, Integer, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Draft(Base):
    __tablename__ = "drafts"
    
    id = Column(String, primary_key=True, index=True)
    episode_id = Column(String, ForeignKey("episodes.id"), nullable=False)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    version = Column(Integer, default=1)
    status = Column(String, default="draft")  # draft, generating, completed, published
    seo_data = Column(JSON)  # SEO metadata and scores
    citations = Column(JSON)  # Citation data
    brand_voice_id = Column(String, ForeignKey("brand_voices.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    episode = relationship("Episode", back_populates="drafts")
    brand_voice = relationship("BrandVoice", back_populates="drafts")
    exports = relationship("Export", back_populates="draft", cascade="all, delete-orphan")
    performance_metrics = relationship("ContentPerformance", back_populates="draft", cascade="all, delete-orphan")
    assets = relationship("Asset", back_populates="draft", cascade="all, delete-orphan")
