import React, { useState, useMemo } from 'react';
import { DirectionsIcon, SearchIcon, StorefrontIcon, HeartIcon, CommentIcon } from '../components/icons';
import { Service, Location } from '../types';

type LocationType = 'places' | 'services';
type ItemType = 'post' | 'report' | 'service' | 'location';

// A combined type for all items displayed on the map
type MapItem = Location & {
    sourceService?: Service;
};

const LocationCard: React.FC<{ 
    location: MapItem;
    isLiked: boolean;
    onLike: () => void;
    onOpenComments: () => void;
}> = ({ location, isLiked, onLike, onOpenComments }) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`;

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-4 flex flex-col">
            <img src={location.image} alt={location.name} className="w-full h-32 object-cover"/>
            <div className="p-4 flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-bold text-lg text-slate-800">{location.name}</h4>
                        <p className="text-sm text-slate-500">{location.category}</p>
                    </div>
                    <span className="text-sm font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">{location.distance}</span>
                </div>
                <div className="mt-4 flex gap-2">
                    <a 
                        href={googleMapsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-semibold py-2 px-3 rounded-lg hover:bg-slate-200 transition-colors text-sm"
                    >
                        <DirectionsIcon className="w-5 h-5"/>
                        <span>Directions</span>
                    </a>
                    <button className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-semibold py-2 px-3 rounded-lg hover:bg-slate-200 transition-colors text-sm">
                        <StorefrontIcon className="w-5 h-5"/>
                        <span>Profile</span>
                    </button>
                </div>
            </div>
             <div className="border-t border-slate-100 px-4 py-2 flex justify-start gap-6 bg-slate-50">
                 <button onClick={onLike} className={`flex items-center gap-2 transition-colors ${isLiked ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}`}>
                    <HeartIcon isLiked={isLiked} className="w-5 h-5"/>
                    <span className="font-semibold text-sm">{location.likes}</span>
                </button>
                <button onClick={onOpenComments} className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors">
                    <CommentIcon className="w-5 h-5"/>
                    <span className="font-semibold text-sm">{location.comments.length}</span>
                </button>
            </div>
        </div>
    );
};

interface MapScreenProps {
    services: Service[];
    locations: Location[];
    likedItems: { services: Set<string>; locations: Set<string> };
    onLike: (itemId: string, itemType: ItemType) => void;
    onOpenComments: (item: Service | Location, itemType: ItemType) => void;
}

const MapScreen: React.FC<MapScreenProps> = ({ services, locations, likedItems, onLike, onOpenComments }) => {
    const [activeTab, setActiveTab] = useState<LocationType>('places');
    const [searchQuery, setSearchQuery] = useState('');

    const userServicesAsLocations = useMemo((): MapItem[] => services.map(service => ({
        id: service.id,
        name: service.name,
        category: `${service.type} by ${service.user.name}`,
        address: service.address,
        distance: 'N/A', // Distance is not available for user services
        image: service.image,
        likes: service.likes,
        comments: service.comments,
        isBusinessService: false,
        sourceService: service,
    })), [services]);

    const filteredLocations = useMemo(() => {
        const sourceLocations: MapItem[] = activeTab === 'places' 
            ? locations.filter(l => !l.isBusinessService)
            : [...locations.filter(l => l.isBusinessService), ...userServicesAsLocations];

        if (!searchQuery) {
            return sourceLocations;
        }
        return sourceLocations.filter(location =>
            location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            location.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            location.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [activeTab, searchQuery, locations, userServicesAsLocations]);

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 bg-slate-50 z-10 space-y-4 sticky top-0">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search for places or services..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-orange-500 focus:border-orange-500 shadow-sm text-slate-800"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
                 <div className="flex bg-slate-200 rounded-lg p-1">
                    <button onClick={() => setActiveTab('places')} className={`w-1/2 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'places' ? 'bg-white shadow text-orange-600' : 'text-slate-600'}`}>
                        Friendly Places
                    </button>
                    <button onClick={() => setActiveTab('services')} className={`w-1/2 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'services' ? 'bg-white shadow text-orange-600' : 'text-slate-600'}`}>
                        Services & Products
                    </button>
                </div>
            </div>
            
            <div className="flex-grow px-4 pt-4">
                {filteredLocations.length > 0 ? (
                    filteredLocations.map((loc) => {
                       const isUserService = !!loc.sourceService;
                       const itemType = isUserService ? 'service' : 'location';
                       const isLiked = isUserService 
                            ? likedItems.services.has(loc.id) 
                            : likedItems.locations.has(loc.id);

                       return (
                           <LocationCard 
                                key={loc.id} 
                                location={loc}
                                isLiked={isLiked}
                                onLike={() => onLike(loc.id, itemType)}
                                onOpenComments={() => onOpenComments(isUserService ? loc.sourceService! : loc, itemType)}
                           />
                       );
                    })
                ) : (
                    <div className="text-center py-8 text-slate-500">
                        <p>No locations found matching "{searchQuery}".</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MapScreen;