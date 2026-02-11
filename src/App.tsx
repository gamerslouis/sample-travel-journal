import { useState } from 'react';
import type { Spot } from './utils/dataLoader';
import { Layout } from './components/Layout/Layout';
import { JournalView } from './components/Journal/JournalView';
import { MapView } from './components/Map/MapView';

function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'journal'>('journal');
  const [mapFocusSpot, setMapFocusSpot] = useState<Spot | null>(null);
  const [journalFocusSpot, setJournalFocusSpot] = useState<Spot | null>(null);

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className={`h-full w-full ${activeTab === 'journal' ? 'block' : 'hidden'}`}>
        <JournalView
          focusSpot={journalFocusSpot}
          onLocationClick={(spot) => {
            setActiveTab('map');
            setMapFocusSpot({ ...spot });
          }}
        />
      </div>
      <div className={`h-full w-full ${activeTab === 'map' ? 'block' : 'hidden'}`}>
        <MapView
          focusSpot={mapFocusSpot}
          onJumpToJournal={(spot) => {
            setActiveTab('journal');
            setJournalFocusSpot({ ...spot });
          }}
        />
      </div>
    </Layout>
  );
}

export default App
