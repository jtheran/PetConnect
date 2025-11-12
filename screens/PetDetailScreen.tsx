import React from 'react';
import { Pet } from '../types';
import { XIcon } from '../components/icons';

interface PetDetailScreenProps {
  pet: Pet;
  onBack: () => void;
}

const PetDetailScreen: React.FC<PetDetailScreenProps> = ({ pet, onBack }) => {
  return (
    <div className="w-full h-full flex flex-col bg-slate-50">
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-20 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={onBack} className="p-2 text-slate-600 hover:bg-slate-100 rounded-full">
            <XIcon className="w-7 h-7" />
          </button>
          <h2 className="text-xl font-bold text-slate-800">Pet Profile</h2>
          {/* A spacer to keep title centered */}
          <div className="w-9 h-9"></div> 
        </div>
      </header>

      <main className="flex-grow max-w-md w-full mx-auto p-4 space-y-6">
        <div className="flex flex-col items-center text-center">
          <img 
            src={pet.avatar} 
            alt={pet.name} 
            className="w-32 h-32 rounded-full border-4 border-orange-300 shadow-xl object-cover" 
          />
          <h1 className="text-3xl font-extrabold text-slate-800 mt-4">{pet.name}</h1>
          <p className="text-lg text-slate-500 font-semibold">{pet.breed}</p>
        </div>

        {pet.bio && (
          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <h3 className="text-md font-bold text-slate-700 mb-2">About {pet.name}</h3>
            <p className="text-slate-600 leading-relaxed">{pet.bio}</p>
          </div>
        )}
        
        {!pet.bio && (
            <div className="bg-white p-5 rounded-2xl shadow-sm text-center">
                 <p className="text-slate-500 italic">This pet doesn't have a bio yet.</p>
            </div>
        )}
      </main>
    </div>
  );
};

export default PetDetailScreen;
