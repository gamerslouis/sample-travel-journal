import { useMemo, useState, useEffect, useRef } from 'react';
import { loadConfig } from '../../utils/dataLoader';
import { JournalList } from './JournalList';
import { Github, Globe, ArrowUp } from 'lucide-react';

import type { Spot } from '../../utils/dataLoader';

interface JournalViewProps {
    onLocationClick?: (spot: Spot) => void;
    focusSpot?: Spot | null;
}

export function JournalView({ onLocationClick, focusSpot }: JournalViewProps) {
    const config = useMemo(() => loadConfig(), []);
    const allSpots = config.spots;
    const { site, author } = config;
    const currentYear = new Date().getFullYear();
    const [showScrollTop, setShowScrollTop] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            setShowScrollTop(container.scrollTop > 300);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        scrollContainerRef.current?.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const descriptionLines = site.journalDescription.split('\n');

    return (
        <div ref={scrollContainerRef} className="h-full flex flex-col bg-background-light dark:bg-background-dark overflow-y-auto no-scrollbar">
            <header className="px-6 pt-12 pb-2 bg-background-light dark:bg-background-dark transition-colors duration-300">
                <div className="flex items-end justify-between mb-4">
                    <div>
                        <p className="text-[11px] font-medium tracking-[0.15em] text-primary uppercase mb-1">{site.subtitle}</p>
                        <h1 className="text-2xl font-bold tracking-tight text-text-main dark:text-white">{site.journalTitle}</h1>
                    </div>
                    <div className="flex items-center gap-3 pb-1">
                        <a
                            href={author.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-muted-warm hover:text-primary transition-colors"
                            aria-label="GitHub"
                        >
                            <Github size={18} />
                        </a>
                        <a
                            href={author.blog}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-muted-warm hover:text-primary transition-colors"
                            aria-label="Blog"
                        >
                            <Globe size={18} />
                        </a>
                    </div>
                </div>
            </header>

            <main className="px-6 pb-4 pt-4">
                <p className="text-sm text-text-muted-warm font-light leading-relaxed mb-8 animate-fade-in">
                    {descriptionLines.map((line, i) => (
                        <span key={i}>
                            {line}
                            {i < descriptionLines.length - 1 && <br />}
                        </span>
                    ))}
                </p>
                <JournalList spots={allSpots} onLocationClick={onLocationClick} focusSpot={focusSpot} />
            </main>

            <footer className="px-6 pb-24 pt-8 mt-8 border-t border-gray-200 dark:border-gray-800">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-6">
                        <a
                            href={author.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-text-muted-warm hover:text-primary transition-colors"
                        >
                            <Github size={16} />
                            <span>GitHub</span>
                        </a>
                        <a
                            href={author.blog}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-text-muted-warm hover:text-primary transition-colors"
                        >
                            <Globe size={16} />
                            <span>Blog</span>
                        </a>
                    </div>
                    <p className="text-xs text-text-muted-warm">
                        Copyright © {author.copyrightStartYear}{currentYear > author.copyrightStartYear ? `-${currentYear}` : ''} {author.name}
                    </p>
                </div>
            </footer>

            {/* Scroll to top button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-30 right-6 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                aria-label="Scroll to top"
            >
                <ArrowUp size={20} />
            </button>
        </div>
    );
}
