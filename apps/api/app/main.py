"""
EchoPress AI Backend - FastAPI Application
Main entry point for the podcast-to-blog converter API
"""

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from contextlib import asynccontextmanager
import time
import logging
from typing import Dict, Any

# Import routers
from app.api.v1.router import api_router
from app.core.config import settings
from app.core.logging import setup_logging
from app.core.database import init_db
from app.core.cache import init_cache

# Setup logging
setup_logging()
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager for startup and shutdown events"""
    # Startup
    logger.info("Starting EchoPress AI Backend...")
    
    # Initialize database
    await init_db()
    logger.info("Database initialized")
    
    # Initialize cache
    await init_cache()
    logger.info("Cache initialized")
    
    logger.info("EchoPress AI Backend started successfully")
    
    yield
    
    # Shutdown
    logger.info("Shutting down EchoPress AI Backend...")

# Create FastAPI application
app = FastAPI(
    title="EchoPress AI API",
    description="AI-powered podcast to blog post converter with transcription, RAG, and SEO optimization",
    version="1.0.0",
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
    openapi_url="/openapi.json" if settings.DEBUG else None,
    lifespan=lifespan,
)

# Add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=settings.ALLOWED_HOSTS,
)

# Request timing middleware
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    """Add processing time to response headers"""
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

# Error handlers
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle validation errors"""
    logger.warning(f"Validation error: {exc.errors()}")
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "detail": "Validation error",
            "errors": exc.errors(),
        },
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Handle general exceptions"""
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "detail": "Internal server error",
            "message": "An unexpected error occurred",
        },
    )

# Health check endpoint
@app.get("/health")
async def health_check() -> Dict[str, Any]:
    """Health check endpoint for monitoring"""
    return {
        "status": "healthy",
        "service": "echopress-ai-backend",
        "version": "1.0.0",
        "timestamp": time.time(),
    }

# Include API routes
app.include_router(api_router, prefix="/api/v1")

# Root endpoint
@app.get("/")
async def root() -> Dict[str, str]:
    """Root endpoint with API information"""
    return {
        "message": "EchoPress AI Backend",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health",
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
        log_level="info",
    )
