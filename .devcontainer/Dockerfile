# Use a multi-stage build to create a development environment
FROM node:18-bullseye

# Install Python and other dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    git \
    curl \
    wget \
    vim \
    nano \
    && rm -rf /var/lib/apt/lists/*

# Create a Python virtual environment
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Upgrade pip
RUN pip install --upgrade pip

# Install global Node.js packages
RUN npm install -g npm@latest

# Set working directory
WORKDIR /workspace

# Create a non-root user
RUN useradd -m -s /bin/bash vscode && \
    chown -R vscode:vscode /workspace

USER vscode

# Set environment variables
ENV NODE_ENV=development
ENV PYTHONPATH=/workspace/apps/api

# Default command
CMD ["sleep", "infinity"]
