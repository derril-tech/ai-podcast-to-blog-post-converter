import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Import providers and components
import { Providers } from '@/components/providers';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        default: 'EchoPress AI — Podcast to Blog Converter',
        template: '%s | EchoPress AI',
    },
    description: 'Turn any episode into a polished, SEO ready article—grounded in what was actually said.',
    keywords: [
        'podcast',
        'blog',
        'converter',
        'AI',
        'transcription',
        'SEO',
        'content creation',
        'automation',
    ],
    authors: [{ name: 'EchoPress AI Team' }],
    creator: 'EchoPress AI',
    publisher: 'EchoPress AI',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: '/',
        title: 'EchoPress AI — Podcast to Blog Converter',
        description: 'Turn any episode into a polished, SEO ready article—grounded in what was actually said.',
        siteName: 'EchoPress AI',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'EchoPress AI — Podcast to Blog Converter',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'EchoPress AI — Podcast to Blog Converter',
        description: 'Turn any episode into a polished, SEO ready article—grounded in what was actually said.',
        images: ['/og-image.png'],
        creator: '@echopress_ai',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} antialiased`}>
                <Providers>
                    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                        <Header />
                        <main className="flex-1">
                            {children}
                        </main>
                        <Footer />
                    </div>
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
