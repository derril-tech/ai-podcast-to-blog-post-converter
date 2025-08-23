"""
EchoPress AI Backend - Configuration Settings
Centralized configuration management with environment variable support
"""

from pydantic_settings import BaseSettings
from pydantic import Field, validator
from typing import List, Optional
import os

class Settings(BaseSettings):
    """Application settings with environment variable support"""
    
    # Application
    APP_NAME: str = "EchoPress AI"
    VERSION: str = "1.0.0"
    DEBUG: bool = Field(default=False, env="DEBUG")
    ENVIRONMENT: str = Field(default="development", env="ENVIRONMENT")
    
    # Server
    HOST: str = Field(default="0.0.0.0", env="HOST")
    PORT: int = Field(default=8000, env="PORT")
    
    # Security
    SECRET_KEY: str = Field(..., env="SECRET_KEY")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(default=30, env="ACCESS_TOKEN_EXPIRE_MINUTES")
    REFRESH_TOKEN_EXPIRE_DAYS: int = Field(default=7, env="REFRESH_TOKEN_EXPIRE_DAYS")
    
    # CORS
    ALLOWED_ORIGINS: List[str] = Field(
        default=["http://localhost:3000", "http://localhost:3001"],
        env="ALLOWED_ORIGINS"
    )
    ALLOWED_HOSTS: List[str] = Field(
        default=["localhost", "127.0.0.1"],
        env="ALLOWED_HOSTS"
    )
    
    # Database
    DATABASE_URL: str = Field(..., env="DATABASE_URL")
    DATABASE_POOL_SIZE: int = Field(default=20, env="DATABASE_POOL_SIZE")
    DATABASE_MAX_OVERFLOW: int = Field(default=30, env="DATABASE_MAX_OVERFLOW")
    
    # Redis
    REDIS_URL: str = Field(default="redis://localhost:6379", env="REDIS_URL")
    REDIS_DB: int = Field(default=0, env="REDIS_DB")
    REDIS_PASSWORD: Optional[str] = Field(default=None, env="REDIS_PASSWORD")
    
    # AI Services
    OPENAI_API_KEY: str = Field(..., env="OPENAI_API_KEY")
    ANTHROPIC_API_KEY: str = Field(..., env="ANTHROPIC_API_KEY")
    OPENAI_MODEL: str = Field(default="gpt-4-turbo-preview", env="OPENAI_MODEL")
    ANTHROPIC_MODEL: str = Field(default="claude-3-sonnet-20240229", env="ANTHROPIC_MODEL")
    HUGGINGFACE_TOKEN: Optional[str] = Field(default=None, env="HUGGINGFACE_TOKEN")
    
    # Storage
    STORAGE_BUCKET: str = Field(..., env="STORAGE_BUCKET")
    STORAGE_REGION: str = Field(default="us-east-1", env="STORAGE_REGION")
    AWS_ACCESS_KEY_ID: Optional[str] = Field(default=None, env="AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY: Optional[str] = Field(default=None, env="AWS_SECRET_ACCESS_KEY")
    
    # Email
    SMTP_URL: Optional[str] = Field(default=None, env="SMTP_URL")
    SMTP_HOST: Optional[str] = Field(default=None, env="SMTP_HOST")
    SMTP_PORT: int = Field(default=587, env="SMTP_PORT")
    SMTP_USERNAME: Optional[str] = Field(default=None, env="SMTP_USERNAME")
    SMTP_PASSWORD: Optional[str] = Field(default=None, env="SMTP_PASSWORD")
    SMTP_TLS: bool = Field(default=True, env="SMTP_TLS")
    
    # CMS Integrations
    CMS_WORDPRESS_URL: Optional[str] = Field(default=None, env="CMS_WORDPRESS_URL")
    CMS_WORDPRESS_USERNAME: Optional[str] = Field(default=None, env="CMS_WORDPRESS_USERNAME")
    CMS_WORDPRESS_PASSWORD: Optional[str] = Field(default=None, env="CMS_WORDPRESS_PASSWORD")
    CMS_GHOST_URL: Optional[str] = Field(default=None, env="CMS_GHOST_URL")
    CMS_GHOST_API_KEY: Optional[str] = Field(default=None, env="CMS_GHOST_API_KEY")
    CMS_MEDIUM_TOKEN: Optional[str] = Field(default=None, env="CMS_MEDIUM_TOKEN")
    
    # Analytics
    GOOGLE_ANALYTICS_ID: Optional[str] = Field(default=None, env="GOOGLE_ANALYTICS_ID")
    GOOGLE_SEARCH_CONSOLE_KEY: Optional[str] = Field(default=None, env="GOOGLE_SEARCH_CONSOLE_KEY")
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = Field(default=60, env="RATE_LIMIT_PER_MINUTE")
    RATE_LIMIT_PER_HOUR: int = Field(default=1000, env="RATE_LIMIT_PER_HOUR")
    
    # File Upload
    MAX_FILE_SIZE: int = Field(default=500 * 1024 * 1024, env="MAX_FILE_SIZE")  # 500MB
    ALLOWED_AUDIO_FORMATS: List[str] = Field(
        default=["mp3", "wav", "m4a", "ogg", "flac"],
        env="ALLOWED_AUDIO_FORMATS"
    )
    ALLOWED_VIDEO_FORMATS: List[str] = Field(
        default=["mp4", "avi", "mov", "mkv"],
        env="ALLOWED_VIDEO_FORMATS"
    )
    
    # Processing
    MAX_CONCURRENT_TRANSCRIPTIONS: int = Field(default=10, env="MAX_CONCURRENT_TRANSCRIPTIONS")
    TRANSCRIPTION_TIMEOUT: int = Field(default=3600, env="TRANSCRIPTION_TIMEOUT")  # 1 hour
    DRAFT_GENERATION_TIMEOUT: int = Field(default=1800, env="DRAFT_GENERATION_TIMEOUT")  # 30 minutes
    
    # Monitoring
    ENABLE_METRICS: bool = Field(default=True, env="ENABLE_METRICS")
    METRICS_PORT: int = Field(default=9090, env="METRICS_PORT")
    LOG_LEVEL: str = Field(default="INFO", env="LOG_LEVEL")
    
    # Feature Flags
    ENABLE_WHISPER_ASR: bool = Field(default=True, env="ENABLE_WHISPER_ASR")
    ENABLE_PYANNOTE_DIARIZATION: bool = Field(default=True, env="ENABLE_PYANNOTE_DIARIZATION")
    ENABLE_LANGGRAPH: bool = Field(default=True, env="ENABLE_LANGGRAPH")
    ENABLE_VECTOR_SEARCH: bool = Field(default=True, env="ENABLE_VECTOR_SEARCH")
    
    @validator("ALLOWED_ORIGINS", pre=True)
    def parse_allowed_origins(cls, v):
        """Parse ALLOWED_ORIGINS from comma-separated string"""
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",")]
        return v
    
    @validator("ALLOWED_HOSTS", pre=True)
    def parse_allowed_hosts(cls, v):
        """Parse ALLOWED_HOSTS from comma-separated string"""
        if isinstance(v, str):
            return [host.strip() for host in v.split(",")]
        return v
    
    @validator("ALLOWED_AUDIO_FORMATS", pre=True)
    def parse_audio_formats(cls, v):
        """Parse ALLOWED_AUDIO_FORMATS from comma-separated string"""
        if isinstance(v, str):
            return [fmt.strip().lower() for fmt in v.split(",")]
        return v
    
    @validator("ALLOWED_VIDEO_FORMATS", pre=True)
    def parse_video_formats(cls, v):
        """Parse ALLOWED_VIDEO_FORMATS from comma-separated string"""
        if isinstance(v, str):
            return [fmt.strip().lower() for fmt in v.split(",")]
        return v
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True

# Create settings instance
settings = Settings()

# Validate required settings in production
if settings.ENVIRONMENT == "production":
    required_settings = [
        "SECRET_KEY",
        "DATABASE_URL",
        "OPENAI_API_KEY",
        "ANTHROPIC_API_KEY",
        "STORAGE_BUCKET",
    ]
    
    missing_settings = [setting for setting in required_settings if not getattr(settings, setting)]
    if missing_settings:
        raise ValueError(f"Missing required settings in production: {missing_settings}")
