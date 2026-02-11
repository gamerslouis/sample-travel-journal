import configYaml from '../data/config.yaml?raw';
import yaml from 'js-yaml';

export interface Spot {
    date: string;
    time: string;
    name: string;
    location: string;
    icon: string;
    description: string;
    image?: string;
    coordinates?: [number, number];
    link?: string;
}

export interface SiteConfig {
    title: string;
    subtitle: string;
    journalTitle: string;
    journalDescription: string;
    mapTitle: string;
    ogImage: string;
    url: string;
    themeColor: string;
}

export interface AuthorConfig {
    name: string;
    github: string;
    blog: string;
    copyrightStartYear: number;
}

export interface MapConfig {
    center: [number, number];
    zoom: number;
}

export interface AppConfig {
    site: SiteConfig;
    author: AuthorConfig;
    map: MapConfig;
    spots: Spot[];
}

let _cachedConfig: AppConfig | null = null;

export const loadConfig = (): AppConfig => {
    if (_cachedConfig) return _cachedConfig;

    try {
        const raw = yaml.load(configYaml) as AppConfig;
        _cachedConfig = {
            ...raw,
            spots: raw.spots.map(d => {
                if (d.coordinates) {
                    return { ...d, coordinates: [d.coordinates[1], d.coordinates[0]] as [number, number] };
                }
                return d;
            })
        };
        return _cachedConfig;
    } catch (e) {
        console.error('Failed to parse config YAML:', e);
        return {
            site: {
                title: '',
                subtitle: '',
                journalTitle: '',
                journalDescription: '',
                mapTitle: '',
                ogImage: '',
                url: '',
                themeColor: '',
            },
            author: { name: '', github: '', blog: '', copyrightStartYear: new Date().getFullYear() },
            map: { center: [139.75, 35.68], zoom: 11 },
            spots: [],
        };
    }
};

export const loadSpots = (): Spot[] => {
    return loadConfig().spots;
};
