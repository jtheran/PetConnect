import React, { useState, useCallback } from 'react';
import { Pet, User } from '../types';
import { PencilIcon } from '../components/icons';

const mockPosts = [
    { id: 'post1', image: 'https://picsum.photos/seed/post1/300/300' },
    { id: 'post3', image: 'https://picsum.photos/seed/post3/300/300' },
    { id: 'post4', image: 'https://picsum.photos/seed/post4/300/300' },
    { id: 'post5', image: 'https://picsum.photos/seed/post5/300/300' },
    { id: 'post6', image: 'https://picsum.photos/seed/post6/300/300' },
];

const PetCard: React.FC<{ pet: Pet; onEdit: () => void; onView: () => void; }> = ({ pet, onEdit, onView }) => {
    return (
        <div 
            onClick={onView}
            className="group relative cursor-pointer bg-white p-3 rounded-xl shadow-sm flex flex-col items-center text-center gap-2 transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-[1.03]"
        >
            <img src={pet.avatar} alt={pet.name} className="w-20 h-20 rounded-full object-cover border-4 border-slate-100" />
            <div>
                <h4 className="text-md font-bold text-slate-800">{pet.name}</h4>
                <p className="text-sm text-slate-500">{pet.breed}</p>
            </div>
            <button 
                onClick={(e) => {
                    e.stopPropagation(); // Prevent card's onClick from firing
                    onEdit();
                }} 
                className="absolute top-2 right-2 p-1.5 bg-white/70 text-slate-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:text-orange-500"
                aria-label={`Edit ${pet.name}`}
            >
                <PencilIcon className="w-5 h-5" />
            </button>
        </div>
    );
}

interface ProfileScreenProps {
    user: User;
    onEdit: () => void;
    onEditPet: (pet: Pet) => void;
    onViewPet: (pet: Pet) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onEdit, onEditPet, onViewPet }) => {
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

            <div>
                <h3 className="text-lg font-bold text-slate-700 mb-2">My Pets</h3>
                <div className="grid grid-cols-2 gap-4">
                    {user.pets.map((pet, index) => (
                        <div 
                            key={pet.id} 
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
                        >
                            <PetCard pet={pet} onEdit={() => onEditPet(pet)} onView={() => onViewPet(pet)} />
                        </div>
                    ))}
                </div>
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
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ProfileScreen;