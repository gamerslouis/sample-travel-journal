import type { ReactNode } from 'react';
import { TabBar } from './TabBar';

interface LayoutProps {
    children: ReactNode;
    activeTab: 'map' | 'journal';
    onTabChange: (tab: 'map' | 'journal') => void;
}

export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
    return (
        <div className="flex justify-center h-[100dvh] w-full bg-background-light dark:bg-background-dark text-text-main font-display selection:bg-primary-light">
            <div className="flex flex-col h-full w-full max-w-[768px] overflow-hidden">
                <main className="flex-1 overflow-hidden relative">
                    {children}
                </main>
                <TabBar activeTab={activeTab} onTabChange={onTabChange} />
            </div>
        </div>
    );
}
