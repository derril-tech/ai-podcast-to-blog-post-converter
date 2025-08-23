import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    User,
    Bell,
    Shield,
    Palette,
    Globe,
    Zap,
    Save,
    Key,
    Mail,
    Building
} from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Manage your account preferences and application settings
                </p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="profile" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Security
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        Appearance
                    </TabsTrigger>
                    <TabsTrigger value="integrations" className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Integrations
                    </TabsTrigger>
                </TabsList>

                {/* Profile Settings */}
                <TabsContent value="profile" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Profile Information
                            </CardTitle>
                            <CardDescription>
                                Update your personal information and account details
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" defaultValue="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" defaultValue="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" defaultValue="john.doe@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company">Company</Label>
                                <Input id="company" defaultValue="EchoPress AI" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Input id="role" defaultValue="Content Manager" />
                            </div>
                            <Button className="flex items-center gap-2">
                                <Save className="h-4 w-4" />
                                Save Changes
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building className="h-5 w-5" />
                                Organization Settings
                            </CardTitle>
                            <CardDescription>
                                Manage your organization's settings and preferences
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="orgName">Organization Name</Label>
                                <Input id="orgName" defaultValue="EchoPress AI" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="timezone">Timezone</Label>
                                <select className="w-full p-2 border rounded-md">
                                    <option>UTC-8 (Pacific Time)</option>
                                    <option>UTC-5 (Eastern Time)</option>
                                    <option>UTC+0 (GMT)</option>
                                    <option>UTC+1 (Central European Time)</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Brand Voice Profiles</Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Enable organization-wide brand voice settings
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notification Settings */}
                <TabsContent value="notifications" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="h-5 w-5" />
                                Notification Preferences
                            </CardTitle>
                            <CardDescription>
                                Choose how and when you want to be notified
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Email Notifications</Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Receive notifications via email
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Processing Complete</Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        When episode processing is finished
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>SEO Alerts</Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        When SEO scores change significantly
                                    </p>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Weekly Reports</Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Receive weekly performance summaries
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Settings */}
                <TabsContent value="security" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Security Settings
                            </CardTitle>
                            <CardDescription>
                                Manage your account security and authentication
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Two-Factor Authentication</Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Add an extra layer of security to your account
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                        Enabled
                                    </Badge>
                                    <Button variant="outline" size="sm">
                                        <Key className="h-4 w-4 mr-2" />
                                        Manage
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Session Management</Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        View and manage active sessions
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    View Sessions
                                </Button>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input id="currentPassword" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input id="newPassword" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input id="confirmPassword" type="password" />
                            </div>
                            <Button className="flex items-center gap-2">
                                <Save className="h-4 w-4" />
                                Update Password
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Appearance Settings */}
                <TabsContent value="appearance" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Palette className="h-5 w-5" />
                                Appearance Settings
                            </CardTitle>
                            <CardDescription>
                                Customize the look and feel of your application
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Dark Mode</Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Switch between light and dark themes
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="space-y-2">
                                <Label>Theme Color</Label>
                                <div className="flex gap-2">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full cursor-pointer border-2 border-blue-600"></div>
                                    <div className="w-8 h-8 bg-green-500 rounded-full cursor-pointer"></div>
                                    <div className="w-8 h-8 bg-purple-500 rounded-full cursor-pointer"></div>
                                    <div className="w-8 h-8 bg-orange-500 rounded-full cursor-pointer"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Font Size</Label>
                                <select className="w-full p-2 border rounded-md">
                                    <option>Small</option>
                                    <option selected>Medium</option>
                                    <option>Large</option>
                                </select>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Integration Settings */}
                <TabsContent value="integrations" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Globe className="h-5 w-5" />
                                CMS Integrations
                            </CardTitle>
                            <CardDescription>
                                Connect your content management systems
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold">W</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium">WordPress</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Connected</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Configure</Button>
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold">G</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Ghost</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Not connected</p>
                                    </div>
                                </div>
                                <Button size="sm">Connect</Button>
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold">M</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Medium</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Not connected</p>
                                    </div>
                                </div>
                                <Button size="sm">Connect</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="h-5 w-5" />
                                Analytics Integrations
                            </CardTitle>
                            <CardDescription>
                                Connect your analytics platforms
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold">GA</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Google Analytics</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Connected</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Configure</Button>
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold">SC</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Search Console</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Not connected</p>
                                    </div>
                                </div>
                                <Button size="sm">Connect</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
