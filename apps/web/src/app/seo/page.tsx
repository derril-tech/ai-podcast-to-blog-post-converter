'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Eye, 
  Zap,
  CheckCircle,
  AlertCircle,
  Clock,
  Edit3,
  Save
} from 'lucide-react';

export default function SEOStudioPage() {
  const [seoData, setSeoData] = useState({
    title: 'The Future of AI in Content Creation: A Comprehensive Guide',
    metaDescription: 'Discover how artificial intelligence is transforming content creation. Learn about AI tools, human-AI collaboration, and the future of creative work.',
    keywords: ['AI content creation', 'artificial intelligence', 'content marketing', 'AI tools'],
    slug: 'future-ai-content-creation-guide',
    readabilityScore: 8.5,
    seoScore: 92,
    wordCount: 1500,
    readingTime: '6 min read'
  });

  const [suggestions, setSuggestions] = useState([
    {
      id: '1',
      type: 'keyword',
      suggestion: 'Add "machine learning" to your keywords',
      impact: 'high',
      status: 'pending'
    },
    {
      id: '2',
      type: 'title',
      suggestion: 'Include a number in your title for better CTR',
      impact: 'medium',
      status: 'applied'
    },
    {
      id: '3',
      type: 'meta',
      suggestion: 'Meta description is too long (should be under 160 characters)',
      impact: 'high',
      status: 'pending'
    }
  ]);

  const [competitorAnalysis, setCompetitorAnalysis] = useState([
    {
      url: 'https://example.com/ai-content-creation',
      title: 'AI Content Creation: The Complete Guide',
      score: 85,
      keywords: ['AI content', 'content creation', 'automation']
    },
    {
      url: 'https://example.com/machine-learning-content',
      title: 'Machine Learning in Content Marketing',
      score: 78,
      keywords: ['machine learning', 'content marketing', 'AI']
    }
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">SEO Studio</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Optimize your content for search engines and track performance
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-green-100 text-green-800">
              SEO Score: {seoData.seoScore}/100
            </Badge>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* SEO Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                SEO Overview
              </CardTitle>
              <CardDescription>
                Key metrics and performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{seoData.seoScore}</div>
                  <div className="text-sm text-gray-600">SEO Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{seoData.readabilityScore}</div>
                  <div className="text-sm text-gray-600">Readability</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{seoData.wordCount}</div>
                  <div className="text-sm text-gray-600">Word Count</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{seoData.readingTime}</div>
                  <div className="text-sm text-gray-600">Reading Time</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Optimization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit3 className="h-5 w-5" />
                Content Optimization
              </CardTitle>
              <CardDescription>
                Optimize your content for better search rankings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  value={seoData.title}
                  onChange={(e) => setSeoData({...seoData, title: e.target.value})}
                  placeholder="Enter your page title..."
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {seoData.title.length}/60 characters
                  </span>
                  {seoData.title.length > 60 && (
                    <span className="text-red-500">Too long</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  value={seoData.metaDescription}
                  onChange={(e) => setSeoData({...seoData, metaDescription: e.target.value})}
                  placeholder="Enter your meta description..."
                  className="min-h-[80px]"
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {seoData.metaDescription.length}/160 characters
                  </span>
                  {seoData.metaDescription.length > 160 && (
                    <span className="text-red-500">Too long</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={seoData.slug}
                  onChange={(e) => setSeoData({...seoData, slug: e.target.value})}
                  placeholder="Enter your URL slug..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Target Keywords</Label>
                <Input
                  id="keywords"
                  value={seoData.keywords.join(', ')}
                  onChange={(e) => setSeoData({...seoData, keywords: e.target.value.split(', ').filter(k => k.trim())})}
                  placeholder="Enter keywords separated by commas..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Competitor Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Competitor Analysis
              </CardTitle>
              <CardDescription>
                See how your content compares to competitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitorAnalysis.map((competitor, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{competitor.title}</h4>
                        <p className="text-xs text-gray-500">{competitor.url}</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {competitor.score}/100
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {competitor.keywords.map((keyword, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* SEO Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">SEO Suggestions</CardTitle>
              <CardDescription>
                AI-powered recommendations to improve your content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {suggestions.map((suggestion) => (
                  <div key={suggestion.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <Badge 
                        variant={suggestion.impact === 'high' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {suggestion.impact} impact
                      </Badge>
                      {suggestion.status === 'applied' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {suggestion.suggestion}
                    </p>
                    {suggestion.status === 'pending' && (
                      <Button size="sm" className="mt-2">
                        Apply
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Zap className="h-4 w-4 mr-2" />
                Auto-Optimize
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Eye className="h-4 w-4 mr-2" />
                Preview SERP
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                Track Rankings
              </Button>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Organic Traffic</span>
                <span className="text-sm font-medium">+23%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Click-through Rate</span>
                <span className="text-sm font-medium">4.8%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg. Position</span>
                <span className="text-sm font-medium">8.2</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
