import React, { useState, useCallback } from 'react';
import { Pet, User, Service, Post } from '../types';
import { PencilIcon, StorefrontIcon, TrashIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, HeartIcon, CommentIcon } from '../components/icons';

const PetCard: React.FC<{ pet: Pet; onEdit: () => void; onView: () => void; onDelete: () => void; }> = ({ pet, onEdit, onView, onDelete }) => {
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
            <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                    onClick={(e) => { e.stopPropagation(); onEdit(); }} 
                    className="p-1.5 bg-white/70 text-slate-400 rounded-full hover:text-orange-500 transition-colors"
                    aria-label={`Edit ${pet.name}`}
                >
                    <PencilIcon className="w-5 h-5" />
                </button>
                 <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(); }} 
                    className="p-1.5 bg-white/70 text-slate-400 rounded-full hover:text-red-500 transition-colors"
                    aria-label={`Delete ${pet.name}`}
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

const ServiceCard: React.FC<{ 
    service: Service; 
    onDelete: () => void; 
    onEdit: () => void;
    isLiked: boolean;
    onLike: () => void;
    onOpenComments: () => void;
}> = ({ service, onDelete, onEdit, isLiked, onLike, onOpenComments }) => {
    return (
        <div className="group relative bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
            <img src={service.image} alt={service.name} className="w-full h-32 object-cover" />
            <div className="p-3 flex-grow flex flex-col">
                <h4 className="font-bold text-slate-800">{service.name}</h4>
                <p className="text-xs text-slate-500 mt-1 flex-grow line-clamp-2">{service.description}</p>
                <div className="mt-2 flex justify-between items-center">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${service.type === 'Service' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{service.type}</span>
                    <span className="font-bold text-orange-600">{service.price}</span>
                </div>
            </div>
             <div className="border-t border-slate-100 px-3 py-2 flex justify-start gap-4 bg-slate-50">
                <button onClick={onLike} className={`flex items-center gap-1.5 transition-colors ${isLiked ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}`}>
                    <HeartIcon isLiked={isLiked} className="w-5 h-5"/>
                    <span className="font-semibold text-xs">{service.likes}</span>
                </button>
                <button onClick={onOpenComments} className="flex items-center gap-1.5 text-slate-500 hover:text-blue-500 transition-colors">
                    <CommentIcon className="w-5 h-5"/>
                    <span className="font-semibold text-xs">{service.comments.length}</span>
                </button>
            </div>
            <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                <button 
                    onClick={(e) => { e.stopPropagation(); onEdit(); }}
                    className="p-1.5 bg-black/40 text-white rounded-full hover:bg-orange-500 transition-colors"
                    aria-label={`Edit ${service.name}`}
                >
                    <PencilIcon className="w-5 h-5" />
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    className="p-1.5 bg-black/40 text-white rounded-full hover:bg-red-500 transition-colors"
                    aria-label={`Delete ${service.name}`}
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

const PostGridItem: React.FC<{ post: Post; onDelete: () => void; }> = ({ post, onDelete }) => {
    return (
        <div className="group relative aspect-square bg-gray-200 rounded-md overflow-hidden">
            <img src={post.image} alt="User post" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={onDelete} 
                  className="p-2 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors"
                  aria-label="Delete post"
                >
                    <TrashIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    )
}


interface ProfileScreenProps {
    user: User;
    posts: Post[];
    services: Service[];
    likedItems: { services: Set<string> };
    onEdit: () => void;
    onEditPet: (pet: Pet) => void;
    onViewPet: (pet: Pet) => void;
    onDeletePet: (petId: string) => void;
    onDeleteService: (serviceId: string) => void;
    onDeletePost: (postId: string) => void;
    onEditService: (service: Service) => void;
    onLike: (itemId: string, itemType: 'service') => void;
    onOpenComments: (item: Service, itemType: 'service') => void;
    onLogout: () => void;
    onDeleteAccount: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, posts, services, likedItems, onEdit, onEditPet, onViewPet, onDeletePet, onDeleteService, onDeletePost, onEditService, onLike, onOpenComments, onLogout, onDeleteAccount }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(1200);
    const mockFollowingCount = 340;
    const [activeTab, setActiveTab] = useState<'posts' | 'services'>('posts');

    const handleFollowToggle = useCallback(() => {
        setIsFollowing(current => {
            const newFollowingState = !current;
            setFollowerCount(count => newFollowingState ? count + 1 : count - 1);
            return newFollowingState;
        });
    }, []);

    const userPosts = posts.filter(post => post.user.id === user.id);

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col items-center md:flex-row md:items-start md:gap-10">
                <img src={user.avatar} alt={user.name} className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-orange-400 shadow-lg flex-shrink-0" />
                <div className="flex flex-col items-center md:items-start flex-grow w-full">
                    <div className="flex items-center gap-2 mt-3">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">{user.name}</h2>
                        <button onClick={onEdit} className="p-2 text-slate-500 hover:text-orange-500 hover:bg-slate-100 rounded-full transition-colors">
                            <PencilIcon className="w-5 h-5" />
                        </button>
                    </div>
                    {user.bio && <p className="text-slate-600 mt-2 text-center md:text-left max-w-prose">{user.bio}</p>}
                     <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 justify-center md:justify-start">
                        {user.location && <div className="flex items-center gap-1.5 text-sm text-slate-500"><MapPinIcon className="w-4 h-4" /><span>{user.location}</span></div>}
                        {user.email && <div className="flex items-center gap-1.5 text-sm text-slate-500"><EnvelopeIcon className="w-4 h-4" /><span>{user.email}</span></div>}
                        {user.phone && <div className="flex items-center gap-1.5 text-sm text-slate-500"><PhoneIcon className="w-4 h-4" /><span>{user.phone}</span></div>}
                    </div>
                    <div className="flex gap-8 mt-4 text-center">
                        <div>
                            <p className="font-bold text-lg md:text-xl text-slate-700">{user.pets.length}</p>
                            <p className="text-sm text-slate-500">Pets</p>
                        </div>
                         <div>
                            <p className="font-bold text-lg md:text-xl text-slate-700">{followerCount.toLocaleString()}</p>
                            <p className="text-sm text-slate-500">Followers</p>
                        </div>
                         <div>
                            <p className="font-bold text-lg md:text-xl text-slate-700">{mockFollowingCount.toLocaleString()}</p>
                            <p className="text-sm text-slate-500">Following</p>
                        </div>
                    </div>
                    <div className="mt-4 w-full max-w-xs md:max-w-none">
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
            </div>

            <div>
                <h3 className="text-lg font-bold text-slate-700 mb-2">My Pets</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {user.pets.map((pet, index) => (
                        <div 
                            key={pet.id} 
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
                        >
                            <PetCard pet={pet} onEdit={() => onEditPet(pet)} onView={() => onViewPet(pet)} onDelete={() => onDeletePet(pet.id)} />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div className="flex bg-slate-100 rounded-lg p-1 mb-4">
                    <button onClick={() => setActiveTab('posts')} className={`w-1/2 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'posts' ? 'bg-white shadow text-orange-600' : 'text-slate-600'}`}>
                        My Posts
                    </button>
                    <button onClick={() => setActiveTab('services')} className={`w-1/2 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'services' ? 'bg-white shadow text-orange-600' : 'text-slate-600'}`}>
                        Services & Products
                    </button>
                </div>
                
                {activeTab === 'posts' && (
                    <div className="grid grid-cols-3 lg:grid-cols-4 gap-1">
                        {userPosts.map((post) => (
                           <PostGridItem key={post.id} post={post} onDelete={() => onDeletePost(post.id)} />
                        ))}
                    </div>
                )}

                {activeTab === 'services' && (
                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {services.length > 0 ? (
                            services.map(service => 
                                <ServiceCard 
                                    key={service.id} 
                                    service={service} 
                                    onDelete={() => onDeleteService(service.id)} 
                                    onEdit={() => onEditService(service)} 
                                    isLiked={likedItems.services.has(service.id)}
                                    onLike={() => onLike(service.id, 'service')}
                                    onOpenComments={() => onOpenComments(service, 'service')}
                                />
                            )
                        ) : (
                            <div className="col-span-full text-center py-8 text-slate-500">
                                <StorefrontIcon className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                                <p>No services or products listed yet.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            <div className="border-t border-slate-200 pt-6 space-y-3 max-w-sm mx-auto">
                 <button 
                    onClick={onLogout}
                    className="w-full font-bold py-2.5 px-4 rounded-xl transition-colors duration-200 ease-in-out bg-slate-200 text-slate-700 hover:bg-slate-300"
                >
                    Log Out
                </button>
                 <button 
                    onClick={onDeleteAccount}
                    className="w-full font-bold py-2.5 px-4 rounded-xl transition-colors duration-200 ease-in-out text-red-600 hover:bg-red-50"
                >
                    Delete Account
                </button>
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