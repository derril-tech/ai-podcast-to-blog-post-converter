"""
EchoPress AI Backend - Export Model
SQLAlchemy model for content exports
"""

from sqlalchemy import Column, String, DateTime, Text, ForeignKey, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Export(Base):
    __tablename__ = "exports"
    
    id = Column(String, primary_key=True, index=True)
    draft_id = Column(String, ForeignKey("drafts.id"), nullable=False)
    format = Column(String, nullable=False)  # wordpress, ghost, medium, markdown, html
    status = Column(String, default="pending")  # pending, processing, completed, failed
    url = Column(String)  # Published URL
    cms_config = Column(JSON)  # CMS-specific configuration
    error_message = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True))
    
    # Relationships
    draft = relationship("Draft", back_populates="exports")
