-- EchoPress AI Database Initialization Script
-- This script sets up the initial database schema and extensions

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Create custom types
CREATE TYPE user_role AS ENUM ('owner', 'admin', 'editor', 'reviewer');
CREATE TYPE episode_status AS ENUM ('uploading', 'processing', 'transcribing', 'drafting', 'completed', 'failed');
CREATE TYPE draft_status AS ENUM ('draft', 'review', 'approved', 'published');
CREATE TYPE export_status AS ENUM ('pending', 'processing', 'completed', 'failed');
CREATE TYPE export_format AS ENUM ('wordpress', 'ghost', 'medium', 'webflow', 'markdown');

-- Create organizations table
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    domain VARCHAR(255),
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create workspaces table
CREATE TABLE workspaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(organization_id, slug)
);

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'editor',
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create brand voices table
CREATE TABLE brand_voices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    tone VARCHAR(100),
    style_guide JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create episodes table
CREATE TABLE episodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    brand_voice_id UUID REFERENCES brand_voices(id) ON DELETE SET NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    audio_url VARCHAR(1000),
    duration INTEGER, -- in seconds
    file_size BIGINT, -- in bytes
    status episode_status DEFAULT 'uploading',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create transcripts table
CREATE TABLE transcripts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    episode_id UUID NOT NULL REFERENCES episodes(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    language VARCHAR(10) DEFAULT 'en',
    confidence FLOAT,
    diarization_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create transcript segments table
CREATE TABLE transcript_segments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transcript_id UUID NOT NULL REFERENCES transcripts(id) ON DELETE CASCADE,
    start_ms INTEGER NOT NULL,
    end_ms INTEGER NOT NULL,
    speaker VARCHAR(100),
    text TEXT NOT NULL,
    confidence FLOAT,
    vector vector(1536), -- OpenAI embedding vector
    topic VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create drafts table
CREATE TABLE drafts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    episode_id UUID NOT NULL REFERENCES episodes(id) ON DELETE CASCADE,
    brand_voice_id UUID REFERENCES brand_voices(id) ON DELETE SET NULL,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    version INTEGER DEFAULT 1,
    status draft_status DEFAULT 'draft',
    seo_data JSONB DEFAULT '{}',
    citations JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create exports table
CREATE TABLE exports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    draft_id UUID NOT NULL REFERENCES drafts(id) ON DELETE CASCADE,
    format export_format NOT NULL,
    status export_status DEFAULT 'pending',
    url VARCHAR(1000),
    cms_config JSONB DEFAULT '{}',
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Create analytics table
CREATE TABLE analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    episode_id UUID REFERENCES episodes(id) ON DELETE CASCADE,
    draft_id UUID REFERENCES drafts(id) ON DELETE CASCADE,
    metric VARCHAR(100) NOT NULL,
    value JSONB NOT NULL,
    captured_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_episodes_workspace_id ON episodes(workspace_id);
CREATE INDEX idx_episodes_user_id ON episodes(user_id);
CREATE INDEX idx_episodes_status ON episodes(status);
CREATE INDEX idx_episodes_created_at ON episodes(created_at);

CREATE INDEX idx_transcripts_episode_id ON transcripts(episode_id);

CREATE INDEX idx_transcript_segments_transcript_id ON transcript_segments(transcript_id);
CREATE INDEX idx_transcript_segments_start_ms ON transcript_segments(start_ms);
CREATE INDEX idx_transcript_segments_speaker ON transcript_segments(speaker);
CREATE INDEX idx_transcript_segments_vector ON transcript_segments USING ivfflat (vector vector_cosine_ops) WITH (lists = 100);

CREATE INDEX idx_drafts_episode_id ON drafts(episode_id);
CREATE INDEX idx_drafts_status ON drafts(status);
CREATE INDEX idx_drafts_created_at ON drafts(created_at);

CREATE INDEX idx_exports_draft_id ON exports(draft_id);
CREATE INDEX idx_exports_status ON exports(status);

CREATE INDEX idx_analytics_episode_id ON analytics(episode_id);
CREATE INDEX idx_analytics_draft_id ON analytics(draft_id);
CREATE INDEX idx_analytics_metric ON analytics(metric);
CREATE INDEX idx_analytics_captured_at ON analytics(captured_at);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_workspaces_updated_at BEFORE UPDATE ON workspaces FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_brand_voices_updated_at BEFORE UPDATE ON brand_voices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_episodes_updated_at BEFORE UPDATE ON episodes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transcripts_updated_at BEFORE UPDATE ON transcripts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_drafts_updated_at BEFORE UPDATE ON drafts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for development
INSERT INTO organizations (id, name, slug, domain) VALUES 
    ('550e8400-e29b-41d4-a716-446655440000', 'EchoPress AI', 'echopress-ai', 'echopress.ai');

INSERT INTO workspaces (id, organization_id, name, slug) VALUES 
    ('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'Default Workspace', 'default');

INSERT INTO users (id, organization_id, email, name, hashed_password, role) VALUES 
    ('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'admin@echopress.ai', 'Admin User', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS.i8mG', 'admin');

INSERT INTO brand_voices (id, workspace_id, name, description, tone) VALUES 
    ('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Professional', 'Professional and authoritative tone for business content', 'professional');
