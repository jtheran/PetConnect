import React, { useState } from 'react';
import { XIcon, CameraIcon } from '../components/icons';
import { Pet } from '../types';

interface NewPostScreenProps {
  onClose: () => void;
  onAddNewPost: (caption: string, petId: string) => void;
  pets: Pet[];
}

const NewPostScreen: React.FC<NewPostScreenProps> = ({ onClose, onAddNewPost, pets }) => {
  const [caption, setCaption] = useState('');
  const [selectedPetId, setSelectedPetId] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const canPost = caption.trim() !== '' && selectedPetId !== '' && imagePreview !== null;

  const handlePost = () => {
    if (canPost) {
      onAddNewPost(caption, selectedPetId);
    }
  };

  const handleImageUpload = () => {
    // In a real app, this would open a file picker.
    // For this mock, we'll just set a random image.
    setImagePreview(`https://picsum.photos/seed/preview${Date.now()}/600/600`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative w-full bg-slate-50 rounded-t-2xl flex flex-col h-[90vh]
                      md:max-w-lg md:h-auto md:max-h-[90vh] md:rounded-2xl md:shadow-xl animate-modal-entry">
      <header className="flex-shrink-0 bg-white/80 backdrop-blur-lg z-10 shadow-sm p-3 flex items-center justify-between md:rounded-t-2xl">
          <button onClick={onClose} className="p-2 text-slate-600 hover:bg-slate-100 rounded-full">
            <XIcon className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-bold text-slate-800">New Post</h2>
          <button 
            onClick={handlePost}
            disabled={!canPost}
            className="bg-orange-500 text-white font-bold py-1.5 px-4 rounded-lg text-sm hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post
          </button>
        </header>
        <main className="flex-grow overflow-y-auto p-4 space-y-4">
        <div 
            onClick={handleImageUpload}
            className="aspect-square w-full bg-slate-200 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-300 transition-colors overflow-hidden"
        >
            {imagePreview ? (
                <img src={imagePreview} alt="Post preview" className="w-full h-full object-cover" />
            ) : (
                <>
                    <CameraIcon className="w-12 h-12 mb-2" />
                    <p className="font-semibold">Tap to upload a photo</p>
                </>
            )}
        </div>
        <textarea 
            placeholder="Write a caption..." 
            rows={4}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition text-slate-800"
        ></textarea>
        <select 
            value={selectedPetId}
            onChange={(e) => setSelectedPetId(e.target.value)}
            className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition text-slate-800"
        >
            <option value="" disabled>Tag a pet...</option>
            {pets.map(pet => (
              <option key={pet.id} value={pet.id}>{pet.name}</option>
            ))}
        </select>
      </main>
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

export default NewPostScreen;