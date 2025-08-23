"""
EchoPress AI Backend - Asset Model
SQLAlchemy model for blog post assets (images, quotes, CTAs)
"""

from sqlalchemy import Column, String, DateTime, Text, ForeignKey, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Asset(Base):
    __tablename__ = "assets"
    
    id = Column(String, primary_key=True, index=True)
    episode_id = Column(String, ForeignKey("episodes.id"), nullable=False)
    draft_id = Column(String, ForeignKey("drafts.id"))
    type = Column(String, nullable=False)  # image, quote, cta
    url = Column(String)
    alt_text = Column(Text)
    caption = Column(Text)
    metadata = Column(JSON)  # Additional asset data
    position = Column(String)  # Where in the content this asset should appear
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    episode = relationship("Episode", back_populates="assets")
    draft = relationship("Draft", back_populates="assets")
