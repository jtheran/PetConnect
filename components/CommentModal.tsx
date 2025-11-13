import React, { useState } from 'react';
import { Post, Report, Service, User, Comment } from '../types';
import { XIcon } from './icons';

interface CommentModalProps {
  item: Post | Report | Service;
  itemType: string;
  currentUser: User;
  onClose: () => void;
  onAddComment: (text: string) => void;
}

const timeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 10) return `just now`;
    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
};

const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
    return (
        <div className="flex items-start gap-3 py-3">
            <img src={comment.user.avatar} alt={comment.user.name} className="w-9 h-9 rounded-full flex-shrink-0" />
            <div className="flex-grow">
                <div className="bg-slate-100 rounded-xl px-3 py-2">
                    <div className="flex items-baseline gap-2">
                        <span className="font-bold text-slate-800 text-sm">{comment.user.name}</span>
                        <span className="text-xs text-slate-400">{timeAgo(comment.timestamp)}</span>
                    </div>
                    <p className="text-sm text-slate-700">{comment.text}</p>
                </div>
            </div>
        </div>
    )
}

const CommentModal: React.FC<CommentModalProps> = ({ item, itemType, currentUser, onClose, onAddComment }) => {
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment(newComment);
            setNewComment('');
        }
    };
    
    const getItemTitle = () => {
        if ('caption' in item) return `Post by ${item.user.name}`;
        if ('petName' in item) return `Report for ${item.petName}`;
        if ('name' in item) return `${item.type} by ${item.user.name}`;
        return 'Comments';
    }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-end md:items-center md:justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative w-full h-full bg-slate-50 flex flex-col
                      md:max-w-md md:h-auto md:max-h-[80vh] md:rounded-2xl md:shadow-xl animate-modal-entry">
        <header className="flex-shrink-0 bg-white/80 backdrop-blur-lg z-10 shadow-sm p-3 flex items-center justify-between">
            <h3 className="text-md font-bold text-slate-800 text-center flex-grow ml-12">{getItemTitle()}</h3>
            <button onClick={onClose} className="p-2 text-slate-500 hover:bg-slate-200 rounded-full">
                <XIcon className="w-6 h-6" />
            </button>
        </header>

        <div className="flex-grow overflow-y-auto px-4">
             {item.comments.length > 0 ? (
                item.comments.map(comment => <CommentItem key={comment.id} comment={comment} />)
            ) : (
                <div className="text-center py-20 text-slate-500">
                    <p className="font-semibold">No comments yet.</p>
                    <p className="text-sm">Be the first to comment!</p>
                </div>
            )}
        </div>
        
        <footer className="flex-shrink-0 bg-white border-t border-slate-200 p-2">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                 <img src={currentUser.avatar} alt="Your avatar" className="w-9 h-9 rounded-full" />
                 <input 
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full bg-slate-100 border-2 border-transparent focus:border-orange-400 focus:bg-white focus:ring-0 transition-all text-slate-800 py-2 px-4 rounded-full"
                 />
                 <button type="submit" className="text-orange-500 font-bold px-3 py-2 hover:bg-orange-50 rounded-lg disabled:opacity-50" disabled={!newComment.trim()}>
                    Send
                 </button>
            </form>
        </footer>
      </div>
       <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-modal-entry {
          animation: slide-up 0.3s ease-out;
        }

        @media (min-width: 768px) {
          .animate-modal-entry {
            animation: fade-in-scale 0.2s ease-out;
          }
        }
      `}</style>
    </div>
  );
};

export default CommentModal;