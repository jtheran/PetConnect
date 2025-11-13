import React, { useState, useCallback, useMemo } from 'react';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import MessagesScreen from './screens/MessagesScreen';
import ProfileScreen from './screens/ProfileScreen';
import BottomNav from './components/BottomNav';
import { PawPrintIcon, BellIcon } from './components/icons';
import { View, Notification, NotificationType, Post, User, Pet, Story, Conversation, Service, ServiceType, Report, Comment, Location, Message } from './types';
import NotificationsPanel from './components/NotificationsPanel';
import PostOptionsModal from './components/PostOptionsModal';
import NewPostScreen from './screens/NewPostScreen';
import NewReportScreen from './screens/NewReportScreen';
import StoryViewer from './components/StoryViewer';
import EditProfileScreen from './screens/EditProfileScreen';
import EditPetScreen from './screens/EditPetScreen';
import PetDetailScreen from './screens/PetDetailScreen';
import NewGroupScreen from './screens/NewGroupScreen';
import NewPetScreen from './screens/NewPetScreen';
import NewServiceScreen from './screens/NewServiceScreen';
import ConfirmationModal from './components/ConfirmationModal';
import EditServiceScreen from './screens/EditServiceScreen';
import CommentModal from './components/CommentModal';
import ChatScreen from './screens/ChatScreen';

const mockNotificationsData: Notification[] = [
  { id: 'n1', type: NotificationType.NewMessage, text: 'Maria sent you a message about Lucy.', timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), isRead: false, relatedUser: { name: 'Maria', avatar: 'https://picsum.photos/seed/user2/100/100' } },
  { id: 'n2', type: NotificationType.LostPetUpdate, text: 'A pet matching Charlie\'s description was found near Maple St.', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), isRead: false },
  { id: 'n3', type: NotificationType.PostLike, text: 'John Doe liked your post of Buddy.', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), isRead: true, relatedUser: { name: 'John Doe', avatar: 'https://picsum.photos/seed/user3/100/100' } },
];

const initialUser: User = {
    id: 'u1',
    name: 'Alex Johnson',
    avatar: 'https://picsum.photos/seed/user1/200/200',
    pets: [
        { id: 'p1', name: 'Buddy', breed: 'Golden Retriever', avatar: 'https://picsum.photos/seed/buddy/100/100', bio: 'Professional good boy and stick enthusiast. My hobbies include napping, chasing squirrels, and getting belly rubs.' },
        { id: 'p3', name: 'Max', breed: 'German Shepherd', avatar: 'https://picsum.photos/seed/max/100/100' },
    ],
    bio: 'Just a pet lover with my two best friends, Buddy and Max. Always looking for new trails to explore and new friends to make!',
    location: 'Petville, USA',
    email: 'alex.j@example.com',
    phone: '555-123-4567',
};

const allUsers: User[] = [
    initialUser,
    { id: 'u2', name: 'Maria', avatar: 'https://picsum.photos/seed/user2/100/100', pets: [{ id: 'p2', name: 'Lucy', breed: 'Siamese Cat', avatar: 'https://picsum.photos/seed/lucy/100/100' }] },
    { id: 'u3', name: 'John Doe', avatar: 'https://picsum.photos/seed/user3/100/100', pets: [] },
    { id: 'u4', name: 'Adventure Paws', avatar: 'https://picsum.photos/seed/user4/100/100', pets: [] },
    { id: 'u5', name: 'Kitty Corner', avatar: 'https://picsum.photos/seed/user5/100/100', pets: [] },
];

const initialMockPosts: Post[] = [
    { id: 'post1', user: allUsers[0], pet: allUsers[0].pets[0], image: 'https://picsum.photos/seed/post1/600/600', caption: 'Enjoying the sun in the park! ☀️', likes: 125, comments: [] },
    { id: 'post2', user: allUsers[1], pet: allUsers[1].pets[0], image: 'https://picsum.photos/seed/post2/600/600', caption: 'Nap time is the best time. 😴', likes: 230, comments: [] },
    { id: 'post3', user: allUsers[0], pet: allUsers[0].pets[1], image: 'https://picsum.photos/seed/post3/600/600', caption: 'Ready for an adventure!', likes: 98, comments: [] },
];

