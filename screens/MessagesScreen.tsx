import React from 'react';
import { SearchIcon, UserGroupIcon } from '../components/icons';
import { Conversation } from '../types';

interface MessagesScreenProps {
    conversations: Conversation[];
    onNewGroup: () => void;
}

const MessagesScreen: React.FC<MessagesScreenProps> = ({ conversations, onNewGroup }) => {
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">Messages</h2>
                <button onClick={onNewGroup} className="text-orange-500 font-bold text-sm">New Group</button>
            </div>
            <div className="relative mb-4">
                <input type="text" placeholder="Search messages..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-orange-500 focus:border-orange-500" />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>

            <ul className="space-y-2">
                {conversations.map(convo => (
                    <li key={convo.id} className="bg-white p-3 rounded-xl flex items-center gap-4 hover:bg-orange-50 transition-colors cursor-pointer">
                        <div className="relative">
                            <img src={convo.avatar} alt={convo.name} className="w-14 h-14 rounded-full object-cover" />
                             {convo.isGroup && (
                                <div className="absolute -bottom-1 -right-1 bg-blue-500 p-1 rounded-full border-2 border-white">
                                    <UserGroupIcon className="w-3 h-3 text-white" />
                                </div>
                            )}
                            {convo.unread > 0 && <span className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full border-2 border-white"></span>}
                        </div>
                        <div className="flex-grow">
                            <p className="font-bold text-slate-800">{convo.name}</p>
                            <p className="text-sm text-slate-500 truncate">{convo.lastMessage}</p>
                        </div>
                        <div className="text-right flex flex-col items-end h-full">
                            <span className="text-xs text-slate-400 mb-1">{convo.time}</span>
                            {convo.unread > 0 && <span className="w-6 h-6 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">{convo.unread}</span>}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MessagesScreen;