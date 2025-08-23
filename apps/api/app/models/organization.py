"""
EchoPress AI Backend - Organization Model
SQLAlchemy model for organizations
"""

from sqlalchemy import Column, String, DateTime, Text, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Organization(Base):
    __tablename__ = "organizations"
    
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    slug = Column(String, unique=True, nullable=False, index=True)
    domain = Column(String)
    settings = Column(Text)  # JSON settings
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    workspaces = relationship("Workspace", back_populates="organization", cascade="all, delete-orphan")
    users = relationship("User", back_populates="organization")
