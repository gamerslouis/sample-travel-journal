import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

import { SpotIcon } from '../Shared/SpotIcon';
import type { Spot } from '../../utils/dataLoader';

interface JournalCardProps {
    spot: Spot;
    index: number;
    onLocationClick?: (spot: Spot) => void;
    id?: string;
}

export function JournalCard({ spot, index, onLocationClick, id }: JournalCardProps) {


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group mb-8"
            id={id}
        >
            <div className="flex items-center gap-3 mb-3 pl-1">
                <span className="text-xs font-bold text-text-main dark:text-white font-mono tracking-wide">
                    {spot.date.replace(/-/g, '.')}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700"></div>
            </div>

            <article className="relative bg-white dark:bg-paper-dark rounded-2xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-500 border border-gray-50 dark:border-gray-800">
                {spot.image && (
                    <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                        <img
                            src={spot.image}
                            alt={spot.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                            fetchPriority="low"
                        />
                    </div>
                )}
                <div className="p-5">
                    <h2 className="text-lg font-bold text-text-main dark:text-white mb-2 leading-tight">
                        {spot.name}
                    </h2>
                    <p className="text-sm text-text-muted-warm leading-relaxed mb-4">
                        {spot.description}
                    </p>

                    <div className="flex justify-between items-center pt-2 border-t border-gray-50 dark:border-gray-800/50">
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                if (spot.coordinates) {
                                    onLocationClick?.(spot);
                                }
                            }}
                            className={`inline-flex items-center gap-1 text-[10px] font-medium text-primary bg-primary-light/20 px-2 py-1 rounded transition-colors ${spot.coordinates
                                ? 'cursor-pointer hover:bg-primary-light/40'
                                : 'cursor-default opacity-80'
                                }`}
                        >
                            <SpotIcon icon={spot.icon} size={12} />
                            {spot.location}
                        </span>
                        {spot.link && (
                            <a
                                href={spot.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink size={14} />
                            </a>
                        )}
                    </div>
                </div>
            </article>
        </motion.div>
    );
}
