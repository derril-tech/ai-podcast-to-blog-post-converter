"""
EchoPress AI Backend - Cache Configuration
Redis cache setup and management
"""

import redis.asyncio as redis
import json
from typing import Any, Optional, Union
import logging

from app.core.config import settings

logger = logging.getLogger(__name__)

# Redis connection pool
redis_client: Optional[redis.Redis] = None

async def init_cache():
    """Initialize Redis cache connection"""
    global redis_client
    
    try:
        redis_client = redis.from_url(
            settings.REDIS_URL,
            db=settings.REDIS_DB,
            password=settings.REDIS_PASSWORD,
            decode_responses=True,
            socket_connect_timeout=5,
            socket_timeout=5,
            retry_on_timeout=True,
        )
        
        # Test connection
        await redis_client.ping()
        logger.info("Redis cache initialized successfully")
        
    except Exception as e:
        logger.error(f"Failed to initialize Redis cache: {e}")
        raise

async def close_cache():
    """Close Redis cache connection"""
    global redis_client
    
    if redis_client:
        await redis_client.close()
        logger.info("Redis cache connection closed")

async def get_cache() -> redis.Redis:
    """Get Redis cache client"""
    if not redis_client:
        raise RuntimeError("Redis cache not initialized")
    return redis_client

async def set_cache(key: str, value: Any, expire: int = 3600) -> bool:
    """Set cache value with expiration"""
    try:
        cache = await get_cache()
        serialized_value = json.dumps(value) if not isinstance(value, (str, int, float, bool)) else value
        return await cache.set(key, serialized_value, ex=expire)
    except Exception as e:
        logger.error(f"Failed to set cache key {key}: {e}")
        return False

async def get_cache_value(key: str) -> Optional[Any]:
    """Get cache value"""
    try:
        cache = await get_cache()
        value = await cache.get(key)
        if value is None:
            return None
        
        # Try to deserialize JSON
        try:
            return json.loads(value)
        except (json.JSONDecodeError, TypeError):
            return value
            
    except Exception as e:
        logger.error(f"Failed to get cache key {key}: {e}")
        return None

async def delete_cache(key: str) -> bool:
    """Delete cache key"""
    try:
        cache = await get_cache()
        return bool(await cache.delete(key))
    except Exception as e:
        logger.error(f"Failed to delete cache key {key}: {e}")
        return False

async def clear_cache_pattern(pattern: str) -> int:
    """Clear cache keys matching pattern"""
    try:
        cache = await get_cache()
        keys = await cache.keys(pattern)
        if keys:
            return await cache.delete(*keys)
        return 0
    except Exception as e:
        logger.error(f"Failed to clear cache pattern {pattern}: {e}")
        return 0

async def cache_exists(key: str) -> bool:
    """Check if cache key exists"""
    try:
        cache = await get_cache()
        return bool(await cache.exists(key))
    except Exception as e:
        logger.error(f"Failed to check cache key {key}: {e}")
        return False

async def get_cache_ttl(key: str) -> int:
    """Get cache key TTL in seconds"""
    try:
        cache = await get_cache()
        ttl = await cache.ttl(key)
        return ttl if ttl > 0 else -1
    except Exception as e:
        logger.error(f"Failed to get TTL for cache key {key}: {e}")
        return -1
