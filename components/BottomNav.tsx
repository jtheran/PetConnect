import React from 'react';
import { View } from '../types';
import { HomeIcon, PlusCircleIcon, ChatBubbleIcon, UserCircleIcon, MapIcon, PawPrintIcon } from './icons';

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
    <button 
      onClick={onClick} 
      className={`flex flex-col items-center gap-1 w-16 transition-all duration-200 ease-in-out hover:scale-110 
                 md:flex-row md:w-full md:gap-3 md:hover:bg-slate-100 md:rounded-lg md:p-3 md:items-center md:scale-100 md:hover:scale-100
                 lg:justify-start
                 ${isActive ? 'md:bg-orange-50' : ''}`}
    >
        <div className={`w-8 h-8 md:w-7 md:h-7 ${isActive ? 'text-orange-500' : 'text-gray-400'}`}>
            {icon}
        </div>
        <span className={`text-xs font-semibold 
                       md:text-base md:font-bold md:hidden lg:inline 
                       ${isActive ? 'text-orange-600' : 'text-gray-500 md:text-slate-700'}`}>
            {label}
        </span>
    </button>
);


const BottomNav: React.FC<BottomNavProps> = ({ currentView, setCurrentView, onOpenOptions }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-lg shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-30
                    md:sticky md:top-0 md:h-screen md:w-20 md:shadow-lg md:bg-white md:backdrop-blur-none
                    lg:w-64 transition-all duration-300 ease-in-out">
        <div className="max-w-md mx-auto h-full flex justify-around items-center px-2
                        md:flex-col md:justify-start md:h-auto md:py-6 md:px-2 md:gap-4
                        lg:items-start lg:px-4">
            
            <div className="hidden md:flex items-center gap-2 mb-6 lg:pl-2">
                <PawPrintIcon className="w-10 h-10" />
                <h1 className="text-2xl font-extrabold text-orange-500 hidden lg:block">PetConnect</h1>
            </div>

            <NavItem icon={<HomeIcon />} label="Home" isActive={currentView === View.Home} onClick={() => setCurrentView(View.Home)} />
            <NavItem icon={<MapIcon />} label="Map" isActive={currentView === View.Map} onClick={() => setCurrentView(View.Map)} />
            
            <button 
              onClick={onOpenOptions} 
              className="p-2 -translate-y-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110
                         md:translate-y-0 md:w-full md:order-last md:mt-auto md:flex md:items-center md:justify-center md:gap-3 md:py-3 md:rounded-lg md:scale-100 md:hover:scale-100"
            >
                <PlusCircleIcon className="w-12 h-12 md:w-7 md:h-7" />
                <span className="hidden lg:inline text-base font-bold">Create</span>
            </button>
            
            <NavItem icon={<ChatBubbleIcon />} label="Messages" isActive={currentView === View.Messages} onClick={() => setCurrentView(View.Messages)} />
            <NavItem icon={<UserCircleIcon />} label="Profile" isActive={currentView === View.Profile} onClick={() => setCurrentView(View.Profile)} />
        </div>
    </nav>
  );
};

export default BottomNav;
