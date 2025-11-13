import React, { useState, useEffect, useRef } from 'react';
import { Conversation, User, Message } from '../types';
import { PaperAirplaneIcon } from '../components/icons';

interface ChatScreenProps {
  conversation: Conversation;
  currentUser: User;
  onBack: () => void;
  onSendMessage: (text: string) => void;
}

const MessageBubble: React.FC<{ message: Message; isCurrentUser: boolean }> = ({ message, isCurrentUser }) => {
    return (
        <div className={`flex items-end gap-2 max-w-xs md:max-w-md ${isCurrentUser ? 'self-end flex-row-reverse' : 'self-start'}`}>
            <img 
                src={message.user.avatar} 
                alt={message.user.name} 
                className={`w-8 h-8 rounded-full flex-shrink-0 ${isCurrentUser ? 'hidden' : 'block'}`} 
            />
            <div className={`rounded-2xl px-4 py-2 ${isCurrentUser ? 'bg-orange-500 text-white rounded-br-none' : 'bg-slate-200 text-slate-800 rounded-bl-none'}`}>
                <p className="text-sm">{message.text}</p>
            </div>
        </div>
    )
}

const ChatScreen: React.FC<ChatScreenProps> = ({ conversation, currentUser, onBack, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // A small timeout allows the view to render before scrolling
    setTimeout(scrollToBottom, 100);
  }, [conversation.messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-slate-50 animate-chat-entry">
      <header className="bg-white/80 backdrop-blur-lg flex-shrink-0 z-20 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-2 text-slate-600 hover:bg-slate-100 rounded-full">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <img src={conversation.avatar} alt={conversation.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h2 className="text-lg font-bold text-slate-800">{conversation.name}</h2>
            <p className="text-xs text-slate-500">{conversation.isGroup ? `${conversation.members.length} members` : 'Direct message'}</p>
          </div>
        </div>
      </header>
      
      <main className="flex-grow p-4 space-y-4 overflow-y-auto flex flex-col max-w-2xl w-full mx-auto">
        {conversation.messages.map(message => (
            <MessageBubble key={message.id} message={message} isCurrentUser={message.user.id === currentUser.id} />
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className="flex-shrink-0 bg-white border-t border-slate-200 p-2 md:p-3">
        <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                 <div className="flex-grow flex items-center bg-slate-100 rounded-full p-1.5 focus-within:ring-2 focus-within:ring-orange-400 transition-all">
                    <input 
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full bg-transparent border-none focus:ring-0 text-slate-800 py-1.5 px-3"
                    />
                    <button 
                        type="submit" 
                        className="bg-orange-500 text-white rounded-full p-2.5 hover:bg-orange-600 disabled:opacity-50 disabled:scale-100 transition-all transform hover:scale-110 flex-shrink-0"
                        disabled={!newMessage.trim()}
                        aria-label="Send message"
                    >
                        <PaperAirplaneIcon className="w-5 h-5" />
                    </button>
                 </div>
            </form>
        </div>
      </footer>
       <style>{`
        @keyframes slide-in-from-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-chat-entry {
          animation: slide-in-from-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChatScreen;