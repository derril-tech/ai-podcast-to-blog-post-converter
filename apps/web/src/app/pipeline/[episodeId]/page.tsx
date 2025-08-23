'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
    Play,
    Pause,
    Square,
    RefreshCw,
    CheckCircle,
    AlertCircle,
    Clock,
    FileText,
    Mic,
    PenTool,
    Download,
    Eye
} from 'lucide-react';

interface WorkflowStep {
    id: string;
    name: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    progress: number;
    startTime?: string;
    endTime?: string;
    duration?: number;
    logs: string[];
}

interface WorkflowStatus {
    episodeId: string;
    status: 'initialized' | 'validating' | 'transcribing' | 'generating' | 'finalizing' | 'completed' | 'failed';
    progress: number;
    currentStep: string;
    logs: string[];
    error?: string;
    estimatedTime?: number;
    startTime: string;
}

export default function PipelineRunPage() {
    const params = useParams();
    const episodeId = params.episodeId as string;

    const [workflowStatus, setWorkflowStatus] = useState<WorkflowStatus | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [estimatedTime, setEstimatedTime] = useState<number>(0);

    // Mock workflow steps for demonstration
    const workflowSteps: WorkflowStep[] = [
        {
            id: 'validation',
            name: 'Input Validation',
            status: 'completed',
            progress: 100,
            startTime: new Date(Date.now() - 30000).toISOString(),
            endTime: new Date(Date.now() - 25000).toISOString(),
            duration: 5,
            logs: ['Validating episode metadata...', 'Checking audio file format...', 'Input validation completed']
        },
        {
            id: 'transcription',
            name: 'Audio Transcription',
            status: 'running',
            progress: 65,
            startTime: new Date(Date.now() - 25000).toISOString(),
            logs: ['Starting Whisper transcription...', 'Processing audio segments...', 'Performing speaker diarization...']
        },
        {
            id: 'segmentation',
            name: 'Topic Segmentation',
            status: 'pending',
            progress: 0,
            logs: []
        },
        {
            id: 'generation',
            name: 'Content Generation',
            status: 'pending',
            progress: 0,
            logs: []
        },
        {
            id: 'optimization',
            name: 'SEO Optimization',
            status: 'pending',
            progress: 0,
            logs: []
        },
        {
            id: 'finalization',
            name: 'Draft Finalization',
            status: 'pending',
            progress: 0,
            logs: []
        }
    ];

    useEffect(() => {
        // Initialize workflow status
        setWorkflowStatus({
            episodeId,
            status: 'transcribing',
            progress: 25,
            currentStep: 'transcription',
            logs: [
                'Workflow started',
                'Input validation completed',
                'Starting audio transcription...',
                'Processing audio with Whisper API...',
                'Performing speaker diarization...'
            ],
            startTime: new Date(Date.now() - 30000).toISOString()
        });

        // Simulate WebSocket connection
        const connectWebSocket = () => {
            setIsConnected(true);

            // Simulate real-time updates
            const interval = setInterval(() => {
                setWorkflowStatus(prev => {
                    if (!prev) return prev;

                    const newProgress = Math.min(prev.progress + Math.random() * 5, 100);
                    const newLogs = [...prev.logs];

                    if (newProgress > 50 && prev.status === 'transcribing') {
                        newLogs.push('Transcription completed, starting content generation...');
                        return {
                            ...prev,
                            status: 'generating',
                            progress: newProgress,
                            currentStep: 'generation',
                            logs: newLogs
                        };
                    }

                    if (newProgress > 75 && prev.status === 'generating') {
                        newLogs.push('Content generation completed, optimizing for SEO...');
                        return {
                            ...prev,
                            status: 'finalizing',
                            progress: newProgress,
                            currentStep: 'optimization',
                            logs: newLogs
                        };
                    }

                    if (newProgress >= 100) {
                        newLogs.push('Workflow completed successfully!');
                        clearInterval(interval);
                        return {
                            ...prev,
                            status: 'completed',
                            progress: 100,
                            currentStep: 'finalization',
                            logs: newLogs
                        };
                    }

                    return {
                        ...prev,
                        progress: newProgress,
                        logs: newLogs
                    };
                });
            }, 2000);

            return () => clearInterval(interval);
        };

        const cleanup = connectWebSocket();
        return cleanup;
    }, [episodeId]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'running':
                return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
            case 'failed':
                return <AlertCircle className="h-4 w-4 text-red-500" />;
            default:
                return <Clock className="h-4 w-4 text-gray-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'running':
                return 'bg-blue-100 text-blue-800';
            case 'failed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    if (!workflowStatus) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Pipeline Run
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Episode ID: {episodeId}
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(workflowStatus.status)}>
                            {workflowStatus.status.toUpperCase()}
                        </Badge>
                        <Badge variant={isConnected ? "default" : "secondary"}>
                            {isConnected ? "Connected" : "Disconnected"}
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Progress */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <RefreshCw className="h-5 w-5" />
                                <span>Workflow Progress</span>
                            </CardTitle>
                            <CardDescription>
                                Real-time progress of the podcast to blog conversion pipeline
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {/* Overall Progress */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium">Overall Progress</span>
                                        <span className="text-sm text-gray-600">{Math.round(workflowStatus.progress)}%</span>
                                    </div>
                                    <Progress value={workflowStatus.progress} className="h-3" />
                                </div>

                                {/* Workflow Steps */}
                                <div className="space-y-4">
                                    {workflowSteps.map((step, index) => (
                                        <div key={step.id} className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                {getStatusIcon(step.status)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-sm font-medium">{step.name}</span>
                                                    <span className="text-xs text-gray-500">
                                                        {step.duration ? formatDuration(step.duration) : 'Pending'}
                                                    </span>
                                                </div>
                                                {step.status === 'running' && (
                                                    <Progress value={step.progress} className="h-2" />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-2 pt-4">
                                    <Button variant="outline" size="sm">
                                        <Pause className="h-4 w-4 mr-2" />
                                        Pause
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Square className="h-4 w-4 mr-2" />
                                        Stop
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <RefreshCw className="h-4 w-4 mr-2" />
                                        Retry
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Status Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Current Step:</span>
                                <span className="text-sm font-medium">{workflowStatus.currentStep}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Start Time:</span>
                                <span className="text-sm">{new Date(workflowStatus.startTime).toLocaleTimeString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Estimated Time:</span>
                                <span className="text-sm">{estimatedTime > 0 ? `${Math.round(estimatedTime)}m` : 'Calculating...'}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Live Logs */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Live Logs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-64">
                                <div className="space-y-2">
                                    {workflowStatus.logs.map((log, index) => (
                                        <div key={index} className="text-xs font-mono bg-gray-50 dark:bg-gray-800 p-2 rounded">
                                            <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span> {log}
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
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
                                View Transcript
                            </Button>
                            <Button variant="outline" size="sm" className="w-full justify-start">
                                <FileText className="h-4 w-4 mr-2" />
                                Preview Draft
                            </Button>
                            <Button variant="outline" size="sm" className="w-full justify-start">
                                <Download className="h-4 w-4 mr-2" />
                                Download Logs
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
