import React, { useState } from 'react';
import { SearchIcon, UserGroupIcon, ChatBubbleIcon, TrashIcon } from '../components/icons';
import { Conversation } from '../types';

interface MessagesScreenProps {
    conversations: Conversation[];
    onNewGroup: () => void;
    onViewConversation: (conversationId: string) => void;
    onDeleteConversation: (conversationId: string) => void;
}

const ConversationItem: React.FC<{ 
    convo: Conversation;
    onView: () => void;
    onDelete: () => void;
}> = ({ convo, onView, onDelete }) => (
    <li className="group bg-white p-3 rounded-xl flex items-center gap-4 hover:bg-orange-50 transition-colors cursor-pointer" onClick={onView}>
        <div className="relative">
            <img src={convo.avatar} alt={convo.name} className="w-14 h-14 rounded-full object-cover" />
             {convo.isGroup && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 p-1 rounded-full border-2 border-white">
                    <UserGroupIcon className="w-3 h-3 text-white" />
                </div>
            )}
            {convo.unread > 0 && <span className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full border-2 border-white"></span>}
        </div>
        <div className="flex-grow min-w-0">
            <p className="font-bold text-slate-800 truncate">{convo.name}</p>
            <p className="text-sm text-slate-500 truncate">{convo.lastMessage}</p>
        </div>
        <div className="text-right flex flex-col items-end h-full flex-shrink-0">
            <span className="text-xs text-slate-400 mb-1">{convo.time}</span>
            {convo.unread > 0 ? (
                <span className="w-6 h-6 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">{convo.unread}</span>
             ) : (
                <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    className="w-6 h-6 flex items-center justify-center text-slate-400 rounded-full hover:bg-red-100 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    aria-label={`Delete chat with ${convo.name}`}
                >
                    <TrashIcon className="w-5 h-5"/>
                </button>
            )}
        </div>
    </li>
);

const MessagesScreen: React.FC<MessagesScreenProps> = ({ conversations, onNewGroup, onViewConversation, onDeleteConversation }) => {
    const [activeTab, setActiveTab] = useState<'private' | 'groups'>('private');

    const privateMessages = conversations.filter(convo => !convo.isGroup);
    const groupMessages = conversations.filter(convo => convo.isGroup);

    const filteredConversations = activeTab === 'private' ? privateMessages : groupMessages;

    return (
        <div>
             <div className="px-4 pt-4">
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-slate-800">Mensajes</h2>
                    <button onClick={onNewGroup} className="text-orange-500 font-bold text-sm">New Group</button>
                </div>
                <div className="relative mb-4">
                    <input type="text" placeholder="Search messages..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-orange-500 focus:border-orange-500 text-slate-800" />
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
            </div>

            <div className="flex bg-slate-100 p-1 sticky top-0 z-10 max-w-md mx-auto">
                <button onClick={() => setActiveTab('private')} className={`w-1/2 py-2.5 rounded-md text-sm font-bold transition-all ${activeTab === 'private' ? 'bg-white shadow text-orange-600' : 'text-slate-600 hover:bg-slate-200'}`}>
                    Privados
                </button>
                <button onClick={() => setActiveTab('groups')} className={`w-1/2 py-2.5 rounded-md text-sm font-bold transition-all ${activeTab === 'groups' ? 'bg-white shadow text-orange-600' : 'text-slate-600 hover:bg-slate-200'}`}>
                    Grupos
                </button>
            </div>
            
            <div className="p-4">
                 {filteredConversations.length > 0 ? (
                    <ul className="space-y-2">
                        {filteredConversations.map(convo => (
                           <ConversationItem 
                                key={convo.id} 
                                convo={convo}
                                onView={() => onViewConversation(convo.id)}
                                onDelete={() => onDeleteConversation(convo.id)}
                            />
                        ))}
                    </ul>
                 ) : (
                    <div className="text-center py-12 text-slate-500">
                        <ChatBubbleIcon className="w-16 h-16 mx-auto text-slate-300 mb-2" />
                        <p className="font-semibold">No hay {activeTab === 'private' ? 'mensajes privados' : 'chats de grupo'}</p>
                        <p className="text-sm">Tus conversaciones aparecerán aquí.</p>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default MessagesScreen;