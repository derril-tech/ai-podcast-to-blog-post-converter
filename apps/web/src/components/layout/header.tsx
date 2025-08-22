import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Menu,
    Search,
    Bell,
    User,
    Sun,
    Moon,
    Settings
} from 'lucide-react';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                {/* Logo */}
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">E</span>
                        </div>
                        <span className="hidden font-bold sm:inline-block">
                            EchoPress AI
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link
                            href="/dashboard"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/episodes"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Episodes
                        </Link>
                        <Link
                            href="/analytics"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Analytics
                        </Link>
                        <Link
                            href="/settings"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Settings
                        </Link>
                    </nav>

                    {/* Search */}
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                                placeholder="Search episodes..."
                                className="w-full rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:w-[300px]"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                        {/* Theme Toggle */}
                        <Button variant="ghost" size="icon">
                            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>

                        {/* Notifications */}
                        <Button variant="ghost" size="icon">
                            <Bell className="h-4 w-4" />
                            <span className="sr-only">Notifications</span>
                        </Button>

                        {/* User Menu */}
                        <Button variant="ghost" size="icon">
                            <User className="h-4 w-4" />
                            <span className="sr-only">User menu</span>
                        </Button>

                        {/* Mobile Menu */}
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
