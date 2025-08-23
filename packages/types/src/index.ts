// API Types
export interface ApiResponse<T = any> {
    data: T;
    message?: string;
    success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// User Types
export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

// Episode Types
export interface Episode {
    id: string;
    title: string;
    description: string;
    audioUrl: string;
    duration: number;
    transcript?: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    createdAt: string;
    updatedAt: string;
}

// Blog Post Types
export interface BlogPost {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    seoTitle?: string;
    seoDescription?: string;
    keywords?: string[];
    status: 'draft' | 'published';
    episodeId: string;
    createdAt: string;
    updatedAt: string;
}

// Error Types
export interface ApiError {
    code: string;
    message: string;
    details?: any;
}

// File Upload Types
export interface FileUpload {
    id: string;
    filename: string;
    size: number;
    mimeType: string;
    url: string;
    uploadedAt: string;
}
