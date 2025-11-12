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
    <div className="fixed inset-0 bg-slate-50 z-50 flex flex-col">
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-20 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={onClose} className="p-2 text-slate-600 hover:bg-slate-100 rounded-full">
            <XIcon className="w-7 h-7" />
          </button>
          <h2 className="text-xl font-bold text-slate-800">New Post</h2>
          <button 
            onClick={handlePost}
            disabled={!canPost}
            className="bg-orange-500 text-white font-bold py-2 px-5 rounded-lg text-sm hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post
          </button>
        </div>
      </header>
      <main className="flex-grow max-w-md w-full mx-auto p-4 space-y-4">
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
            className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition"
        ></textarea>
        <select 
            value={selectedPetId}
            onChange={(e) => setSelectedPetId(e.target.value)}
            className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition text-slate-600"
        >
            <option value="" disabled>Tag a pet...</option>
            {pets.map(pet => (
              <option key={pet.id} value={pet.id}>{pet.name}</option>
            ))}
        </select>
      </main>
    </div>
  );
};

export default NewPostScreen;
