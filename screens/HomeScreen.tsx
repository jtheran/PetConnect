import React from 'react';
import { Post, Story } from '../types';
import { HeartIcon, CommentIcon, ShareIcon } from '../components/icons';

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
                        <span className="font-semibold">{post.comments}</span>
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
    return (
        <div className="bg-slate-50/80 border-b border-slate-200 px-4 py-3">
            <div className="flex gap-4 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
                {stories.map(story => (
                    <StoryAvatar key={story.id} story={story} onClick={() => onOpenStory(story)} />
                ))}
            </div>
            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
        </div>
    );
};

interface HomeScreenProps {
  posts: Post[];
  likedPosts: Set<string>;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (post: Post) => void;
  stories: Story[];
  onOpenStory: (story: Story) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ posts, likedPosts, onLike, onComment, onShare, stories, onOpenStory }) => {
  return (
    <div>
        <StoryReel stories={stories} onOpenStory={onOpenStory} />
        <div className="p-4">
            {posts.map(post => (
                <PostCard 
                  key={post.id} 
                  post={post}
                  isLiked={likedPosts.has(post.id)}
                  onLike={() => onLike(post.id)}
                  onComment={() => onComment(post.id)}
                  onShare={() => onShare(post)}
                />
            ))}
        </div>
    </div>
  );
};

export default HomeScreen;