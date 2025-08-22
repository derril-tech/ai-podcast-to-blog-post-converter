import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Mic,
    FileText,
    Search,
    Zap,
    Shield,
    Globe,
    Upload,
    Play,
    CheckCircle,
    ArrowRight,
    Star
} from 'lucide-react';

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                    <div className="text-center">
                        <Badge variant="secondary" className="mb-4">
                            <Zap className="w-4 h-4 mr-2" />
                            AI-Powered Content Creation
                        </Badge>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                            Turn Any Episode Into a
                            <span className="gradient-text block">Polished Blog Post</span>
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                            EchoPress AI transforms podcast episodes into SEO-ready articles with citations,
                            fact-checking, and brand voice consistency. Grounded in what was actually said.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button size="lg" asChild>
                                <Link href="/dashboard">
                                    <Upload className="w-5 h-5 mr-2" />
                                    Upload Your First Episode
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link href="/demo">
                                    <Play className="w-5 h-5 mr-2" />
                                    Watch Demo
                                </Link>
                            </Button>
                        </div>

                        <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                                <span>Free Trial Available</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                                <span>No Credit Card Required</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                                <span>Setup in 2 Minutes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Everything You Need to Scale Content Creation
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            From transcription to publication, EchoPress AI handles every step of the content pipeline
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1: Transcription */}
                        <Card className="group hover:shadow-lg transition-all duration-300">
                            <CardHeader>
                                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/40 transition-colors">
                                    <Mic className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                </div>
                                <CardTitle>Accurate Transcription</CardTitle>
                                <CardDescription>
                                    High-quality ASR with speaker diarization and word-level timestamps
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        Multiple language support
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        Speaker identification
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        Noise reduction
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Feature 2: Content Generation */}
                        <Card className="group hover:shadow-lg transition-all duration-300">
                            <CardHeader>
                                <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary-200 dark:group-hover:bg-secondary-900/40 transition-colors">
                                    <FileText className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
                                </div>
                                <CardTitle>AI-Powered Drafting</CardTitle>
                                <CardDescription>
                                    Generate blog posts with citations and fact-checking built-in
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        Evidence-linked content
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        Plagiarism detection
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        Brand voice consistency
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Feature 3: SEO Optimization */}
                        <Card className="group hover:shadow-lg transition-all duration-300">
                            <CardHeader>
                                <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent-200 dark:group-hover:bg-accent-900/40 transition-colors">
                                    <Search className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                                </div>
                                <CardTitle>SEO Optimization</CardTitle>
                                <CardDescription>
                                    Automatic keyword optimization and schema markup generation
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        Meta descriptions
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        Structured data
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        Internal linking
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Feature 4: Brand Voice */}
                        <Card className="group hover:shadow-lg transition-all duration-300">
                            <CardHeader>
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/40 transition-colors">
                                    <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <CardTitle>Brand Voice Engine</CardTitle>
                                <CardDescription>
                                    Maintain consistent tone and style across all content
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        Style guide enforcement
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        Tone profiles
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        Banned terms filtering
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Feature 5: Multi-platform Export */}
                        <Card className="group hover:shadow-lg transition-all duration-300">
                            <CardHeader>
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-900/40 transition-colors">
                                    <Globe className="w-6 h-6 text-green-600 dark:text-green-400" />
                                </div>
                                <CardTitle>Multi-platform Export</CardTitle>
                                <CardDescription>
                                    One-click publishing to WordPress, Ghost, Medium, and more
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        WordPress integration
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        Ghost CMS support
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        Markdown export
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Feature 6: Analytics */}
                        <Card className="group hover:shadow-lg transition-all duration-300">
                            <CardHeader>
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40 transition-colors">
                                    <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <CardTitle>Performance Analytics</CardTitle>
                                <CardDescription>
                                    Track content performance and optimize for better results
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        SEO metrics
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        Engagement tracking
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        A/B testing
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Transform Your Podcast Content?
                    </h2>
                    <p className="text-xl text-primary-100 mb-8">
                        Join thousands of creators who are already saving hours every week with EchoPress AI
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" asChild>
                            <Link href="/dashboard">
                                Start Free Trial
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600" asChild>
                            <Link href="/pricing">
                                View Pricing
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
