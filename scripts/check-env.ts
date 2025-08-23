#!/usr/bin/env tsx

/**
 * Environment Check Script
 * Validates that all required environment variables are set
 */

import { readFileSync } from 'fs';
import { join } from 'path';

interface EnvVar {
    name: string;
    required: boolean;
    description: string;
    example?: string;
}

const requiredEnvVars: EnvVar[] = [
    // Database
    {
        name: 'DATABASE_URL',
        required: true,
        description: 'PostgreSQL database connection string',
        example: 'postgresql://user:password@localhost:5432/echopress_ai'
    },
    {
        name: 'REDIS_URL',
        required: true,
        description: 'Redis connection string',
        example: 'redis://localhost:6379'
    },

    // AI Services
    {
        name: 'OPENAI_API_KEY',
        required: true,
        description: 'OpenAI API key for GPT-4 and Whisper',
        example: 'sk-...'
    },
    {
        name: 'ANTHROPIC_API_KEY',
        required: false,
        description: 'Anthropic API key for Claude (optional)',
        example: 'sk-ant-...'
    },

    // Authentication
    {
        name: 'JWT_SECRET',
        required: true,
        description: 'Secret key for JWT token signing',
        example: 'your-secret-key-here'
    },
    {
        name: 'JWT_ALGORITHM',
        required: false,
        description: 'JWT signing algorithm (default: HS256)',
        example: 'HS256'
    },

    // Storage
    {
        name: 'STORAGE_BUCKET',
        required: false,
        description: 'S3 bucket name for file storage',
        example: 'echopress-uploads'
    },
    {
        name: 'AWS_ACCESS_KEY_ID',
        required: false,
        description: 'AWS access key for S3 storage',
        example: 'AKIA...'
    },
    {
        name: 'AWS_SECRET_ACCESS_KEY',
        required: false,
        description: 'AWS secret key for S3 storage',
        example: '...'
    },

    // Email
    {
        name: 'SMTP_URL',
        required: false,
        description: 'SMTP server URL for email notifications',
        example: 'smtp://user:pass@smtp.gmail.com:587'
    },

    // CMS Integrations
    {
        name: 'CMS_WORDPRESS_URL',
        required: false,
        description: 'WordPress site URL for publishing',
        example: 'https://example.com'
    },
    {
        name: 'CMS_GHOST_URL',
        required: false,
        description: 'Ghost site URL for publishing',
        example: 'https://example.com'
    },

    // Analytics
    {
        name: 'GOOGLE_SEARCH_CONSOLE_KEY',
        required: false,
        description: 'Google Search Console API key',
        example: '...'
    },

    // Application
    {
        name: 'ENVIRONMENT',
        required: false,
        description: 'Application environment (development/production)',
        example: 'development'
    },
    {
        name: 'ALLOWED_ORIGINS',
        required: false,
        description: 'Comma-separated list of allowed CORS origins',
        example: 'http://localhost:3000,https://echopress.ai'
    },
    {
        name: 'ALLOWED_HOSTS',
        required: false,
        description: 'Comma-separated list of allowed hosts',
        example: 'localhost,echopress.ai'
    }
];

function loadEnvFile(filePath: string): Record<string, string> {
    try {
        const content = readFileSync(filePath, 'utf-8');
        const env: Record<string, string> = {};

        content.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const [key, ...valueParts] = trimmed.split('=');
                if (key && valueParts.length > 0) {
                    env[key] = valueParts.join('=');
                }
            }
        });

        return env;
    } catch (error) {
        return {};
    }
}

function checkEnvVars(): { missing: string[]; warnings: string[] } {
    const env = { ...process.env, ...loadEnvFile('.env') };
    const missing: string[] = [];
    const warnings: string[] = [];

    requiredEnvVars.forEach(envVar => {
        const value = env[envVar.name];

        if (!value && envVar.required) {
            missing.push(envVar.name);
        } else if (!value && !envVar.required) {
            warnings.push(envVar.name);
        }
    });

    return { missing, warnings };
}

function main() {
    console.log('🔍 Checking environment variables...\n');

    const { missing, warnings } = checkEnvVars();

    if (missing.length > 0) {
        console.log('❌ Missing required environment variables:');
        missing.forEach(name => {
            const envVar = requiredEnvVars.find(v => v.name === name);
            console.log(`   ${name}: ${envVar?.description}`);
            if (envVar?.example) {
                console.log(`      Example: ${envVar.example}`);
            }
        });
        console.log('\n💡 Please add these variables to your .env file');
        process.exit(1);
    }

    if (warnings.length > 0) {
        console.log('⚠️  Optional environment variables not set:');
        warnings.forEach(name => {
            const envVar = requiredEnvVars.find(v => v.name === name);
            console.log(`   ${name}: ${envVar?.description}`);
        });
        console.log('\n💡 These are optional but recommended for full functionality');
    }

    console.log('✅ All required environment variables are set!');

    // Additional checks
    console.log('\n🔧 Additional checks:');

    // Check if database URL is valid
    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl && !dbUrl.startsWith('postgresql://')) {
        console.log('⚠️  DATABASE_URL should start with "postgresql://"');
    }

    // Check if Redis URL is valid
    const redisUrl = process.env.REDIS_URL;
    if (redisUrl && !redisUrl.startsWith('redis://')) {
        console.log('⚠️  REDIS_URL should start with "redis://"');
    }

    // Check JWT secret length
    const jwtSecret = process.env.JWT_SECRET;
    if (jwtSecret && jwtSecret.length < 32) {
        console.log('⚠️  JWT_SECRET should be at least 32 characters long');
    }

    console.log('\n🎉 Environment check complete!');
}

if (require.main === module) {
    main();
}

export { checkEnvVars, requiredEnvVars };
