import React, { useState, useRef, useEffect } from 'react';
import { Post, Story, Report, ReportStatus, User } from '../types';
import { HeartIcon, CommentIcon, ShareIcon, TrashIcon } from '../components/icons';

const ReportCard: React.FC<{ 
    report: Report; 
    currentUser: User; 
    onDelete: (reportId: string) => void; 
    isLiked: boolean;
    onLike: () => void;
    onOpenComments: () => void;
}> = ({ report, currentUser, onDelete, isLiked, onLike, onOpenComments }) => {
    const getStatusStyles = () => {
        switch (report.status) {
            case 'Lost': return 'bg-red-100 text-red-700';
            case 'Found': return 'bg-green-100 text-green-700';
            case 'Adoption': return 'bg-purple-100 text-purple-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="relative group flex gap-4 p-3">
                <img src={report.image} alt={report.petName} className="w-28 h-28 object-cover rounded-xl flex-shrink-0" />
                <div className="flex flex-col flex-grow">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full self-start ${getStatusStyles()}`}>
                        {report.status}
                    </span>
                    <h3 className="text-lg font-bold text-slate-800 mt-1">{report.petName}</h3>
                    <p className="text-sm text-slate-600 font-semibold">{report.breed}</p>
                     {report.description && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{report.description}</p>}
                    <p className="text-xs text-slate-400 mt-auto pt-1">{report.location} - {report.date}</p>
                </div>
                 {report.user?.id === currentUser.id && (
                    <button 
                        onClick={() => onDelete(report.id)} 
                        className="absolute top-2 right-2 p-1.5 bg-white/70 text-slate-400 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                        aria-label={`Delete report for ${report.petName}`}
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                )}
            </div>
            <div className="border-t border-slate-100 px-4 py-2 flex justify-start gap-6">
                 <button onClick={onLike} className={`flex items-center gap-2 transition-colors ${isLiked ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}`}>
                    <HeartIcon isLiked={isLiked} className="w-5 h-5"/>
                    <span className="font-semibold text-sm">{report.likes}</span>
                </button>
                <button onClick={onOpenComments} className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors">
                    <CommentIcon className="w-5 h-5"/>
                    <span className="font-semibold text-sm">{report.comments.length}</span>
                </button>
            </div>
        </div>
    );
}

const ReportsSection: React.FC<{ 
    onNewReport: () => void; 
    reports: Report[]; 
    currentUser: User; 
    onDeleteReport: (reportId: string) => void;
    likedItems: { reports: Set<string> };
    onLike: (reportId: string) => void;
    onOpenComments: (report: Report) => void;
}> = ({ onNewReport, reports, currentUser, onDeleteReport, likedItems, onLike, onOpenComments }) => {
    const [activeTab, setActiveTab] = useState<ReportStatus>('Lost');
    const filteredReports = reports.filter(r => r.status === activeTab);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">Community Reports</h2>
                <button onClick={onNewReport} className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-orange-600 transition-colors">New Report</button>
            </div>
            
            <div className="flex bg-slate-200 rounded-lg p-1 mb-4">
                <button onClick={() => setActiveTab('Lost')} className={`w-1/3 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'Lost' ? 'bg-white shadow text-orange-600' : 'text-slate-600'}`}>
                    Lost
                </button>
                <button onClick={() => setActiveTab('Found')} className={`w-1/3 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'Found' ? 'bg-white shadow text-orange-600' : 'text-slate-600'}`}>
                    Found
                </button>
                <button onClick={() => setActiveTab('Adoption')} className={`w-1/3 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'Adoption' ? 'bg-white shadow text-orange-600' : 'text-slate-600'}`}>
                    Adoption
                </button>
            </div>

            <div className="space-y-4">
                {filteredReports.length > 0 ? (
                    filteredReports.map(report => (
                        <ReportCard 
                            key={report.id} 
                            report={report} 
                            currentUser={currentUser} 
                            onDelete={onDeleteReport}
                            isLiked={likedItems.reports.has(report.id)}
                            onLike={() => onLike(report.id)}
                            onOpenComments={() => onOpenComments(report)}
                        />
                    ))
                ) : (
                    <p className="text-center text-slate-500 pt-8">No {activeTab.toLowerCase()} pets reported here.</p>
                )}
            </div>
        </div>
    );
};


const PostCard: React.FC<{ 
    post: Post;
    isLiked: boolean;
    onLike: () => void;
    onComment: () => void;
    onShare: () => void;
}> = ({ post, isLiked, onLike, onComment, onShare }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
            <div className="p-4 flex items-center gap-3">
                <img src={post.pet.avatar} alt={post.pet.name} className="w-12 h-12 rounded-full border-2 border-orange-400" />
                <div>
                    <p className="font-bold text-slate-800">{post.pet.name}</p>
                    <p className="text-sm text-slate-500">with {post.user.name}</p>
                </div>
            </div>
            <img src={post.image} alt="Pet post" className="w-full h-auto" />
            <div className="p-4">
                <p className="text-slate-700">
                    <span className="font-bold mr-2">{post.pet.name}</span>
                    {post.caption}
                </p>
                <div className="flex justify-start gap-6 mt-4">
                    <button onClick={onLike} className={`flex items-center gap-2 transition-colors ${isLiked ? 'text-red-500' : 'text-slate-600 hover:text-red-500'}`}>
                        <HeartIcon isLiked={isLiked} className="w-6 h-6"/>
                        <span className="font-semibold">{post.likes}</span>
                    </button>
                    <button onClick={onComment} className="flex items-center gap-2 text-slate-600 hover:text-blue-500 transition-colors">
                        <CommentIcon className="w-6 h-6"/>
                        <span className="font-semibold">{post.comments.length}</span>
                    </button>
                    <button onClick={onShare} className="flex items-center gap-2 text-slate-600 hover:text-green-500 transition-colors">
                        <ShareIcon className="w-6 h-6"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

const StoryAvatar: React.FC<{ story: Story; onClick: () => void }> = ({ story, onClick }) => (
    <div className="flex-shrink-0 flex flex-col items-center gap-1">
        <button onClick={onClick} className="relative p-1 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500">
            <div className="bg-white p-0.5 rounded-full">
                <img src={story.user.avatar} alt={story.user.name} className="w-16 h-16 rounded-full object-cover" />
            </div>
        </button>
        <p className="text-xs text-slate-600 truncate w-20 text-center">{story.user.name}</p>
    </div>
);


const StoryReel: React.FC<{ stories: Story[]; onOpenStory: (story: Story) => void }> = ({ stories, onOpenStory }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 5);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            handleScroll(); // Initial check
            container.addEventListener('scroll', handleScroll);
            const resizeObserver = new ResizeObserver(handleScroll);
            resizeObserver.observe(container);

            return () => {
                container.removeEventListener('scroll', handleScroll);
                resizeObserver.unobserve(container);
            };
        }
    }, [stories]);

    return (
        <div className="relative group bg-slate-50/80 border-b border-slate-200 px-4 py-3">
             {canScrollLeft && (
                <button 
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 rounded-full shadow-md items-center justify-center hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Scroll left"
                >
                    <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
            )}
            <div 
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto pb-2 -mb-2 scrollbar-hide"
            >
                {stories.map(story => (
                    <StoryAvatar key={story.id} story={story} onClick={() => onOpenStory(story)} />
                ))}
            </div>
             {canScrollRight && (
                 <button 
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 rounded-full shadow-md items-center justify-center hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Scroll right"
                >
                    <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            )}
            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
        </div>
    );
};

interface HomeScreenProps {
  posts: Post[];
  likedItems: { posts: Set<string>, reports: Set<string> };
  onLike: (itemId: string, itemType: 'post' | 'report' | 'service') => void;
  onOpenComments: (item: Post | Report, type: 'post' | 'report') => void;
  onShare: (post: Post) => void;
  stories: Story[];
  onOpenStory: (story: Story) => void;
  onNewReport: () => void;
  reports: Report[];
  currentUser: User;
  onDeleteReport: (reportId: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ posts, likedItems, onLike, onOpenComments, onShare, stories, onOpenStory, onNewReport, reports, currentUser, onDeleteReport }) => {
  const [activeTab, setActiveTab] = useState<'news' | 'reports'>('news');

  return (
    <div>
        <div className="flex bg-slate-100 p-1 sticky top-0 z-10 max-w-md mx-auto">
            <button onClick={() => setActiveTab('news')} className={`w-1/2 py-2.5 rounded-md text-sm font-bold transition-all ${activeTab === 'news' ? 'bg-white shadow text-orange-600' : 'text-slate-600 hover:bg-slate-200'}`}>
                Noticias
            </button>
            <button onClick={() => setActiveTab('reports')} className={`w-1/2 py-2.5 rounded-md text-sm font-bold transition-all ${activeTab === 'reports' ? 'bg-white shadow text-orange-600' : 'text-slate-600 hover:bg-slate-200'}`}>
                Reportes
            </button>
        </div>
      
        {activeTab === 'news' && (
            <div>
                <StoryReel stories={stories} onOpenStory={onOpenStory} />
                <div className="p-4">
                    {posts.map(post => (
                        <PostCard 
                          key={post.id} 
                          post={post}
                          isLiked={likedItems.posts.has(post.id)}
                          onLike={() => onLike(post.id, 'post')}
                          onComment={() => onOpenComments(post, 'post')}
                          onShare={() => onShare(post)}
                        />
                    ))}
                </div>
            </div>
        )}

        {activeTab === 'reports' && (
            <ReportsSection 
                onNewReport={onNewReport} 
                reports={reports} 
                currentUser={currentUser} 
                onDeleteReport={onDeleteReport}
                likedItems={likedItems}
                onLike={(reportId) => onLike(reportId, 'report')}
                onOpenComments={(report) => onOpenComments(report, 'report')}
            />
        )}
    </div>
  );
};

export default HomeScreen;