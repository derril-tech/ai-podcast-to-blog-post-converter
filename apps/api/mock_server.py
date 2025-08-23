#!/usr/bin/env python3
"""
Mock server for EchoPress AI API development and testing
"""

import json
import time
from typing import Dict, Any, List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# Mock data
mock_episodes = [
    {
        "id": "1",
        "title": "The Future of AI in Podcasting",
        "description": "Exploring how artificial intelligence is transforming the podcast industry",
        "audioUrl": "https://example.com/episode1.mp3",
        "duration": 3600,
        "transcript": "Welcome to our podcast about AI in podcasting...",
        "status": "completed",
        "createdAt": "2024-01-15T10:00:00Z",
        "updatedAt": "2024-01-15T11:30:00Z",
    },
    {
        "id": "2",
        "title": "Building Scalable Web Applications",
        "description": "Best practices for building web applications that scale",
        "audioUrl": "https://example.com/episode2.mp3",
        "duration": 2700,
        "transcript": "Today we're discussing scalable web applications...",
        "status": "processing",
        "createdAt": "2024-01-16T14:00:00Z",
        "updatedAt": "2024-01-16T14:30:00Z",
    },
]

mock_blog_posts = [
    {
        "id": "1",
        "title": "The Future of AI in Podcasting: A Comprehensive Guide",
        "content": "Artificial intelligence is revolutionizing the podcast industry...",
        "excerpt": "Discover how AI is transforming podcast creation, distribution, and consumption.",
        "seoTitle": "AI in Podcasting: The Complete Guide to Future Trends",
        "seoDescription": "Learn how artificial intelligence is reshaping the podcast industry...",
        "keywords": ["AI", "podcasting", "artificial intelligence", "content creation"],
        "status": "published",
        "episodeId": "1",
        "createdAt": "2024-01-15T12:00:00Z",
        "updatedAt": "2024-01-15T12:00:00Z",
    },
]

mock_user = {
    "id": "1",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z",
}

# Create FastAPI app
app = FastAPI(
    title="EchoPress AI Mock API",
    description="Mock API for development and testing",
    version="1.0.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "echopress-ai-mock-api",
        "version": "1.0.0",
        "timestamp": time.time(),
    }

# Episodes endpoints
@app.get("/api/v1/episodes")
async def get_episodes(page: int = 1, limit: int = 10):
    start = (page - 1) * limit
    end = start + limit
    episodes = mock_episodes[start:end]
    
    return {
        "success": True,
        "message": "Episodes retrieved successfully",
        "data": episodes,
        "pagination": {
            "page": page,
            "limit": limit,
            "total": len(mock_episodes),
            "totalPages": (len(mock_episodes) + limit - 1) // limit,
        },
    }

@app.get("/api/v1/episodes/{episode_id}")
async def get_episode(episode_id: str):
    episode = next((ep for ep in mock_episodes if ep["id"] == episode_id), None)
    if not episode:
        raise HTTPException(status_code=404, detail="Episode not found")
    
    return {
        "success": True,
        "message": "Episode retrieved successfully",
        "data": episode,
    }

@app.post("/api/v1/episodes")
async def create_episode(episode_data: Dict[str, Any]):
    new_episode = {
        "id": str(len(mock_episodes) + 1),
        **episode_data,
        "status": "pending",
        "createdAt": time.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "updatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ"),
    }
    mock_episodes.append(new_episode)
    
    return {
        "success": True,
        "message": "Episode created successfully",
        "data": new_episode,
    }

# Blog posts endpoints
@app.get("/api/v1/blog-posts")
async def get_blog_posts(page: int = 1, limit: int = 10):
    start = (page - 1) * limit
    end = start + limit
    posts = mock_blog_posts[start:end]
    
    return {
        "success": True,
        "message": "Blog posts retrieved successfully",
        "data": posts,
        "pagination": {
            "page": page,
            "limit": limit,
            "total": len(mock_blog_posts),
            "totalPages": (len(mock_blog_posts) + limit - 1) // limit,
        },
    }

@app.get("/api/v1/blog-posts/{post_id}")
async def get_blog_post(post_id: str):
    post = next((p for p in mock_blog_posts if p["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    return {
        "success": True,
        "message": "Blog post retrieved successfully",
        "data": post,
    }

# User endpoints
@app.get("/api/v1/user/profile")
async def get_user_profile():
    return {
        "success": True,
        "message": "User profile retrieved successfully",
        "data": mock_user,
    }

# File upload endpoint
@app.post("/api/v1/upload")
async def upload_file():
    return {
        "success": True,
        "message": "File uploaded successfully",
        "data": {
            "id": "upload_123",
            "filename": "podcast.mp3",
            "size": 1024000,
            "mimeType": "audio/mpeg",
            "url": "https://example.com/uploads/podcast.mp3",
            "uploadedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ"),
        },
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
