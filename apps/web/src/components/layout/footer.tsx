import Link from 'next/link';
import {
    Github,
    Twitter,
    Linkedin,
    Mail,
    Heart
} from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">E</span>
                            </div>
                            <span className="font-bold text-lg">EchoPress AI</span>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Transform your podcast episodes into SEO-optimized blog posts with AI-powered accuracy and speed.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="https://github.com" className="text-muted-foreground hover:text-foreground">
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="https://linkedin.com" className="text-muted-foreground hover:text-foreground">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                            <Link href="mailto:contact@echopress.ai" className="text-muted-foreground hover:text-foreground">
                                <Mail className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Product */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Product</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/features" className="text-muted-foreground hover:text-foreground">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/integrations" className="text-muted-foreground hover:text-foreground">
                                    Integrations
                                </Link>
                            </li>
                            <li>
                                <Link href="/api" className="text-muted-foreground hover:text-foreground">
                                    API
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/docs" className="text-muted-foreground hover:text-foreground">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="/tutorials" className="text-muted-foreground hover:text-foreground">
                                    Tutorials
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/support" className="text-muted-foreground hover:text-foreground">
                                    Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                                    Terms
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-sm text-muted-foreground">
                        © 2024 EchoPress AI. All rights reserved.
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center">
                        Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for content creators
                    </p>
                </div>
            </div>
        </footer>
    );
}
