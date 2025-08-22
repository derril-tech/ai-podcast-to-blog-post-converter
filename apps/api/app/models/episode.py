"""
EchoPress AI Backend - Episode Model
SQLAlchemy model for podcast episodes
"""

from sqlalchemy import Column, String, DateTime, Integer, Text, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base

class Episode(Base):
    __tablename__ = "episodes"
    
    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    audio_url = Column(String)
    duration = Column(Integer)  # Duration in seconds
    status = Column(String, default="draft")  # draft, uploading, processing, completed, failed
    workspace_id = Column(String, ForeignKey("workspaces.id"), nullable=False)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    brand_voice_id = Column(String, ForeignKey("brand_voices.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # TODO: Add relationships to other models
    # user = relationship("User", back_populates="episodes")
    # workspace = relationship("Workspace", back_populates="episodes")
    # transcript = relationship("Transcript", back_populates="episode", uselist=False)
    # drafts = relationship("Draft", back_populates="episode")
