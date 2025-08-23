'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Save, 
  Eye, 
  Download, 
  Share2, 
  Settings, 
  FileText, 
  Search, 
  Edit3,
  Quote,
  Image,
  Link,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

export default function EditorPage() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [citations, setCitations] = useState([
    {
      id: '1',
      text: 'The future of AI in content creation is not about replacing humans, but augmenting their capabilities.',
      speaker: 'John Doe',
      timestamp: '2:34',
      confidence: 0.95
    },
    {
      id: '2',
      text: 'We need to focus on building systems that work with humans, not against them.',
      speaker: 'Jane Smith',
      timestamp: '5:12',
      confidence: 0.92
    }
  ]);

  const [seoData, setSeoData] = useState({
    metaDescription: '',
    keywords: [],
    readabilityScore: 8.5,
    seoScore: 92
  });

  useEffect(() => {
    // Load draft content
    setTitle('The Future of AI in Content Creation');
    setContent(`# The Future of AI in Content Creation

In this episode, we explore how artificial intelligence is transforming the way we create and consume content. Our guests share insights on the current state of AI tools and what the future holds for content creators.

## Key Insights

The future of AI in content creation is not about replacing humans, but augmenting their capabilities. We need to focus on building systems that work with humans, not against them.

## Main Discussion

Our conversation covered several important topics:

1. **Current AI Capabilities**: What AI can and cannot do well
2. **Human-AI Collaboration**: How to effectively work with AI tools
3. **Ethical Considerations**: Ensuring responsible AI use in content creation

## Conclusion

As we move forward, the key is to embrace AI as a tool that enhances human creativity rather than replacing it entirely.`);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Implement save logic
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const handlePublish = async () => {
    // TODO: Implement publish logic
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Post Editor</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Edit and refine your AI-generated blog post
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Last saved 2 min ago
            </Badge>
            <Button variant="outline" onClick={handleSave} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Draft'}
            </Button>
            <Button onClick={handlePublish}>
              <Share2 className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Content Editor</CardTitle>
              <CardDescription>
                Edit your blog post content with real-time preview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your blog post title..."
                  className="text-xl font-semibold"
                />
              </div>

              {/* Content Editor */}
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your blog post content..."
                  className="min-h-[500px] font-mono text-sm"
                />
              </div>

              {/* Editor Toolbar */}
              <div className="flex items-center space-x-2 pt-4 border-t">
                <Button variant="outline" size="sm">
                  <Edit3 className="h-4 w-4 mr-1" />
                  Format
                </Button>
                <Button variant="outline" size="sm">
                  <Quote className="h-4 w-4 mr-1" />
                  Quote
                </Button>
                <Button variant="outline" size="sm">
                  <Image className="h-4 w-4 mr-1" />
                  Image
                </Button>
                <Button variant="outline" size="sm">
                  <Link className="h-4 w-4 mr-1" />
                  Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Citations Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Citations</CardTitle>
              <CardDescription>
                Source references from the transcript
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {citations.map((citation) => (
                  <div key={citation.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {citation.speaker}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {citation.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      "{citation.text}"
                    </p>
                    <div className="flex items-center mt-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-xs text-gray-500">
                        {Math.round(citation.confidence * 100)}% confidence
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SEO Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">SEO Analysis</CardTitle>
              <CardDescription>
                Optimize your content for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">SEO Score</span>
                <Badge className="bg-green-100 text-green-800">
                  {seoData.seoScore}/100
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Readability</span>
                <Badge className="bg-blue-100 text-blue-800">
                  {seoData.readabilityScore}/10
                </Badge>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  value={seoData.metaDescription}
                  onChange={(e) => setSeoData({...seoData, metaDescription: e.target.value})}
                  placeholder="Enter meta description..."
                  className="min-h-[80px]"
                />
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Optimize SEO
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
