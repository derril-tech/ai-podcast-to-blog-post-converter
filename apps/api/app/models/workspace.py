"""
EchoPress AI Backend - Workspace Model
SQLAlchemy model for workspaces
"""

from sqlalchemy import Column, String, DateTime, Text, ForeignKey, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Workspace(Base):
    __tablename__ = "workspaces"
    
    id = Column(String, primary_key=True, index=True)
    organization_id = Column(String, ForeignKey("organizations.id"), nullable=False)
    name = Column(String, nullable=False)
    slug = Column(String, nullable=False, index=True)
    settings = Column(Text)  # JSON settings
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    organization = relationship("Organization", back_populates="workspaces")
    episodes = relationship("Episode", back_populates="workspace", cascade="all, delete-orphan")
    brand_voices = relationship("BrandVoice", back_populates="workspace", cascade="all, delete-orphan")
