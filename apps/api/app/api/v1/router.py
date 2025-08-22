"""
EchoPress AI Backend - API Router
Main router that includes all API endpoint modules
"""

from fastapi import APIRouter

# Import individual route modules
from app.api.v1.auth import router as auth_router
from app.api.v1.episodes import router as episodes_router
from app.api.v1.transcripts import router as transcripts_router
from app.api.v1.drafts import router as drafts_router
from app.api.v1.seo import router as seo_router
from app.api.v1.exports import router as exports_router
from app.api.v1.brand_voices import router as brand_voices_router
from app.api.v1.analytics import router as analytics_router

# Create main API router
api_router = APIRouter()

# Include all route modules
api_router.include_router(auth_router, prefix="/auth", tags=["Authentication"])
api_router.include_router(episodes_router, prefix="/episodes", tags=["Episodes"])
api_router.include_router(transcripts_router, prefix="/transcripts", tags=["Transcription"])
api_router.include_router(drafts_router, prefix="/drafts", tags=["Drafts"])
api_router.include_router(seo_router, prefix="/seo", tags=["SEO"])
api_router.include_router(exports_router, prefix="/exports", tags=["Exports"])
api_router.include_router(brand_voices_router, prefix="/brand-voices", tags=["Brand Voices"])
api_router.include_router(analytics_router, prefix="/analytics", tags=["Analytics"])
