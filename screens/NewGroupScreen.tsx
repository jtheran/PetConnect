import React, { useState } from 'react';
import { User } from '../types';
import { XIcon, UserGroupIcon, CheckIcon } from '../components/icons';

interface NewGroupScreenProps {
  users: User[];
  onCancel: () => void;
  onCreate: (name: string, avatar: string, memberIds: string[]) => void;
}

const NewGroupScreen: React.FC<NewGroupScreenProps> = ({ users, onCancel, onCreate }) => {
  const [groupName, setGroupName] = useState('');
  const [groupAvatar, setGroupAvatar] = useState(`https://picsum.photos/seed/group${Date.now()}/200/200`);
  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(new Set());

  const handleToggleUser = (userId: string) => {
    setSelectedUserIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };
  
  const canCreate = groupName.trim() !== '' && selectedUserIds.size > 0;

  const handleCreate = () => {
    if (canCreate) {
      onCreate(groupName, groupAvatar, Array.from(selectedUserIds));
    }
  };
  
  const handleChangeAvatar = () => {
    setGroupAvatar(`https://picsum.photos/seed/group${Date.now()}/200/200`);
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-50">
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-20 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={onCancel} className="p-2 text-slate-600 hover:bg-slate-100 rounded-full">
            <XIcon className="w-7 h-7" />
          </button>
          <h2 className="text-xl font-bold text-slate-800">New Group</h2>
          <button 
            onClick={handleCreate}
            disabled={!canCreate}
            className="bg-orange-500 text-white font-bold py-2 px-5 rounded-lg text-sm hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create
          </button>
        </div>
      </header>
      <main className="flex-grow max-w-md w-full mx-auto p-4 flex flex-col">
        <div className="flex flex-col items-center p-4">
            <img src={groupAvatar} alt="Group avatar" className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover" />
            <button onClick={handleChangeAvatar} className="mt-3 text-orange-600 font-bold text-sm hover:underline">
                Change Photo
            </button>
        </div>

        <input 
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full p-3 mb-4 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition"
        />

        <h3 className="font-bold text-slate-700 mb-2 px-1">Invite Members</h3>
        <div className="flex-grow bg-white rounded-xl border border-slate-200 overflow-y-auto">
            <ul className="divide-y divide-slate-100">
                {users.map(user => {
                    const isSelected = selectedUserIds.has(user.id);
                    return (
                        <li 
                            key={user.id} 
                            onClick={() => handleToggleUser(user.id)}
                            className="flex items-center gap-4 p-3 cursor-pointer hover:bg-orange-50 transition-colors"
                        >
                            <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                            <span className="flex-grow font-semibold text-slate-800">{user.name}</span>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'bg-orange-500 border-orange-500' : 'border-slate-300'}`}>
                                {isSelected && <CheckIcon className="w-4 h-4 text-white" />}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
      </main>
    </div>
  );
};

export default NewGroupScreen;