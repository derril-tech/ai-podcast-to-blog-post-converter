"""
EchoPress AI Backend - Brand Voice Model
SQLAlchemy model for brand voice profiles
"""

from sqlalchemy import Column, String, DateTime, Text, ForeignKey, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class BrandVoice(Base):
    __tablename__ = "brand_voices"
    
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    tone = Column(String)  # professional, casual, technical, conversational
    style_guide = Column(JSON)  # Style guide configuration
    workspace_id = Column(String, ForeignKey("workspaces.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    workspace = relationship("Workspace", back_populates="brand_voices")
    episodes = relationship("Episode", back_populates="brand_voice")
    drafts = relationship("Draft", back_populates="brand_voice")
