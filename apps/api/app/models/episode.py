"""
EchoPress AI Backend - Episode Model
SQLAlchemy model for podcast episodes
"""

from sqlalchemy import Column, String, DateTime, Integer, Text, ForeignKey, BigInteger
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Episode(Base):
    __tablename__ = "episodes"
    
    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    audio_url = Column(String)
    duration = Column(Integer)  # Duration in seconds
    file_size = Column(BigInteger)  # File size in bytes
    status = Column(String, default="uploading")  # uploading, processing, transcribing, drafting, completed, failed
    metadata = Column(Text)  # JSON metadata
    workspace_id = Column(String, ForeignKey("workspaces.id"), nullable=False)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    brand_voice_id = Column(String, ForeignKey("brand_voices.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="episodes")
    workspace = relationship("Workspace", back_populates="episodes")
    brand_voice = relationship("BrandVoice", back_populates="episodes")
    transcript = relationship("Transcript", back_populates="episode", uselist=False, cascade="all, delete-orphan")
    drafts = relationship("Draft", back_populates="episode", cascade="all, delete-orphan")
    analytics = relationship("Analytics", back_populates="episode", cascade="all, delete-orphan")
    assets = relationship("Asset", back_populates="episode", cascade="all, delete-orphan")
