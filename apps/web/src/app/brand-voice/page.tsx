'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Mic, 
  Settings, 
  Palette, 
  BookOpen, 
  Save,
  Plus,
  Edit3,
  Trash2,
  Copy,
  Download,
  Upload,
  Sparkles,
  Target,
  Users,
  Globe
} from 'lucide-react';

export default function BrandVoicePage() {
  const [brandVoices, setBrandVoices] = useState([
    {
      id: '1',
      name: 'Professional Tech',
      description: 'Formal, technical, and authoritative voice for B2B content',
      tone: 'professional',
      style: 'technical',
      industry: 'Technology',
      isActive: true,
      usageCount: 45,
      lastUsed: '2024-01-15'
    },
    {
      id: '2',
      name: 'Casual Creative',
      description: 'Friendly, conversational tone for creative content',
      tone: 'casual',
      style: 'creative',
      industry: 'Creative',
      isActive: true,
      usageCount: 23,
      lastUsed: '2024-01-14'
    }
  ]);

  const [selectedVoice, setSelectedVoice] = useState(brandVoices[0]);
  const [isEditing, setIsEditing] = useState(false);

  const [voiceSettings, setVoiceSettings] = useState({
    name: selectedVoice.name,
    description: selectedVoice.description,
    tone: selectedVoice.tone,
    style: selectedVoice.style,
    industry: selectedVoice.industry,
    targetAudience: 'Tech professionals and decision makers',
    writingStyle: 'Clear, concise, and data-driven with actionable insights',
    vocabulary: 'Technical terms, industry jargon, professional language',
    examples: [
      'Our AI-powered solution delivers unprecedented efficiency gains.',
      'The integration process is straightforward and well-documented.',
      'Performance metrics indicate significant improvements across all KPIs.'
    ]
  });

  const toneOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'authoritative', label: 'Authoritative' },
    { value: 'conversational', label: 'Conversational' }
  ];

  const styleOptions = [
    { value: 'technical', label: 'Technical' },
    { value: 'creative', label: 'Creative' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'educational', label: 'Educational' },
    { value: 'journalistic', label: 'Journalistic' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Brand Voice Studio</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Create and manage your brand voice profiles for consistent content
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Voice
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Brand Voices List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Brand Voices</CardTitle>
              <CardDescription>
                Manage your voice profiles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {brandVoices.map((voice) => (
                  <div
                    key={voice.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedVoice.id === voice.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedVoice(voice)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{voice.name}</h4>
                      <Switch
                        checked={voice.isActive}
                        onCheckedChange={() => {}}
                        size="sm"
                      />
                    </div>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {voice.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{voice.usageCount} uses</span>
                      <span>{voice.lastUsed}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Voice Editor */}
        <div className="lg:col-span-3 space-y-6">
          {/* Voice Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Mic className="h-5 w-5" />
                    Voice Settings
                  </CardTitle>
                  <CardDescription>
                    Configure your brand voice characteristics
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {isEditing ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Voice Name</Label>
                  <Input
                    id="name"
                    value={voiceSettings.name}
                    onChange={(e) => setVoiceSettings({...voiceSettings, name: e.target.value})}
                    disabled={!isEditing}
                    placeholder="Enter voice name..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={voiceSettings.industry}
                    onChange={(e) => setVoiceSettings({...voiceSettings, industry: e.target.value})}
                    disabled={!isEditing}
                    placeholder="e.g., Technology, Healthcare..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone">Tone</Label>
                  <select
                    id="tone"
                    value={voiceSettings.tone}
                    onChange={(e) => setVoiceSettings({...voiceSettings, tone: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {toneOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="style">Writing Style</Label>
                  <select
                    id="style"
                    value={voiceSettings.style}
                    onChange={(e) => setVoiceSettings({...voiceSettings, style: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {styleOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={voiceSettings.description}
                  onChange={(e) => setVoiceSettings({...voiceSettings, description: e.target.value})}
                  disabled={!isEditing}
                  placeholder="Describe your brand voice..."
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-audience">Target Audience</Label>
                <Input
                  id="target-audience"
                  value={voiceSettings.targetAudience}
                  onChange={(e) => setVoiceSettings({...voiceSettings, targetAudience: e.target.value})}
                  disabled={!isEditing}
                  placeholder="Describe your target audience..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="writing-style">Writing Style Guidelines</Label>
                <Textarea
                  id="writing-style"
                  value={voiceSettings.writingStyle}
                  onChange={(e) => setVoiceSettings({...voiceSettings, writingStyle: e.target.value})}
                  disabled={!isEditing}
                  placeholder="Describe your preferred writing style..."
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vocabulary">Vocabulary & Language</Label>
                <Textarea
                  id="vocabulary"
                  value={voiceSettings.vocabulary}
                  onChange={(e) => setVoiceSettings({...voiceSettings, vocabulary: e.target.value})}
                  disabled={!isEditing}
                  placeholder="Describe preferred vocabulary and language..."
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Voice Examples */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Voice Examples
              </CardTitle>
              <CardDescription>
                Sample content that demonstrates your brand voice
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {voiceSettings.examples.map((example, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        Example {index + 1}
                      </Badge>
                      {isEditing && (
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {example}
                    </p>
                  </div>
                ))}
                {isEditing && (
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Example
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Voice Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Voice Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <Sparkles className="h-6 w-6 mb-2" />
                  <span className="text-sm">Test Voice</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <Copy className="h-6 w-6 mb-2" />
                  <span className="text-sm">Duplicate</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <Download className="h-6 w-6 mb-2" />
                  <span className="text-sm">Export</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <Target className="h-6 w-6 mb-2" />
                  <span className="text-sm">Apply to Content</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
