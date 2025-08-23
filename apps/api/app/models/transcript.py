"""
EchoPress AI Backend - Transcript Model
SQLAlchemy model for episode transcripts
"""

from sqlalchemy import Column, String, DateTime, Text, ForeignKey, Float, JSON, Integer
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Transcript(Base):
    __tablename__ = "transcripts"
    
    id = Column(String, primary_key=True, index=True)
    episode_id = Column(String, ForeignKey("episodes.id"), nullable=False)
    text = Column(Text, nullable=False)
    language = Column(String, default="en")
    confidence = Column(Float)
    diarization_data = Column(JSON)  # Speaker diarization information
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    episode = relationship("Episode", back_populates="transcript")
    segments = relationship("TranscriptSegment", back_populates="transcript", cascade="all, delete-orphan")

class TranscriptSegment(Base):
    __tablename__ = "transcript_segments"
    
    id = Column(String, primary_key=True, index=True)
    transcript_id = Column(String, ForeignKey("transcripts.id"), nullable=False)
    start_ms = Column(Integer, nullable=False)
    end_ms = Column(Integer, nullable=False)
    speaker = Column(String)
    text = Column(Text, nullable=False)
    confidence = Column(Float)
    vector = Column(String)  # pgvector embedding
    topic = Column(String)
    
    # Relationships
    transcript = relationship("Transcript", back_populates="segments")
