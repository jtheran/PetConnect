

import React from 'react';
import { View } from '../types';
import { HomeIcon, MapIcon, PlusCircleIcon, ChatBubbleIcon, UserCircleIcon } from './icons';

interface BottomNavProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  onOpenOptions: () => void;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center gap-1 w-16 transition-transform duration-200 ease-in-out hover:scale-110">
        <div className={`w-8 h-8 ${isActive ? 'text-orange-500' : 'text-gray-400'}`}>
            {icon}
        </div>
        <span className={`text-xs font-semibold ${isActive ? 'text-orange-600' : 'text-gray-500'}`}>{label}</span>
    </button>
);


const BottomNav: React.FC<BottomNavProps> = ({ currentView, setCurrentView, onOpenOptions }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-lg shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-30">
        <div className="max-w-md mx-auto h-full flex justify-around items-center px-2">
            <NavItem icon={<HomeIcon />} label="Home" isActive={currentView === View.Home} onClick={() => setCurrentView(View.Home)} />
            <NavItem icon={<MapIcon />} label="Map" isActive={currentView === View.Map} onClick={() => setCurrentView(View.Map)} />
            
            <button onClick={onOpenOptions} className="p-2 -translate-y-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                <PlusCircleIcon className="w-12 h-12" />
            </button>
            
            <NavItem icon={<ChatBubbleIcon />} label="Messages" isActive={currentView === View.Messages} onClick={() => setCurrentView(View.Messages)} />
            <NavItem icon={<UserCircleIcon />} label="Profile" isActive={currentView === View.Profile} onClick={() => setCurrentView(View.Profile)} />
        </div>
    </div>
  );
};

export default BottomNav;