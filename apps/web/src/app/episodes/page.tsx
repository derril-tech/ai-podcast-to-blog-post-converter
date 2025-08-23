'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Upload, Search, Filter } from 'lucide-react';

export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState([
    {
      id: '1',
      title: 'The Future of AI in Content Creation',
      status: 'completed',
      duration: '45:30',
      uploadedAt: '2024-01-15',
      owner: 'John Doe',
      tags: ['AI', 'Content', 'Technology']
    },
    {
      id: '2',
      title: 'Building Scalable Systems',
      status: 'processing',
      duration: '32:15',
      uploadedAt: '2024-01-14',
      owner: 'Jane Smith',
      tags: ['Engineering', 'Architecture']
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Episodes Library</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage and process your podcast episodes
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Episode
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search episodes..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload Episode
          </Button>
        </div>
      </div>

      {/* Episodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {episodes.map((episode) => (
          <Card key={episode.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold line-clamp-2">
                    {episode.title}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {episode.duration} • {episode.uploadedAt}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(episode.status)}>
                  {episode.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium">Owner:</span>
                  <span className="ml-2">{episode.owner}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {episode.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View
                  </Button>
                  <Button size="sm" className="flex-1">
                    Process
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {episodes.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Upload className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No episodes yet</h3>
          <p className="text-gray-600 mb-6">
            Upload your first podcast episode to get started
          </p>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload Episode
          </Button>
        </div>
      )}
    </div>
  );
}
