import React, { useState, useCallback } from 'react';
import { Pet, User } from '../types';
import { generatePetBio } from '../services/geminiService';
import { WandIcon, PencilIcon } from '../components/icons';

const mockPosts = [
    { id: 'post1', image: 'https://picsum.photos/seed/post1/300/300' },
    { id: 'post3', image: 'https://picsum.photos/seed/post3/300/300' },
    { id: 'post4', image: 'https://picsum.photos/seed/post4/300/300' },
    { id: 'post5', image: 'https://picsum.photos/seed/post5/300/300' },
    { id: 'post6', image: 'https://picsum.photos/seed/post6/300/300' },
];

const PetCard: React.FC<{ pet: Pet, onUpdateBio: (petId: string, newBio: string) => void }> = ({ pet, onUpdateBio }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerateBio = useCallback(async () => {
        setIsLoading(true);
        setError('');
        try {
            const newBio = await generatePetBio(pet.name, pet.breed);
            onUpdateBio(pet.id, newBio);
        } catch (err) {
            setError('Failed to generate bio. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [pet, onUpdateBio]);

    return (
        <div className="bg-white p-4 rounded-2xl shadow-sm">
            <div className="flex items-start gap-4">
                <img src={pet.avatar} alt={pet.name} className="w-20 h-20 rounded-full border-4 border-white shadow-md" />
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800">{pet.name}</h3>
                    <p className="text-md text-slate-500">{pet.breed}</p>
                </div>
                 <button 
                    onClick={handleGenerateBio} 
                    disabled={isLoading}
                    className="p-2 bg-yellow-100 text-yellow-600 rounded-full hover:bg-yellow-200 disabled:opacity-50 disabled:cursor-wait transition-colors">
                    <WandIcon className="w-5 h-5"/>
                </button>
            </div>
            <div className="mt-3">
                {isLoading && <p className="text-sm text-slate-400 italic">Generating bio...</p>}
                {error && <p className="text-sm text-red-500">{error}</p>}
                {pet.bio && !isLoading && <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">{pet.bio}</p>}
                {!pet.bio && !isLoading && <p className="text-sm text-slate-400 italic">No bio yet. Generate one with AI!</p>}
            </div>
        </div>
    );
}

interface ProfileScreenProps {
    user: User;
    onEdit: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user: initialUser, onEdit }) => {
    const [user, setUser] = useState<User>(initialUser);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(1200);
    const mockFollowingCount = 340;

    const handleFollowToggle = useCallback(() => {
        setIsFollowing(current => {
            const newFollowingState = !current;
            setFollowerCount(count => newFollowingState ? count + 1 : count - 1);
            return newFollowingState;
        });
    }, []);
    
    const handleUpdatePetBio = useCallback((petId: string, newBio: string) => {
        setUser(currentUser => ({
            ...currentUser,
            pets: currentUser.pets.map(p => p.id === petId ? { ...p, bio: newBio } : p)
        }));
    }, []);

    return (
        <div className="p-4 space-y-6">
            <div className="flex flex-col items-center">
                <img src={user.avatar} alt={user.name} className="w-28 h-28 rounded-full border-4 border-orange-400 shadow-lg" />
                <div className="flex items-center gap-2 mt-3">
                    <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
                    <button onClick={onEdit} className="p-2 text-slate-500 hover:text-orange-500 hover:bg-slate-100 rounded-full transition-colors">
                        <PencilIcon className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex gap-8 mt-2 text-center">
                    <div>
                        <p className="font-bold text-lg text-slate-700">{user.pets.length}</p>
                        <p className="text-sm text-slate-500">Pets</p>
                    </div>
                     <div>
                        <p className="font-bold text-lg text-slate-700">{followerCount.toLocaleString()}</p>
                        <p className="text-sm text-slate-500">Followers</p>
                    </div>
                     <div>
                        <p className="font-bold text-lg text-slate-700">{mockFollowingCount.toLocaleString()}</p>
                        <p className="text-sm text-slate-500">Following</p>
                    </div>
                </div>
                <div className="mt-4 w-full">
                    <button
                        onClick={handleFollowToggle}
                        className={`w-full font-bold py-2.5 px-4 rounded-xl transition-colors duration-200 ease-in-out ${
                            isFollowing
                                ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                : 'bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-500/20'
                        }`}
                    >
                        {isFollowing ? 'Following' : 'Follow'}
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-700">My Pets</h3>
                {user.pets.map(pet => <PetCard key={pet.id} pet={pet} onUpdateBio={handleUpdatePetBio}/>)}
            </div>

            <div>
                <h3 className="text-lg font-bold text-slate-700 mb-2">My Posts</h3>
                <div className="grid grid-cols-3 gap-1">
                    {mockPosts.map((post) => (
                        <div key={post.id} className="aspect-square bg-gray-200 rounded-md overflow-hidden">
                            <img src={post.image} alt="User post" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;