const mockStoriesData: Story[] = [
    { id: 's1', user: allUsers[0], image: 'https://picsum.photos/seed/story1/540/960', timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString() },
    { id: 's2', user: allUsers[1], image: 'https://picsum.photos/seed/story2/540/960', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
    { id: 's3', user: allUsers[2], image: 'https://picsum.photos/seed/story3/540/960', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
    { id: 's4', user: allUsers[3], image: 'https://picsum.photos/seed/story4/540/960', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
    { id: 's5', user: allUsers[4], image: 'https://picsum.photos/seed/story5/540/960', timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString() },
];

const initialConversations: Conversation[] = [
    { id: 'c1', name: 'Maria & Lucy', avatar: 'https://picsum.photos/seed/user2/100/100', lastMessage: 'Haha, sounds like Lucy!', time: '10m', unread: 2, isGroup: false, members: [allUsers[0], allUsers[1]], messages: [
        { id: 'm1', user: allUsers[1], text: 'Hey, how is Buddy doing?', timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString() },
        { id: 'm2', user: allUsers[0], text: 'He\'s great! We just came back from the park.', timestamp: new Date(Date.now() - 11 * 60 * 1000).toISOString() },
        { id: 'm3', user: allUsers[1], text: 'Haha, sounds like Lucy!', timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString() },
    ]},
    { id: 'c2', name: 'Dog Lovers Group', avatar: 'https://picsum.photos/seed/group1/100/100', lastMessage: 'Who is going to the park this weekend?', time: '1h', unread: 0, isGroup: true, members: [allUsers[0], allUsers[2]], messages: [
        { id: 'm4', user: allUsers[2], text: 'Who is going to the park this weekend?', timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString() },
    ]},
    { id: 'c3', name: 'John Doe', avatar: 'https://picsum.photos/seed/user3/100/100', lastMessage: 'Thanks for the tip!', time: '3h', unread: 0, isGroup: false, members: [allUsers[0], allUsers[2]], messages: [] },
];

const initialServices: Service[] = [
    {
        id: 'serv1',
        user: initialUser,
        name: 'Dog Walking Adventures',
        description: 'Daily walks for your furry friend in local parks. Group and individual walks available. Insured and certified.',
        price: '$25 / hour',
        type: ServiceType.Service,
        image: 'https://picsum.photos/seed/walking/600/400',
        address: '100 Good Boy Lane, Petville',
        likes: 45,
        comments: [],
    },
    {
        id: 'serv2',
        user: initialUser,
        name: 'Handmade Pet Bandanas',
        description: 'Custom, high-quality bandanas in various patterns and sizes. Perfect for any occasion!',
        price: '$15',
        type: ServiceType.Product,
        image: 'https://picsum.photos/seed/bandana/600/400',
        address: 'Online Store, ships from Petville',
        likes: 82,
        comments: [],
    }
];

const initialMockReports: Report[] = [
    { id: 'lf1', user: allUsers[1], petName: 'Charlie', status: 'Lost', location: 'Downtown Park', date: 'Oct 28, 2023', image: 'https://picsum.photos/seed/charlie/200/200', breed: 'Beagle', likes: 15, comments: [] },
    { id: 'lf2', user: allUsers[2], petName: 'Unknown', status: 'Found', location: 'Near Maple St.', date: 'Oct 27, 2023', image: 'https://picsum.photos/seed/found1/200/200', breed: 'Labrador Mix', likes: 22, comments: [] },
    { id: 'ad1', user: initialUser, petName: 'Whiskers', status: 'Adoption', location: 'City Shelter', date: 'Ready Now', image: 'https://picsum.photos/seed/whiskers/200/200', breed: 'Tabby Cat', description: 'A friendly and playful cat looking for a forever home. Loves sunny spots and chasing strings.', likes: 50, comments: [] },
    { id: 'lf3', user: allUsers[3], petName: 'Bella', status: 'Lost', location: 'Oakwood Forest', date: 'Oct 25, 2023', image: 'https://picsum.photos/seed/bella/200/200', breed: 'Husky', likes: 8, comments: [] },
    { id: 'ad2', user: initialUser, petName: 'Rocky', status: 'Adoption', location: 'Private Foster', date: 'Ready Now', image: 'https://picsum.photos/seed/rocky/200/200', breed: 'Boxer Mix', description: 'Energetic and loving dog, great with kids and other pets. Fully house-trained.', likes: 34, comments: [] },
];

const initialLocations: Location[] = [
    { id: 'p1', name: 'Paws & Play Park', category: 'Dog Park', distance: '0.5 miles', address: '123 Bark Ave, Petville', image: 'https://picsum.photos/seed/park/400/200', likes: 152, comments: [], isBusinessService: false },
    { id: 'p2', name: 'The Purrfect Cup', category: 'Cat Cafe', distance: '1.8 miles', address: '456 Meow St, Petville', image: 'https://picsum.photos/seed/cafe/400/200', likes: 310, comments: [], isBusinessService: false },
    { id: 'p3', name: 'Sunny Paws Patio', category: 'Restaurant', distance: '2.1 miles', address: '789 Tailwag Rd, Petville', image: 'https://picsum.photos/seed/patio/400/200', likes: 245, comments: [], isBusinessService: false },
    { id: 's1', name: 'The Groom Room', category: 'Grooming', distance: '1.2 miles', address: '101 Fluffy Blvd, Petville', image: 'https://picsum.photos/seed/groom/400/200', likes: 98, comments: [], isBusinessService: true },
    { id: 's2', name: 'Healthy Paws Vet', category: 'Veterinarian', distance: '2.5 miles', address: '202 Fetch Ln, Petville', image: 'https://picsum.photos/seed/vet/400/200', likes: 120, comments: [], isBusinessService: true },
    { id: 's3', name: 'PetSmart', category: 'Pet Store', distance: '3.1 miles', address: '303 Chew Toy Cres, Petville', image: 'https://picsum.photos/seed/store/400/200', likes: 450, comments: [], isBusinessService: true },
];

type ActiveModal = 'none' | 'options' | 'post' | 'report' | 'new_pet' | 'new_service';
type ItemType = 'post' | 'report' | 'service' | 'location';

type ConfirmationState = {
    isOpen: boolean;
    message: string;
    confirmText?: string;
    onConfirm: () => void;
};

type CommentingState = {
    type: ItemType;
    item: Post | Report | Service | Location;
} | null;

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<View>(View.Home);
  const [currentUser, setCurrentUser] = useState<User>(initialUser);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotificationsData);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>('none');

  const [posts, setPosts] = useState<Post[]>(initialMockPosts);
  const [reports, setReports] = useState<Report[]>(initialMockReports);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [locations, setLocations] = useState<Location[]>(initialLocations);
  
  const [likedItems, setLikedItems] = useState({
      posts: new Set<string>(),
      reports: new Set<string>(),
      services: new Set<string>(),
      locations: new Set<string>(),
  });

  const [stories, setStories] = useState<Story[]>(mockStoriesData);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [viewingPet, setViewingPet] = useState<Pet | null>(null);

  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const [confirmation, setConfirmation] = useState<ConfirmationState>({ isOpen: false, message: '', onConfirm: () => {} });
  const [commentingItem, setCommentingItem] = useState<CommentingState>(null);

  const handleRequestDelete = (message: string, onConfirm: () => void, confirmText?: string) => {
    setConfirmation({ isOpen: true, message, onConfirm, confirmText });
  };
  const closeConfirmation = () => {
    setConfirmation({ isOpen: false, message: '', onConfirm: () => {} });
  };

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  
  const handleLogout = useCallback(() => {
      setIsLoggedIn(false);
      setCurrentView(View.Home);
  }, []);

  const handleDeleteAccount = useCallback(() => {
      alert('Account deleted. Thank you for using PetConnect!');
      setIsLoggedIn(false);
      setCurrentUser(initialUser);
      setCurrentView(View.Home);
      closeConfirmation();
  }, []);
  
  const handleToggleNotifications = useCallback(() => {
    setIsNotificationsOpen(prev => !prev);
    if (!isNotificationsOpen) {
      setNotifications(currentNotifications => 
        currentNotifications.map(n => ({ ...n, isRead: true }))
      );
    }
  }, [isNotificationsOpen]);
  
  const hasUnreadNotifications = useMemo(() => notifications.some(n => !n.isRead), [notifications]);

  const handleCloseModals = useCallback(() => {
      setActiveModal('none');
      setCommentingItem(null);
  }, []);

  const handleOpenOptions = useCallback(() => setActiveModal('options'), []);
  const handleOpenNewPost = useCallback(() => { setActiveModal('post') }, []);
  const handleOpenNewReport = useCallback(() => { setActiveModal('report') }, []);
  const handleOpenNewPet = useCallback(() => { setActiveModal('new_pet') }, []);
  const handleOpenNewService = useCallback(() => { setActiveModal('new_service') }, []);
  const handleOpenNewGroup = useCallback(() => {
    setActiveModal('none');
    setCurrentView(View.NewGroup);
  }, []);

  const handleLike = useCallback((itemId: string, itemType: ItemType) => {
    const stateKey = `${itemType}s` as keyof typeof likedItems;

    if (!likedItems[stateKey]) {
      console.error(`Invalid item type for liking: ${itemType}`);
      return;
    }
    
    setLikedItems(currentLiked => {
        const newSet = new Set(currentLiked[stateKey]);
        const isAlreadyLiked = newSet.has(itemId);
        
        const updateLikes = (items: any[]) => items.map(item =>
            item.id === itemId ? { ...item, likes: item.likes + (isAlreadyLiked ? -1 : 1) } : item
        );

        if (itemType === 'post') setPosts(posts => updateLikes(posts));
        else if (itemType === 'report') setReports(reports => updateLikes(reports));
        else if (itemType === 'service') setServices(services => updateLikes(services));
        else if (itemType === 'location') setLocations(locations => updateLikes(locations));

        if (isAlreadyLiked) {
            newSet.delete(itemId);
        } else {
            newSet.add(itemId);
        }
        return { ...currentLiked, [stateKey]: newSet };
    });
  }, []);


  const handleOpenComments = useCallback((item: Post | Report | Service | Location, type: ItemType) => {
    setCommentingItem({ item, type });
  }, []);
  
  const handleAddNewComment = useCallback((text: string) => {
    if (!commentingItem) return;

    const newComment: Comment = {
      id: `c${Date.now()}`,
      user: currentUser,
      text,
      timestamp: new Date().toISOString(),
    };

    const { type, item } = commentingItem;

    const addCommentToItem = (items: any[]) => items.map(i =>
        i.id === item.id ? { ...i, comments: [...i.comments, newComment] } : i
    );

    if (type === 'post') setPosts(posts => addCommentToItem(posts));
    else if (type === 'report') setReports(reports => addCommentToItem(reports));
    else if (type === 'service') setServices(services => addCommentToItem(services));
    else if (type === 'location') setLocations(locations => addCommentToItem(locations));
    
    setCommentingItem(prev => prev ? ({ ...prev, item: { ...prev.item, comments: [...prev.item.comments, newComment] }}) : null);

  }, [commentingItem, currentUser]);

  const handleShare = useCallback(async (post: Post) => {
    const shareData = {
      title: `Check out ${post.pet.name} on PetConnect!`,
      text: `"${post.caption}" - a post by ${post.user.name} for their pet ${post.pet.name}.`,
      url: `https://petconnect.app/post/${post.id}`,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        alert('Sharing not supported on this browser. Imagine the post is shared!');
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  }, []);

  const handleAddNewPost = useCallback((caption: string, petId: string) => {
    const pet = currentUser.pets.find(p => p.id === petId);
    if (!pet) {
      console.error("Selected pet not found");
      return;
    }

    const newPost: Post = {
        id: `post${Date.now()}`,
        user: {id: currentUser.id, name: currentUser.name, avatar: currentUser.avatar, pets: []},
        pet: pet,
        image: `https://picsum.photos/seed/newpost${Date.now()}/600/600`,
        caption: caption,
        likes: 0,
        comments: [],
    };

    setPosts(currentPosts => [newPost, ...currentPosts]);
    handleCloseModals();
  }, [handleCloseModals, currentUser]);

  const handleOpenStory = useCallback((story: Story) => {
    setActiveStory(story);
  }, []);

  const handleCloseStory = useCallback(() => {
    setActiveStory(null);
  }, []);

  const handleUpdateUser = useCallback((updatedData: Partial<User>) => {
    const updatedUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedUser);

    if (updatedData.name || updatedData.avatar) {
        const updateUserInItems = (items: any[]) => items.map(item => {
            if (item.user?.id === currentUser.id) {
                return { ...item, user: { ...item.user, name: updatedUser.name, avatar: updatedUser.avatar } };
            }
            if (item.comments?.length) {
                return { ...item, comments: item.comments.map((c: Comment) => c.user.id === currentUser.id ? { ...c, user: { ...c.user, name: updatedUser.name, avatar: updatedUser.avatar }} : c) };
            }
            return item;
        });
        setPosts(updateUserInItems);
        setReports(updateUserInItems);
        setServices(updateUserInItems);
        setStories(updateUserInItems);
    }
    
    setCurrentView(View.Profile);
  }, [currentUser]);

  const handleNavigateToEditPet = useCallback((pet: Pet) => {
    setEditingPet(pet);
    setCurrentView(View.EditPet);
  }, []);

  const handleUpdatePet = useCallback((updatedPet: Pet) => {
    const updatedUserPets = currentUser.pets.map(p => 
      p.id === updatedPet.id ? updatedPet : p
    );
    setCurrentUser(currentUser => ({...currentUser, pets: updatedUserPets}));

    setPosts(currentPosts => 
      currentPosts.map(post => 
        post.pet.id === updatedPet.id ? { ...post, pet: updatedPet } : post
      )
    );

    setEditingPet(null);
    setCurrentView(View.Profile);
  }, [currentUser]);
  
  const handleAddNewPet = useCallback((newPet: Omit<Pet, 'id'>) => {
    const petWithId: Pet = {
        ...newPet,
        id: `p${Date.now()}`,
    };
    setCurrentUser(currentUser => ({
        ...currentUser,
        pets: [...currentUser.pets, petWithId]
    }));
    handleCloseModals();
  }, [handleCloseModals]);

  const handleAddNewService = useCallback((newServiceData: Omit<Service, 'id' | 'user' | 'likes' | 'comments'>) => {
    const newService: Service = {
        id: `service${Date.now()}`,
        user: currentUser,
        likes: 0,
        comments: [],
        ...newServiceData,
    };
    setServices(currentServices => [newService, ...currentServices]);
    handleCloseModals();
  }, [currentUser, handleCloseModals]);

  const handleNavigateToPetDetail = useCallback((pet: Pet) => {
    setViewingPet(pet);
    setCurrentView(View.PetDetail);
  }, []);

  const handleCreateGroup = useCallback((name: string, avatar: string, memberIds: string[]) => {
      const members = allUsers.filter(u => memberIds.includes(u.id) || u.id === currentUser.id);
      const newGroupId = `group${Date.now()}`;
      const newGroup: Conversation = {
          id: newGroupId,
          name,
          avatar,
          isGroup: true,
          members,
          lastMessage: `Group created by ${currentUser.name}`,
          time: '1s',
          unread: 0,
          messages: [],
      };

      setConversations(prev => [newGroup, ...prev]);
      setCurrentView(View.Messages);

  }, [currentUser]);
  
    const handleViewConversation = useCallback((conversationId: string) => {
        setActiveConversationId(conversationId);
        setCurrentView(View.Chat);
    }, []);

    const handleSendMessage = useCallback((text: string) => {
        if (!activeConversationId) return;

        const newMessage: Message = {
            id: `m${Date.now()}`,
            user: currentUser,
            text,
            timestamp: new Date().toISOString(),
        };

        setConversations(currentConversations =>
            currentConversations.map(c =>
                c.id === activeConversationId
                    ? { ...c, messages: [...c.messages, newMessage], lastMessage: text, time: '1s' }
                    : c
            )
        );
    }, [activeConversationId, currentUser]);

    const handleDeleteConversation = useCallback((conversationId: string) => {
        setConversations(current => current.filter(c => c.id !== conversationId));
        closeConfirmation();
    }, []);

  const handleAcceptInvite = useCallback((notificationId: string, groupId: string | undefined) => {
    if(!groupId) return;
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  const handleRejectInvite = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

    const handleDeletePet = useCallback((petId: string) => {
        setCurrentUser(currentUser => ({
            ...currentUser,
            pets: currentUser.pets.filter(p => p.id !== petId),
        }));
        setPosts(currentPosts => currentPosts.filter(p => p.pet.id !== petId));
        closeConfirmation();
    }, []);

    const handleDeletePost = useCallback((postId: string) => {
        setPosts(currentPosts => currentPosts.filter(p => p.id !== postId));
        closeConfirmation();
    }, []);

    const handleDeleteService = useCallback((serviceId: string) => {
        setServices(currentServices => currentServices.filter(s => s.id !== serviceId));
        closeConfirmation();
    }, []);
    
    const handleNavigateToEditService = useCallback((service: Service) => {
      setEditingService(service);
      setCurrentView(View.EditService);
    }, []);
    
    const handleUpdateService = useCallback((updatedService: Service) => {
      setServices(currentServices =>
        currentServices.map(s =>
          s.id === updatedService.id ? updatedService : s
        )
      );
      setEditingService(null);
      setCurrentView(View.Profile);
    }, []);

    const handleDeleteReport = useCallback((reportId: string) => {
        setReports(currentReports => currentReports.filter(r => r.id !== reportId));
        closeConfirmation();
    }, []);

  const renderView = () => {
    const userServices = services.filter(s => s.user.id === currentUser.id);
    const activeConversation = conversations.find(c => c.id === activeConversationId);

    switch (currentView) {
      case View.Home:
        return <HomeScreen 
            posts={posts} 
            likedItems={likedItems}
            onLike={handleLike}
            onOpenComments={handleOpenComments}
            onShare={handleShare} 
            stories={stories} 
            onOpenStory={handleOpenStory} 
            onNewReport={handleOpenNewReport}
            reports={reports}
            currentUser={currentUser}
            onDeleteReport={(reportId) => handleRequestDelete('Are you sure you want to delete this report?', () => handleDeleteReport(reportId))}
        />;
      case View.Map:
        return <MapScreen 
            services={services} 
            locations={locations}
            likedItems={likedItems} 
            onLike={handleLike} 
            onOpenComments={handleOpenComments}
        />;
      case View.Messages:
        return <MessagesScreen 
            conversations={conversations} 
            onNewGroup={() => setCurrentView(View.NewGroup)}
            onViewConversation={handleViewConversation}
            onDeleteConversation={(convoId) => handleRequestDelete('Are you sure you want to delete this chat?', () => handleDeleteConversation(convoId))}
        />;
      case View.Profile:
        return <ProfileScreen 
            user={currentUser} 
            posts={posts}
            services={userServices}
            likedItems={likedItems}
            onEdit={() => setCurrentView(View.EditProfile)} 
            onEditPet={handleNavigateToEditPet} 
            onViewPet={handleNavigateToPetDetail}
            onEditService={handleNavigateToEditService}
            onLike={handleLike}
            onOpenComments={handleOpenComments}
            onDeletePet={(petId) => handleRequestDelete('Are you sure you want to delete this pet? This will also remove all their posts.', () => handleDeletePet(petId))}
            onDeleteService={(serviceId) => handleRequestDelete('Are you sure you want to delete this item?', () => handleDeleteService(serviceId))}
            onDeletePost={(postId) => handleRequestDelete('Are you sure you want to delete this post?', () => handleDeletePost(postId))}
            onLogout={handleLogout}
            onDeleteAccount={() => handleRequestDelete('This will permanently delete your account and all your data. This action cannot be undone.', handleDeleteAccount, 'Delete Account')}
         />;
      case View.EditProfile:
        return <EditProfileScreen user={currentUser} onUpdate={handleUpdateUser} onCancel={() => setCurrentView(View.Profile)} />;
      case View.EditPet:
        if (!editingPet) {
            setCurrentView(View.Profile);
            return null;
        }
        return <EditPetScreen pet={editingPet} onUpdate={handleUpdatePet} onCancel={() => setCurrentView(View.Profile)} />;
      case View.EditService:
        if (!editingService) {
            setCurrentView(View.Profile);
            return null;
        }
        return <EditServiceScreen service={editingService} onUpdate={handleUpdateService} onCancel={() => setCurrentView(View.Profile)} />;
      case View.PetDetail:
        if (!viewingPet) {
            setCurrentView(View.Profile);
            return null;
        }
        return <PetDetailScreen pet={viewingPet} onBack={() => setCurrentView(View.Profile)} />;
      case View.NewGroup:
          return <NewGroupScreen onCancel={() => setCurrentView(View.Messages)} onCreate={handleCreateGroup} users={allUsers.filter(u => u.id !== currentUser.id)} />;
      case View.Chat:
          if (!activeConversation) {
              setCurrentView(View.Messages);
              return null;
          }
          return <ChatScreen 
                    conversation={activeConversation} 
                    currentUser={currentUser} 
                    onBack={() => setCurrentView(View.Messages)} 
                    onSendMessage={handleSendMessage}
                 />;
      default:
        return <HomeScreen 
            posts={posts} 
            likedItems={likedItems}
            onLike={handleLike}
            onOpenComments={handleOpenComments}
            onShare={handleShare} 
            stories={stories} 
            onOpenStory={handleOpenStory}
            onNewReport={handleOpenNewReport}
            reports={reports}
            currentUser={currentUser}
            onDeleteReport={(reportId) => handleRequestDelete('Are you sure you want to delete this report?', () => handleDeleteReport(reportId))}
        />;
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <BottomNav currentView={currentView} setCurrentView={setCurrentView} onOpenOptions={handleOpenOptions} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-20 shadow-sm md:relative md:shadow-none md:border-b md:border-slate-200">
          <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between md:max-w-5xl">
              <div className="flex items-center gap-2">
                  <PawPrintIcon className="w-8 h-8" />
                  <h1 className="text-2xl font-extrabold text-orange-500">PetConnect</h1>
              </div>
              <div className="flex items-center gap-2">
                  <div className="relative">
                      <button onClick={handleToggleNotifications} className="p-2 text-slate-600 hover:text-orange-500 transition-colors rounded-full hover:bg-slate-100">
                          <BellIcon className="w-7 h-7" />
                          {hasUnreadNotifications && (
                              <span className="absolute top-2 right-2 block w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                          )}
                      </button>
                  </div>
                  <button onClick={() => setCurrentView(View.Profile)} className="w-9 h-9 rounded-full overflow-hidden border-2 border-slate-200 hover:border-orange-400 transition-colors">
                      <img src={currentUser.avatar} alt="User Profile" className="w-full h-full object-cover" />
                  </button>
              </div>
          </div>
        </header>

        <div className="relative flex-grow">
          {isNotificationsOpen && <NotificationsPanel notifications={notifications} onClose={() => setIsNotificationsOpen(false)} onAcceptInvite={handleAcceptInvite} onRejectInvite={handleRejectInvite} />}
          
          <main className="pb-20 md:pb-4">
             <div className="max-w-md mx-auto md:max-w-3xl lg:max-w-4xl py-4 md:py-6">
              {renderView()}
            </div>
          </main>
        </div>
      </div>
      
      {activeModal === 'options' && <PostOptionsModal onClose={handleCloseModals} onNewPost={handleOpenNewPost} onNewPet={handleOpenNewPet} onNewReport={handleOpenNewReport} onNewGroup={handleOpenNewGroup} onNewService={handleOpenNewService} />}
      {activeModal === 'post' && <NewPostScreen onClose={handleCloseModals} onAddNewPost={handleAddNewPost} pets={currentUser.pets} />}
      {activeModal === 'report' && <NewReportScreen onClose={handleCloseModals} />}
      {activeModal === 'new_pet' && <NewPetScreen onClose={handleCloseModals} onAddPet={handleAddNewPet} />}
      {activeModal === 'new_service' && <NewServiceScreen onClose={handleCloseModals} onAddService={handleAddNewService} />}
      {activeStory && <StoryViewer story={activeStory} onClose={handleCloseStory} />}
      {commentingItem && (
          <CommentModal 
            item={commentingItem.item}
            itemType={commentingItem.type}
            currentUser={currentUser}
            onClose={handleCloseModals}
            onAddComment={handleAddNewComment}
          />
      )}
      {confirmation.isOpen && (
        <ConfirmationModal
            isOpen={confirmation.isOpen}
            message={confirmation.message}
            confirmText={confirmation.confirmText}
            onConfirm={confirmation.onConfirm}
            onCancel={closeConfirmation}
        />
      )}
    </div>
  );
};

export default App;