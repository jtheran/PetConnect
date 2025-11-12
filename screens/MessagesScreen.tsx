
import React from 'react';
import { SearchIcon } from '../components/icons';

const conversations = [
    { id: 'c1', name: 'Maria & Lucy', avatar: 'https://picsum.photos/seed/user2/100/100', lastMessage: 'Haha, sounds like Lucy!', time: '10m', unread: 2 },
    { id: 'c2', name: 'Dog Lovers Group', avatar: 'https://picsum.photos/seed/group1/100/100', lastMessage: 'Who is going to the park this weekend?', time: '1h', unread: 0 },
    { id: 'c3', name: 'John Doe', avatar: 'https://picsum.photos/seed/user3/100/100', lastMessage: 'Thanks for the tip!', time: '3h', unread: 0 },
    { id: 'c4', name: 'Pet Grooming Tips', avatar: 'https://picsum.photos/seed/group2/100/100', lastMessage: 'Remember to use a soft brush.', time: '1d', unread: 5 },
];

const MessagesScreen: React.FC = () => {
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">Messages</h2>
                <button className="text-orange-500 font-bold text-sm">New Chat</button>
            </div>
            <div className="relative mb-4">
                <input type="text" placeholder="Search messages..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-orange-500 focus:border-orange-500" />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>

            <ul className="space-y-2">
                {conversations.map(convo => (
                    <li key={convo.id} className="bg-white p-3 rounded-xl flex items-center gap-4 hover:bg-orange-50 transition-colors cursor-pointer">
                        <div className="relative">
                            <img src={convo.avatar} alt={convo.name} className="w-14 h-14 rounded-full" />
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
