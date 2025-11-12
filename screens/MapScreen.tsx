
import React, { useState, useMemo } from 'react';
import { DirectionsIcon, SearchIcon, StorefrontIcon } from '../components/icons';

type LocationType = 'places' | 'services';

interface Location {
    id: string;
    name: string;
    category: string;
    address: string;
    distance: string;
    image: string;
}

const petFriendlyPlaces: Location[] = [
    { id: 'p1', name: 'Paws & Play Park', category: 'Dog Park', distance: '0.5 miles', address: '123 Bark Ave, Petville', image: 'https://picsum.photos/seed/park/400/200' },
    { id: 'p2', name: 'The Purrfect Cup', category: 'Cat Cafe', distance: '1.8 miles', address: '456 Meow St, Petville', image: 'https://picsum.photos/seed/cafe/400/200' },
    { id: 'p3', name: 'Sunny Paws Patio', category: 'Restaurant', distance: '2.1 miles', address: '789 Tailwag Rd, Petville', image: 'https://picsum.photos/seed/patio/400/200' },
];

const petServices: Location[] = [
    { id: 's1', name: 'The Groom Room', category: 'Grooming', distance: '1.2 miles', address: '101 Fluffy Blvd, Petville', image: 'https://picsum.photos/seed/groom/400/200' },
    { id: 's2', name: 'Healthy Paws Vet', category: 'Veterinarian', distance: '2.5 miles', address: '202 Fetch Ln, Petville', image: 'https://picsum.photos/seed/vet/400/200' },
    { id: 's3', name: 'PetSmart', category: 'Pet Store', distance: '3.1 miles', address: '303 Chew Toy Cres, Petville', image: 'https://picsum.photos/seed/store/400/200' },
];


const LocationCard: React.FC<{ location: Location }> = ({ location }) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`;

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-4">
            <img src={location.image} alt={location.name} className="w-full h-32 object-cover"/>
            <div className="p-4">
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
        </div>
    );
};


const MapScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState<LocationType>('places');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredLocations = useMemo(() => {
        const sourceLocations = activeTab === 'places' ? petFriendlyPlaces : petServices;
        if (!searchQuery) {
            return sourceLocations;
        }
        return sourceLocations.filter(location =>
            location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            location.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            location.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [activeTab, searchQuery]);


    return (
        <div className="h-full flex flex-col">
            <div className="p-4 bg-slate-50 z-10 space-y-4 sticky top-0">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search for places or services..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-orange-500 focus:border-orange-500 shadow-sm"
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
                    filteredLocations.map((loc) => (
                       <LocationCard key={loc.id} location={loc} />
                    ))
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