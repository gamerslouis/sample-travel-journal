import * as LucideIcons from 'lucide-react';

interface SpotIconProps {
    icon: string;
    size?: number;
    className?: string;
}

export function SpotIcon({ icon, size = 16, className = '' }: SpotIconProps) {
    // Convert kebab-case to PascalCase for icon lookup
    const iconName = icon
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');

    // Get the icon component from lucide-react
    const IconComponent = (LucideIcons as any)[iconName];

    // Fallback to MapPin if icon not found
    if (!IconComponent) {
        return <LucideIcons.MapPin size={size} className={className} />;
    }

    return <IconComponent size={size} className={className} />;
}
