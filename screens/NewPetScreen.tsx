import React, { useState } from 'react';
import { Pet } from '../types';
import { XIcon } from '../components/icons';

interface NewPetScreenProps {
  onAddPet: (newPet: Omit<Pet, 'id'>) => void;
  onClose: () => void;
}

const NewPetScreen: React.FC<NewPetScreenProps> = ({ onAddPet, onClose }) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [avatar, setAvatar] = useState(`https://picsum.photos/seed/newpet-placeholder/200/200`);

  const handleSave = () => {
    if (name.trim() && breed.trim()) {
      onAddPet({ name, breed, avatar });
    }
  };

  const handleChangeAvatar = () => {
    setAvatar(`https://picsum.photos/seed/pet${Date.now()}/200/200`);
  };

  return (
    <div className="fixed inset-0 bg-slate-50 z-50 flex flex-col">
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-20 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={onClose} className="p-2 text-slate-600 hover:bg-slate-100 rounded-full">
            <XIcon className="w-7 h-7" />
          </button>
          <h2 className="text-xl font-bold text-slate-800">Add a New Pet</h2>
          <button 
            onClick={handleSave}
            disabled={!name.trim() || !breed.trim()}
            className="bg-orange-500 text-white font-bold py-2 px-5 rounded-lg text-sm hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </header>
      <main className="flex-grow max-w-md w-full mx-auto p-4 space-y-6">
        <div className="flex flex-col items-center">
            <img src={avatar} alt="Pet avatar" className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover" />
            <button onClick={handleChangeAvatar} className="mt-4 text-orange-600 font-bold text-sm hover:underline">
                Change Photo
            </button>
        </div>
        <div className="space-y-4">
            <div>
                <label htmlFor="pet-name" className="text-sm font-semibold text-slate-600 px-1">Name</label>
                <input 
                    id="pet-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Buddy"
                    className="mt-1 w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition"
                />
            </div>
            <div>
                <label htmlFor="pet-breed" className="text-sm font-semibold text-slate-600 px-1">Breed</label>
                <input 
                    id="pet-breed"
                    type="text"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    placeholder="e.g. Golden Retriever"
                    className="mt-1 w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition"
                />
            </div>
        </div>
      </main>
    </div>
  );
};

export default NewPetScreen;
