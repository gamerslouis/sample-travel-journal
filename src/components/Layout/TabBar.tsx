

interface TabBarProps {
    activeTab: 'map' | 'journal';
    onTabChange: (tab: 'map' | 'journal') => void;
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 z-30 shadow-up pb-safe">
            <div className="flex justify-around items-center px-8 pb-4 pt-4">
                <button
                    onClick={() => onTabChange('journal')}
                    className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'journal' ? 'text-primary' : 'text-text-muted-warm hover:text-primary'
                        }`}
                >
                    <div className={`w-12 h-8 rounded-full flex items-center justify-center transition-all ${activeTab === 'journal' ? 'bg-primary-light/30' : 'bg-transparent'
                        }`}>
                        <span className={`material-symbols-outlined text-[24px] ${activeTab === 'journal' ? 'fill-current' : ''}`}>book_2</span>
                    </div>
                    <span className="text-[10px] font-medium">日記</span>
                </button>

                <button
                    onClick={() => onTabChange('map')}
                    className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'map' ? 'text-primary' : 'text-text-muted-warm hover:text-primary'
                        }`}
                >
                    <div className={`w-12 h-8 rounded-full flex items-center justify-center transition-all ${activeTab === 'map' ? 'bg-primary-light/30' : 'bg-transparent'
                        }`}>
                        <span className={`material-symbols-outlined text-[24px] ${activeTab === 'map' ? 'fill-current' : ''}`}>map</span>
                    </div>
                    <span className="text-[10px] font-medium">足跡</span>
                </button>
            </div>
        </nav>
    );
}
