"""
EchoPress AI Backend - WebSocket Manager
Real-time communication for workflow progress and status updates
"""

import asyncio
import logging
import json
from typing import Dict, Set, Optional, Any
from datetime import datetime
from fastapi import WebSocket, WebSocketDisconnect
from enum import Enum

logger = logging.getLogger(__name__)

class WebSocketEventType(Enum):
    """WebSocket event types"""
    WORKFLOW_PROGRESS = "workflow_progress"
    WORKFLOW_STATUS = "workflow_status"
    WORKFLOW_LOG = "workflow_log"
    WORKFLOW_ERROR = "workflow_error"
    WORKFLOW_COMPLETED = "workflow_completed"
    TRANSCRIPTION_PROGRESS = "transcription_progress"
    CONTENT_GENERATION_PROGRESS = "content_generation_progress"
    DRAFT_READY = "draft_ready"

class WebSocketManager:
    """Manages WebSocket connections and real-time updates"""
    
    def __init__(self):
        self.active_connections: Dict[str, Set[WebSocket]] = {}
        self.episode_connections: Dict[str, Set[WebSocket]] = {}
        self.user_connections: Dict[str, Set[WebSocket]] = {}
    
    async def connect(self, websocket: WebSocket, connection_type: str, identifier: str):
        """Connect a WebSocket client"""
        try:
            await websocket.accept()
            
            # Add to appropriate connection sets
            if connection_type == "episode":
                if identifier not in self.episode_connections:
                    self.episode_connections[identifier] = set()
                self.episode_connections[identifier].add(websocket)
            elif connection_type == "user":
                if identifier not in self.user_connections:
                    self.user_connections[identifier] = set()
                self.user_connections[identifier].add(websocket)
            
            # Add to active connections
            connection_id = f"{connection_type}_{identifier}"
            if connection_id not in self.active_connections:
                self.active_connections[connection_id] = set()
            self.active_connections[connection_id].add(websocket)
            
            logger.info(f"WebSocket connected: {connection_type} - {identifier}")
            
            # Send initial connection confirmation
            await self.send_personal_message(websocket, {
                "type": "connection_established",
                "connection_type": connection_type,
                "identifier": identifier,
                "timestamp": datetime.now().isoformat()
            })
            
        except Exception as e:
            logger.error(f"WebSocket connection failed: {e}")
            raise
    
    async def disconnect(self, websocket: WebSocket, connection_type: str, identifier: str):
        """Disconnect a WebSocket client"""
        try:
            # Remove from episode connections
            if connection_type == "episode" and identifier in self.episode_connections:
                self.episode_connections[identifier].discard(websocket)
                if not self.episode_connections[identifier]:
                    del self.episode_connections[identifier]
            
            # Remove from user connections
            elif connection_type == "user" and identifier in self.user_connections:
                self.user_connections[identifier].discard(websocket)
                if not self.user_connections[identifier]:
                    del self.user_connections[identifier]
            
            # Remove from active connections
            connection_id = f"{connection_type}_{identifier}"
            if connection_id in self.active_connections:
                self.active_connections[connection_id].discard(websocket)
                if not self.active_connections[connection_id]:
                    del self.active_connections[connection_id]
            
            logger.info(f"WebSocket disconnected: {connection_type} - {identifier}")
            
        except Exception as e:
            logger.error(f"WebSocket disconnection error: {e}")
    
    async def send_personal_message(self, websocket: WebSocket, message: Dict[str, Any]):
        """Send message to a specific WebSocket client"""
        try:
            await websocket.send_text(json.dumps(message))
        except Exception as e:
            logger.error(f"Failed to send personal message: {e}")
    
    async def broadcast_to_episode(self, episode_id: str, message: Dict[str, Any]):
        """Broadcast message to all connections for a specific episode"""
        if episode_id in self.episode_connections:
            disconnected = set()
            for websocket in self.episode_connections[episode_id]:
                try:
                    await websocket.send_text(json.dumps(message))
                except Exception as e:
                    logger.error(f"Failed to send message to episode {episode_id}: {e}")
                    disconnected.add(websocket)
            
            # Clean up disconnected websockets
            for websocket in disconnected:
                self.episode_connections[episode_id].discard(websocket)
    
    async def broadcast_to_user(self, user_id: str, message: Dict[str, Any]):
        """Broadcast message to all connections for a specific user"""
        if user_id in self.user_connections:
            disconnected = set()
            for websocket in self.user_connections[user_id]:
                try:
                    await websocket.send_text(json.dumps(message))
                except Exception as e:
                    logger.error(f"Failed to send message to user {user_id}: {e}")
                    disconnected.add(websocket)
            
            # Clean up disconnected websockets
            for websocket in disconnected:
                self.user_connections[user_id].discard(websocket)
    
    async def send_workflow_progress(self, episode_id: str, progress: float, status: str):
        """Send workflow progress update"""
        message = {
            "type": WebSocketEventType.WORKFLOW_PROGRESS.value,
            "episode_id": episode_id,
            "progress": progress,
            "status": status,
            "timestamp": datetime.now().isoformat()
        }
        await self.broadcast_to_episode(episode_id, message)
    
    async def send_workflow_log(self, episode_id: str, log_message: str):
        """Send workflow log message"""
        message = {
            "type": WebSocketEventType.WORKFLOW_LOG.value,
            "episode_id": episode_id,
            "message": log_message,
            "timestamp": datetime.now().isoformat()
        }
        await self.broadcast_to_episode(episode_id, message)
    
    async def send_workflow_error(self, episode_id: str, error_message: str):
        """Send workflow error message"""
        message = {
            "type": WebSocketEventType.WORKFLOW_ERROR.value,
            "episode_id": episode_id,
            "error": error_message,
            "timestamp": datetime.now().isoformat()
        }
        await self.broadcast_to_episode(episode_id, message)
    
    async def send_workflow_completed(self, episode_id: str, draft_id: str):
        """Send workflow completion notification"""
        message = {
            "type": WebSocketEventType.WORKFLOW_COMPLETED.value,
            "episode_id": episode_id,
            "draft_id": draft_id,
            "timestamp": datetime.now().isoformat()
        }
        await self.broadcast_to_episode(episode_id, message)
    
    async def send_transcription_progress(self, episode_id: str, progress: float, message: str):
        """Send transcription progress update"""
        ws_message = {
            "type": WebSocketEventType.TRANSCRIPTION_PROGRESS.value,
            "episode_id": episode_id,
            "progress": progress,
            "message": message,
            "timestamp": datetime.now().isoformat()
        }
        await self.broadcast_to_episode(episode_id, ws_message)
    
    async def send_content_generation_progress(self, episode_id: str, progress: float, message: str):
        """Send content generation progress update"""
        ws_message = {
            "type": WebSocketEventType.CONTENT_GENERATION_PROGRESS.value,
            "episode_id": episode_id,
            "progress": progress,
            "message": message,
            "timestamp": datetime.now().isoformat()
        }
        await self.broadcast_to_episode(episode_id, ws_message)
    
    async def send_draft_ready(self, episode_id: str, draft_id: str, title: str):
        """Send draft ready notification"""
        message = {
            "type": WebSocketEventType.DRAFT_READY.value,
            "episode_id": episode_id,
            "draft_id": draft_id,
            "title": title,
            "timestamp": datetime.now().isoformat()
        }
        await self.broadcast_to_episode(episode_id, message)
    
    def get_connection_count(self, connection_type: str, identifier: str) -> int:
        """Get number of active connections for a specific type and identifier"""
        if connection_type == "episode" and identifier in self.episode_connections:
            return len(self.episode_connections[identifier])
        elif connection_type == "user" and identifier in self.user_connections:
            return len(self.user_connections[identifier])
        return 0
    
    def get_total_connections(self) -> int:
        """Get total number of active connections"""
        total = 0
        for connections in self.episode_connections.values():
            total += len(connections)
        for connections in self.user_connections.values():
            total += len(connections)
        return total

# Global WebSocket manager instance
websocket_manager = WebSocketManager()
