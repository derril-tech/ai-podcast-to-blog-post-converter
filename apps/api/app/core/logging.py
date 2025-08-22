"""
EchoPress AI Backend - Logging Configuration
Structured logging setup with correlation IDs
"""

import logging
import sys
from typing import Any, Dict
import structlog
from structlog.stdlib import LoggerFactory

def setup_logging():
    """Setup structured logging configuration"""
    
    # Configure structlog
    structlog.configure(
        processors=[
            structlog.stdlib.filter_by_level,
            structlog.stdlib.add_logger_name,
            structlog.stdlib.add_log_level,
            structlog.stdlib.PositionalArgumentsFormatter(),
            structlog.processors.TimeStamper(fmt="iso"),
            structlog.processors.StackInfoRenderer(),
            structlog.processors.format_exc_info,
            structlog.processors.UnicodeDecoder(),
            structlog.processors.JSONRenderer()
        ],
        context_class=dict,
        logger_factory=LoggerFactory(),
        wrapper_class=structlog.stdlib.BoundLogger,
        cache_logger_on_first_use=True,
    )
    
    # Configure standard library logging
    logging.basicConfig(
        format="%(message)s",
        stream=sys.stdout,
        level=getattr(logging, settings.LOG_LEVEL.upper()),
    )
    
    # Set specific logger levels
    logging.getLogger("uvicorn").setLevel(logging.INFO)
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)
    
    # Create logger instance
    logger = structlog.get_logger()
    logger.info("Logging configured successfully")

def get_logger(name: str = None) -> structlog.BoundLogger:
    """Get a structured logger instance"""
    return structlog.get_logger(name)

def log_with_context(logger: structlog.BoundLogger, message: str, **kwargs: Any) -> None:
    """Log message with additional context"""
    logger.info(message, **kwargs)

def log_error(logger: structlog.BoundLogger, message: str, error: Exception = None, **kwargs: Any) -> None:
    """Log error with context"""
    context = kwargs.copy()
    if error:
        context["error"] = str(error)
        context["error_type"] = type(error).__name__
    
    logger.error(message, **context)
