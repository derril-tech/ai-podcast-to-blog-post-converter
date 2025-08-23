import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Users, Eye, Clock, BarChart3 } from 'lucide-react';

export default function AnalyticsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Track your content performance and SEO metrics
                </p>
            </div>

            {/* Date Range Picker */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">Last 7 days</Button>
                    <Button variant="outline" size="sm">Last 30 days</Button>
                    <Button variant="outline" size="sm">Last 90 days</Button>
                </div>
                <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Export Report
                </Button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Episodes</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                            +12% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Blog Posts Published</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">18</div>
                        <p className="text-xs text-muted-foreground flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                            +8% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Processing Time</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.2m</div>
                        <p className="text-xs text-muted-foreground flex items-center">
                            <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
                            -15% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">94.2%</div>
                        <p className="text-xs text-muted-foreground flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                            +2.1% from last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* SEO Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>SEO Performance</CardTitle>
                        <CardDescription>Organic traffic and search rankings</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Organic Traffic</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold">12.4K</span>
                                    <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                        +23%
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Avg. Position</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold">8.2</span>
                                    <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                        +1.5
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Click-through Rate</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold">4.8%</span>
                                    <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                        +0.3%
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Content Quality</CardTitle>
                        <CardDescription>AI-generated content metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Originality Score</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold">96.8%</span>
                                    <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                        Excellent
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Citation Coverage</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold">89.2%</span>
                                    <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                        Good
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Readability Score</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold">8.4/10</span>
                                    <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                        High
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Top Performing Content */}
            <Card>
                <CardHeader>
                    <CardTitle>Top Performing Content</CardTitle>
                    <CardDescription>Your best-performing blog posts and episodes</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                                <h4 className="font-medium">The Future of AI in Podcasting</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Published Jan 15, 2024</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="font-medium">2.4K views</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">+45%</div>
                                </div>
                                <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    Top Performer
                                </Badge>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                                <h4 className="font-medium">Building Scalable Web Applications</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Published Jan 16, 2024</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="font-medium">1.8K views</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">+32%</div>
                                </div>
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                    Trending
                                </Badge>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                                <h4 className="font-medium">Machine Learning Fundamentals</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Published Jan 17, 2024</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="font-medium">1.2K views</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">+18%</div>
                                </div>
                                <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                                    New
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
