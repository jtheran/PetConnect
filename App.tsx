import React, { useState, useCallback, useMemo } from 'react';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import MessagesScreen from './screens/MessagesScreen';
import ProfileScreen from './screens/ProfileScreen';
import BottomNav from './components/BottomNav';
import { PawPrintIcon, BellIcon } from './components/icons';
import { View, Notification, NotificationType, Post, User, Pet, Story, Conversation } from './types';
import NotificationsPanel from './components/NotificationsPanel';
import PostOptionsModal from './components/PostOptionsModal';
import NewPostScreen from './screens/NewPostScreen';
import NewReportScreen from './screens/NewReportScreen';
import StoryViewer from './components/StoryViewer';
import EditProfileScreen from './screens/EditProfileScreen';
import EditPetScreen from './screens/EditPetScreen';
import PetDetailScreen from './screens/PetDetailScreen';
import NewGroupScreen from './screens/NewGroupScreen';

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
};

const allUsers: User[] = [
    initialUser,
    { id: 'u2', name: 'Maria', avatar: 'https://picsum.photos/seed/user2/100/100', pets: [{ id: 'p2', name: 'Lucy', breed: 'Siamese Cat', avatar: 'https://picsum.photos/seed/lucy/100/100' }] },
    { id: 'u3', name: 'John Doe', avatar: 'https://picsum.photos/seed/user3/100/100', pets: [] },
    { id: 'u4', name: 'Adventure Paws', avatar: 'https://picsum.photos/seed/user4/100/100', pets: [] },
    { id: 'u5', name: 'Kitty Corner', avatar: 'https://picsum.photos/seed/user5/100/100', pets: [] },
];

const initialMockPosts: Post[] = [
    { id: 'post1', user: allUsers[0], pet: allUsers[0].pets[0], image: 'https://picsum.photos/seed/post1/600/600', caption: 'Enjoying the sun in the park! ☀️', likes: 125, comments: 12 },
    { id: 'post2', user: allUsers[1], pet: allUsers[1].pets[0], image: 'https://picsum.photos/seed/post2/600/600', caption: 'Nap time is the best time. 😴', likes: 230, comments: 34 },
    { id: 'post3', user: allUsers[0], pet: allUsers[0].pets[1], image: 'https://picsum.photos/seed/post3/600/600', caption: 'Ready for an adventure!', likes: 98, comments: 5 },
];

