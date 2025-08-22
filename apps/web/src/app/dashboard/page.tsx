import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Upload,
    FileText,
    TrendingUp,
    Clock,
    CheckCircle,
    AlertCircle,
    Plus,
    Search
} from 'lucide-react';

export default function DashboardPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Welcome back! Here's an overview of your podcast content.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Episodes</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">
                            +2 from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Published Posts</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">18</div>
                        <p className="text-xs text-muted-foreground">
                            +3 from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">6</div>
                        <p className="text-xs text-muted-foreground">
                            2 in transcription
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. SEO Score</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">87</div>
                        <p className="text-xs text-muted-foreground">
                            +5 from last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Quick Actions
                </h2>
                <div className="flex flex-wrap gap-4">
                    <Button size="lg" className="flex items-center gap-2">
                        <Upload className="h-5 w-5" />
                        Upload New Episode
                    </Button>
                    <Button variant="outline" size="lg" className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        Create Draft
                    </Button>
                    <Button variant="outline" size="lg" className="flex items-center gap-2">
                        <Search className="h-5 w-5" />
                        View Analytics
                    </Button>
                </div>
            </div>

            {/* Recent Episodes */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Recent Episodes
                    </h2>
                    <Button variant="outline" size="sm">
                        View All
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Episode Card 1 */}
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <Badge variant="secondary" className="mb-2">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Published
                                </Badge>
                                <span className="text-sm text-muted-foreground">2 hours ago</span>
                            </div>
                            <CardTitle className="text-lg">The Future of AI in 2024</CardTitle>
                            <CardDescription>
                                Exploring the latest trends and predictions in artificial intelligence
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Duration: 45:30</span>
                                <span className="text-muted-foreground">SEO Score: 92</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Episode Card 2 */}
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <Badge variant="outline" className="mb-2">
                                    <Clock className="h-3 w-3 mr-1" />
                                    Processing
                                </Badge>
                                <span className="text-sm text-muted-foreground">1 day ago</span>
                            </div>
                            <CardTitle className="text-lg">Machine Learning Basics</CardTitle>
                            <CardDescription>
                                A comprehensive guide to understanding machine learning fundamentals
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Duration: 52:15</span>
                                <span className="text-muted-foreground">Transcribing...</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Episode Card 3 */}
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <Badge variant="destructive" className="mb-2">
                                    <AlertCircle className="h-3 w-3 mr-1" />
                                    Error
                                </Badge>
                                <span className="text-sm text-muted-foreground">3 days ago</span>
                            </div>
                            <CardTitle className="text-lg">Data Science Interview Prep</CardTitle>
                            <CardDescription>
                                Tips and strategies for acing your data science interviews
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Duration: 38:45</span>
                                <span className="text-red-500">Upload failed</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Performance Insights */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Performance Insights
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Performing Posts</CardTitle>
                            <CardDescription>
                                Your best performing blog posts this month
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">AI Trends 2024</p>
                                        <p className="text-sm text-muted-foreground">Published 2 weeks ago</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">2.4k views</p>
                                        <p className="text-sm text-green-600">+15%</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Machine Learning Guide</p>
                                        <p className="text-sm text-muted-foreground">Published 1 month ago</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">1.8k views</p>
                                        <p className="text-sm text-green-600">+8%</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>SEO Performance</CardTitle>
                            <CardDescription>
                                Average SEO scores by category
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span>AI & Technology</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                                        </div>
                                        <span className="text-sm font-medium">92</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Data Science</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 bg-gray-200 rounded-full h-2">
                                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                                        </div>
                                        <span className="text-sm font-medium">87</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Career Advice</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 bg-gray-200 rounded-full h-2">
                                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                                        </div>
                                        <span className="text-sm font-medium">78</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
