import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Users,
    Zap,
    Shield,
    Globe,
    Award,
    ArrowRight,
    CheckCircle
} from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <Badge variant="secondary" className="mb-4">
                    <Zap className="w-4 h-4 mr-2" />
                    AI-Powered Content Creation
                </Badge>

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                    About EchoPress AI
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                    We're revolutionizing how podcasters and content creators turn their audio into
                    engaging, SEO-optimized blog posts using cutting-edge AI technology.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" asChild>
                        <a href="/dashboard">
                            Get Started
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </a>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <a href="/contact">Contact Us</a>
                    </Button>
                </div>
            </div>

            {/* Mission Section */}
            <div className="mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            Our Mission
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            We believe that valuable content shouldn't be locked away in audio format.
                            Our mission is to democratize content creation by making it easy for anyone
                            to transform their podcast episodes into high-quality, SEO-optimized blog posts.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            Using advanced AI technology, we ensure that every blog post maintains the
                            authenticity and voice of the original content while being optimized for
                            search engines and reader engagement.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span className="font-medium">Accurate Transcription</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span className="font-medium">SEO Optimized</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8">
                            <div className="text-center">
                                <Users className="w-16 h-16 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Trusted by 10,000+ Creators</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    From solo podcasters to major media companies
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                    Our Values
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="text-center">
                        <CardHeader>
                            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Zap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                            </div>
                            <CardTitle>Innovation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                We continuously push the boundaries of AI technology to deliver
                                the best possible content creation experience.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardHeader>
                            <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
                            </div>
                            <CardTitle>Trust & Quality</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                We maintain the highest standards of accuracy and quality,
                                ensuring your content always represents your voice authentically.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardHeader>
                            <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Globe className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                            </div>
                            <CardTitle>Accessibility</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                We believe powerful content creation tools should be accessible
                                to creators of all sizes and backgrounds.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Team Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                    Meet Our Team
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <Card className="text-center">
                        <CardHeader>
                            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
                            <CardTitle>Sarah Johnson</CardTitle>
                            <CardDescription>CEO & Founder</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Former AI researcher with 10+ years in content creation
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardHeader>
                            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
                            <CardTitle>Michael Chen</CardTitle>
                            <CardDescription>CTO</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Expert in machine learning and natural language processing
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardHeader>
                            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
                            <CardTitle>Emily Rodriguez</CardTitle>
                            <CardDescription>Head of Product</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                UX specialist focused on creator experience
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardHeader>
                            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
                            <CardTitle>David Kim</CardTitle>
                            <CardDescription>Head of Engineering</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Full-stack engineer with expertise in scalable systems
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Stats Section */}
            <div className="mb-16">
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold mb-2">10,000+</div>
                            <div className="text-primary-100">Active Users</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2">50,000+</div>
                            <div className="text-primary-100">Episodes Processed</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2">95%</div>
                            <div className="text-primary-100">Accuracy Rate</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2">24/7</div>
                            <div className="text-primary-100">Support Available</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Awards Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                    Recognition & Awards
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="text-center">
                        <CardHeader>
                            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <CardTitle>Best AI Product 2024</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Recognized by TechCrunch for innovation in AI-powered content creation
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardHeader>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <CardTitle>Startup of the Year</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Winner of the 2024 Content Creator Awards
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardHeader>
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <CardTitle>Excellence in Accessibility</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Awarded for making content creation accessible to all creators
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Ready to Transform Your Content?
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                    Join thousands of creators who are already saving hours every week
                    and reaching more readers with EchoPress AI.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" asChild>
                        <a href="/dashboard">
                            Start Free Trial
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </a>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <a href="/demo">Watch Demo</a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
