import { useMemo, useState, useEffect, useRef } from 'react';
import { LocateFixed, BookOpen, ExternalLink } from 'lucide-react';

import Map, { Marker, Popup, NavigationControl, type MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { loadConfig, type Spot } from '../../utils/dataLoader';
import { SpotIcon } from '../Shared/SpotIcon';

const MAP_STYLE = {
    version: 8,
    sources: {
        osm: {
            type: 'raster',
            tiles: ['https://tiles.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
    },
    layers: [
        {
            id: 'osm',
            type: 'raster',
            source: 'osm',
            minzoom: 0,
            maxzoom: 19
        }
    ]
};

interface MapViewProps {
    focusSpot?: Spot | null;
    onJumpToJournal?: (spot: Spot) => void;
}

export function MapView({ focusSpot, onJumpToJournal }: MapViewProps) {
    const config = useMemo(() => loadConfig(), []);
    const spots = useMemo(() => config.spots.filter(s => s.coordinates), [config]);
    const [popupInfo, setPopupInfo] = useState<Spot | null>(null);
    const mapRef = useRef<MapRef>(null);

    useEffect(() => {
        if (focusSpot?.coordinates && mapRef.current) {
            mapRef.current.flyTo({
                center: focusSpot.coordinates,
                zoom: 14,
                duration: 2000
            });
            setPopupInfo(focusSpot);
        }
    }, [focusSpot]);

    const initialViewState = {
        longitude: config.map.center[0],
        latitude: config.map.center[1],
        zoom: config.map.zoom
    };

    return (
        <div className="h-full w-full relative">
            <div className="absolute top-12 left-4 z-10">
                <h1 className="text-2xl font-bold tracking-tight text-text-main dark:text-white drop-shadow-sm bg-white/80 dark:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-xl">{config.site.mapTitle}</h1>
            </div>

            <Map
                ref={mapRef}
                initialViewState={initialViewState}
                style={{ width: '100%', height: '100%' }}
                mapStyle={MAP_STYLE as any}
                attributionControl={false} // Custom attribution if needed
            >
                <NavigationControl position="top-right" />

                {spots.map((spot, index) => (
                    <Marker
                        key={`marker-${index}`}
                        longitude={spot.coordinates![0]}
                        latitude={spot.coordinates![1]}
                        anchor="bottom"
                        onClick={e => {
                            e.originalEvent.stopPropagation();
                            setPopupInfo(spot);
                        }}
                    >
                        <div className="flex flex-col items-center cursor-pointer group">
                            <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center border-2 border-primary overflow-hidden transition-transform duration-300 group-hover:scale-110">
                                <SpotIcon icon={spot.icon} size={16} className="text-primary" />
                            </div>
                            <div className="w-1 h-3 bg-primary -mt-1 rounded-b-full opacity-80"></div>
                        </div>
                    </Marker>
                ))}

                {popupInfo?.coordinates && (
                    <Popup
                        anchor="top"
                        longitude={popupInfo.coordinates[0]}
                        latitude={popupInfo.coordinates[1]}
                        onClose={() => setPopupInfo(null)}
                        className="z-50"
                        maxWidth="300px"

                    >
                        <div className="p-0 rounded-lg overflow-hidden font-display">
                            {popupInfo.image && (
                                <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden relative">
                                    <img
                                        key={popupInfo.image}
                                        src={popupInfo.image}
                                        alt={popupInfo.name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        decoding="async"
                                        fetchPriority="low"
                                    />
                                    <div className="absolute top-2 right-2 bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold">
                                        {popupInfo.date}
                                    </div>
                                </div>
                            )}
                            <div className="p-3">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-base text-text-main">{popupInfo.name}</h3>
                                    {!popupInfo.image && <span className="text-[10px] font-bold text-text-muted-warm bg-gray-100 px-2 py-0.5 rounded">{popupInfo.date}</span>}
                                </div>
                                <p className="text-xs text-text-muted-warm line-clamp-2 mt-1">{popupInfo.description}</p>
                                <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-700/50 border-dashed flex justify-between items-center">
                                    <button
                                        onClick={() => onJumpToJournal?.(popupInfo)}
                                        className="text-[10px] flex items-center gap-1 text-primary font-medium hover:text-primary/80 transition-colors"
                                    >
                                        <BookOpen size={12} />
                                        <span>閱讀日記</span>
                                    </button>
                                    {popupInfo.link && (
                                        <a
                                            href={popupInfo.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[10px] flex items-center gap-1 text-gray-600 dark:text-gray-400 font-medium hover:text-primary transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <ExternalLink size={12} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Popup>
                )}
            </Map>
            <button
                className="absolute bottom-28 right-4 z-10 bg-white dark:bg-paper-dark p-3 rounded-full shadow-lg text-text-main dark:text-white hover:text-primary active:scale-95 transition-all flex items-center justify-center outline-none"
                onClick={() => {
                    if (mapRef.current) {
                        mapRef.current.flyTo({
                            center: config.map.center,
                            zoom: config.map.zoom,
                            duration: 1500
                        });
                    }
                }}
                aria-label="Reset View"
            >
                <LocateFixed size={22} strokeWidth={2} />
            </button>
        </div >
    );
}
