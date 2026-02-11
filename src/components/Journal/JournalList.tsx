import { useEffect } from 'react';
import type { Spot } from '../../utils/dataLoader';
import { JournalCard } from './JournalCard';

interface JournalListProps {
    spots: Spot[];
    onLocationClick?: (spot: Spot) => void;
    focusSpot?: Spot | null;
}

export function JournalList({ spots, onLocationClick, focusSpot }: JournalListProps) {
    useEffect(() => {
        if (focusSpot) {
            const id = `journal-${focusSpot.date}-${focusSpot.name.replace(/\s+/g, '-')}`;
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [focusSpot]);

    if (spots.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-text-muted-warm">
                <p>No entries found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {spots.map((spot, index) => (
                <JournalCard
                    key={`${spot.date}-${spot.name}`}
                    spot={spot}
                    index={index}
                    onLocationClick={onLocationClick}
                    id={`journal-${spot.date}-${spot.name.replace(/\s+/g, '-')}`}
                />
            ))}

            <div className="py-6 flex justify-center opacity-30">
                <div className="w-1 h-1 rounded-full bg-text-muted-warm mx-1"></div>
                <div className="w-1 h-1 rounded-full bg-text-muted-warm mx-1"></div>
                <div className="w-1 h-1 rounded-full bg-text-muted-warm mx-1"></div>
            </div>
        </div>
    );
}
