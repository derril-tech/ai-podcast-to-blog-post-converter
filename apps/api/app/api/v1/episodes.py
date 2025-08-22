"""
EchoPress AI Backend - Episode Management API
Endpoints for managing podcast episodes
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from datetime import datetime

from app.core.auth import get_current_user
from app.schemas.episode import (
    EpisodeCreate,
    EpisodeResponse,
    EpisodeListResponse,
    EpisodeUpdate
)
from app.schemas.user import User
from app.services.episodes import EpisodeService

router = APIRouter()

@router.get("/", response_model=EpisodeListResponse)
async def list_episodes(
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Items per page"),
    status: Optional[str] = Query(None, description="Filter by status"),
    search: Optional[str] = Query(None, description="Search in title and description"),
    current_user: User = Depends(get_current_user)
):
    """
    List episodes with pagination and filtering
    """
    try:
        episode_service = EpisodeService()
        episodes = await episode_service.list_episodes(
            user_id=current_user.id,
            page=page,
            limit=limit,
            status=status,
            search=search
        )
        return episodes
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to list episodes: {str(e)}"
        )

@router.post("/", response_model=EpisodeResponse, status_code=status.HTTP_201_CREATED)
async def create_episode(
    episode_data: EpisodeCreate,
    current_user: User = Depends(get_current_user)
):
    """
    Create a new episode
    """
    try:
        episode_service = EpisodeService()
        episode = await episode_service.create_episode(
            user_id=current_user.id,
            episode_data=episode_data
        )
        return episode
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create episode: {str(e)}"
        )

@router.get("/{episode_id}", response_model=EpisodeResponse)
async def get_episode(
    episode_id: str,
    current_user: User = Depends(get_current_user)
):
    """
    Get episode details
    """
    try:
        episode_service = EpisodeService()
        episode = await episode_service.get_episode(
            episode_id=episode_id,
            user_id=current_user.id
        )
        if not episode:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Episode not found"
            )
        return episode
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get episode: {str(e)}"
        )

@router.put("/{episode_id}", response_model=EpisodeResponse)
async def update_episode(
    episode_id: str,
    episode_data: EpisodeUpdate,
    current_user: User = Depends(get_current_user)
):
    """
    Update episode details
    """
    try:
        episode_service = EpisodeService()
        episode = await episode_service.update_episode(
            episode_id=episode_id,
            user_id=current_user.id,
            episode_data=episode_data
        )
        if not episode:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Episode not found"
            )
        return episode
    except HTTPException:
        raise
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update episode: {str(e)}"
        )

@router.delete("/{episode_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_episode(
    episode_id: str,
    current_user: User = Depends(get_current_user)
):
    """
    Delete episode and all associated data
    """
    try:
        episode_service = EpisodeService()
        success = await episode_service.delete_episode(
            episode_id=episode_id,
            user_id=current_user.id
        )
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Episode not found"
            )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete episode: {str(e)}"
        )

@router.post("/{episode_id}/upload")
async def upload_episode_audio(
    episode_id: str,
    current_user: User = Depends(get_current_user)
):
    """
    Get upload URL for episode audio file
    """
    try:
        episode_service = EpisodeService()
        upload_url = await episode_service.get_upload_url(
            episode_id=episode_id,
            user_id=current_user.id
        )
        return {"upload_url": upload_url}
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get upload URL: {str(e)}"
        )

@router.get("/{episode_id}/status")
async def get_episode_status(
    episode_id: str,
    current_user: User = Depends(get_current_user)
):
    """
    Get episode processing status
    """
    try:
        episode_service = EpisodeService()
        status_info = await episode_service.get_status(
            episode_id=episode_id,
            user_id=current_user.id
        )
        if not status_info:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Episode not found"
            )
        return status_info
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get episode status: {str(e)}"
        )