const mockStoriesData: Story[] = [
    { id: 's1', user: allUsers[0], image: 'https://picsum.photos/seed/story1/540/960', timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString() },
    { id: 's2', user: allUsers[1], image: 'https://picsum.photos/seed/story2/540/960', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
    { id: 's3', user: allUsers[2], image: 'https://picsum.photos/seed/story3/540/960', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
    { id: 's4', user: allUsers[3], image: 'https://picsum.photos/seed/story4/540/960', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
    { id: 's5', user: allUsers[4], image: 'https://picsum.photos/seed/story5/540/960', timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString() },
];

const initialConversations: Conversation[] = [
    { id: 'c1', name: 'Maria & Lucy', avatar: 'https://picsum.photos/seed/user2/100/100', lastMessage: 'Haha, sounds like Lucy!', time: '10m', unread: 2, isGroup: false, members: [allUsers[0], allUsers[1]] },
    { id: 'c2', name: 'Dog Lovers Group', avatar: 'https://picsum.photos/seed/group1/100/100', lastMessage: 'Who is going to the park this weekend?', time: '1h', unread: 0, isGroup: true, members: [allUsers[0], allUsers[2]] },
    { id: 'c3', name: 'John Doe', avatar: 'https://picsum.photos/seed/user3/100/100', lastMessage: 'Thanks for the tip!', time: '3h', unread: 0, isGroup: false, members: [allUsers[0], allUsers[2]] },
];

type ActiveModal = 'none' | 'options' | 'post' | 'report';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<View>(View.Home);
  const [currentUser, setCurrentUser] = useState<User>(initialUser);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotificationsData);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>('none');

  const [posts, setPosts] = useState<Post[]>(initialMockPosts);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const [stories, setStories] = useState<Story[]>(mockStoriesData);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [viewingPet, setViewingPet] = useState<Pet | null>(null);

  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
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

  const handleCloseModals = useCallback(() => setActiveModal('none'), []);
  const handleOpenOptions = useCallback(() => setActiveModal('options'), []);
  const handleOpenNewPost = useCallback(() => { setActiveModal('post') }, []);
  const handleOpenNewReport = useCallback(() => { setActiveModal('report') }, []);
  const handleOpenNewGroup = useCallback(() => {
    setActiveModal('none');
    setCurrentView(View.NewGroup);
  }, []);

  const handleLike = useCallback((postId: string) => {
    const isAlreadyLiked = likedPosts.has(postId);
    setPosts(currentPosts =>
      currentPosts.map(post =>
        post.id === postId ? { ...post, likes: post.likes + (isAlreadyLiked ? -1 : 1) } : post
      )
    );

    setLikedPosts(currentLikedPosts => {
      const newLikedPosts = new Set(currentLikedPosts);
      if (isAlreadyLiked) {
        newLikedPosts.delete(postId);
      } else {
        newLikedPosts.add(postId);
      }
      return newLikedPosts;
    });
  }, [likedPosts]);

  const handleComment = useCallback((postId: string) => {
    setPosts(currentPosts =>
      currentPosts.map(post =>
        post.id === postId ? { ...post, comments: post.comments + 1 } : post
      )
    );
    alert('You added a comment! (UI placeholder)');
  }, []);

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
        comments: 0,
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

  const handleUpdateUser = useCallback((newName: string, newAvatar: string) => {
    const updatedUser = { ...currentUser, name: newName, avatar: newAvatar };
    setCurrentUser(updatedUser);

    setPosts(currentPosts =>
        currentPosts.map(post =>
            post.user.id === currentUser.id
                ? { ...post, user: { ...post.user, name: newName, avatar: newAvatar } }
                : post
        )
    );

    setStories(currentStories =>
        currentStories.map(story =>
            story.user.id === currentUser.id
                ? { ...story, user: { ...story.user, name: newName, avatar: newAvatar } }
                : story
        )
    );
    
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
      };

      setConversations(prev => [newGroup, ...prev]);

      const newNotifications: Notification[] = memberIds
          .filter(id => id !== currentUser.id)
          .map(id => ({
              id: `noti-${newGroupId}-${id}`,
              type: NotificationType.GroupInvite,
              text: `${currentUser.name} invited you to join the group "${name}".`,
              timestamp: new Date().toISOString(),
              isRead: false,
              relatedUser: { name: currentUser.name, avatar: currentUser.avatar },
              groupId: newGroupId,
              groupName: name,
          }));

      setNotifications(prev => [...newNotifications, ...prev]);

      setCurrentView(View.Messages);

  }, [currentUser]);
  
  const handleAcceptInvite = useCallback((notificationId: string, groupId: string | undefined) => {
    if(!groupId) return;

    // Add the current user to the group's member list
    setConversations(prev => 
        prev.map(c => 
            c.id === groupId && !c.members.some(m => m.id === currentUser.id)
                ? { ...c, members: [...c.members, currentUser] }
                : c
        )
    );

    // Remove the notification after handling it
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, [currentUser]);

  const handleRejectInvite = useCallback((notificationId: string) => {
    // Simply remove the notification
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  const renderView = () => {
    switch (currentView) {
      case View.Home:
        return <HomeScreen 
            posts={posts} 
            likedPosts={likedPosts} 
            onLike={handleLike} 
            onComment={handleComment} 
            onShare={handleShare} 
            stories={stories} 
            onOpenStory={handleOpenStory} 
            onNewReport={handleOpenNewReport}
        />;
      case View.Map:
        return <MapScreen />;
      case View.Messages:
        return <MessagesScreen conversations={conversations} onNewGroup={() => setCurrentView(View.NewGroup)} />;
      case View.Profile:
        return <ProfileScreen user={currentUser} onEdit={() => setCurrentView(View.EditProfile)} onEditPet={handleNavigateToEditPet} onViewPet={handleNavigateToPetDetail} />;
      case View.EditProfile:
        return <EditProfileScreen user={currentUser} onUpdate={handleUpdateUser} onCancel={() => setCurrentView(View.Profile)} />;
      case View.EditPet:
        if (!editingPet) {
            setCurrentView(View.Profile);
            return null;
        }
        return <EditPetScreen pet={editingPet} onUpdate={handleUpdatePet} onCancel={() => setCurrentView(View.Profile)} />;
      case View.PetDetail:
        if (!viewingPet) {
            setCurrentView(View.Profile);
            return null;
        }
        return <PetDetailScreen pet={viewingPet} onBack={() => setCurrentView(View.Profile)} />;
      case View.NewGroup:
          return <NewGroupScreen onCancel={() => setCurrentView(View.Messages)} onCreate={handleCreateGroup} users={allUsers.filter(u => u.id !== currentUser.id)} />;
      default:
        return <HomeScreen 
            posts={posts} 
            likedPosts={likedPosts} 
            onLike={handleLike} 
            onComment={handleComment} 
            onShare={handleShare} 
            stories={stories} 
            onOpenStory={handleOpenStory}
            onNewReport={handleOpenNewReport}
        />;
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-20 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
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
      {isNotificationsOpen && <NotificationsPanel notifications={notifications} onClose={() => setIsNotificationsOpen(false)} onAcceptInvite={handleAcceptInvite} onRejectInvite={handleRejectInvite} />}
      
      {/* This container ensures modals don't interfere with main content's scroll */}
      <div className="relative flex-grow max-w-md w-full mx-auto">
        <main className="pb-20">
          {renderView()}
        </main>
      </div>

      {/* Place Modals and BottomNav outside the main scrollable container */}
      <BottomNav currentView={currentView} setCurrentView={setCurrentView} onOpenOptions={handleOpenOptions} />
      
      {activeModal === 'options' && <PostOptionsModal onClose={handleCloseModals} onNewPost={handleOpenNewPost} onNewReport={handleOpenNewReport} onNewGroup={handleOpenNewGroup} />}
      {activeModal === 'post' && <NewPostScreen onClose={handleCloseModals} onAddNewPost={handleAddNewPost} pets={currentUser.pets} />}
      {activeModal === 'report' && <NewReportScreen onClose={handleCloseModals} />}
      {activeStory && <StoryViewer story={activeStory} onClose={handleCloseStory} />}
    </div>
  );
};

export default App;