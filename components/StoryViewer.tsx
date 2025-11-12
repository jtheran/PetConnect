import React, { useEffect, useState } from 'react';
import { Story } from '../types';
import { XIcon } from './icons';

interface StoryViewerProps {
    story: Story | null;
    onClose: () => void;
}

const STORY_DURATION = 5000; // 5 seconds

const StoryViewer: React.FC<StoryViewerProps> = ({ story, onClose }) => {
    const [progressKey, setProgressKey] = useState(0);

    useEffect(() => {
        if (story) {
            // Reset animation when story changes
            setProgressKey(prev => prev + 1); 

            const timer = setTimeout(() => {
                onClose();
            }, STORY_DURATION);

            return () => clearTimeout(timer);
        }
    }, [story, onClose]);

    if (!story) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-4">
            <div className="absolute top-4 left-4 right-4 h-1 bg-white/30 rounded-full overflow-hidden">
                <div 
                    key={progressKey}
                    className="h-full bg-white rounded-full animate-progress"
                ></div>
            </div>

            <div className="absolute top-6 left-4 flex items-center gap-3 z-10">
                <img src={story.user.avatar} alt={story.user.name} className="w-10 h-10 rounded-full border-2 border-white" />
                <p className="font-bold text-white drop-shadow-md">{story.user.name}</p>
            </div>

            <button onClick={onClose} className="absolute top-6 right-4 p-2 text-white/80 hover:text-white z-10">
                <XIcon className="w-8 h-8" />
            </button>
            
            <img 
                src={story.image} 
                alt={`Story by ${story.user.name}`}
                className="max-w-full max-h-full object-contain rounded-lg"
            />
            <style>{`
                @keyframes progress-animation {
                    from { width: 0%; }
                    to { width: 100%; }
                }
                .animate-progress {
                    animation: progress-animation ${STORY_DURATION / 1000}s linear;
                }
            `}</style>
        </div>
    );
};

export default StoryViewer;
