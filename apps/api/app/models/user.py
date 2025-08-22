"""
EchoPress AI Backend - User Model
SQLAlchemy model for user accounts
"""

from sqlalchemy import Column, String, DateTime, Boolean
from sqlalchemy.sql import func
from app.core.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # TODO: Add relationships to other models
    # episodes = relationship("Episode", back_populates="user")
    # workspaces = relationship("Workspace", back_populates="owner")
