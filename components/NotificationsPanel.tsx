import React from 'react';
import { Notification, NotificationType } from '../types';
import { ChatBubbleIcon, SearchIcon, HeartIcon, UserPlusIcon, UserGroupIcon, CheckIcon, XIcon } from './icons';

interface NotificationsPanelProps {
    notifications: Notification[];
    onClose: () => void;
    onAcceptInvite: (notificationId: string, groupId?: string) => void;
    onRejectInvite: (notificationId: string) => void;
}

const NotificationIcon: React.FC<{ type: NotificationType }> = ({ type }) => {
    const baseClasses = "w-6 h-6";
    switch(type) {
        case NotificationType.NewMessage:
            return <ChatBubbleIcon className={`${baseClasses} text-blue-500`} />;
        case NotificationType.LostPetUpdate:
            return <SearchIcon className={`${baseClasses} text-yellow-600`} />;
        case NotificationType.PostLike:
            return <HeartIcon className={`${baseClasses} text-red-500`} />;
        case NotificationType.NewFollower:
            return <UserPlusIcon className={`${baseClasses} text-green-500`} />;
        case NotificationType.GroupInvite:
            return <UserGroupIcon className={`${baseClasses} text-purple-500`} />;
        default:
            return null;
    }
}

const timeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
};

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ notifications, onClose, onAcceptInvite, onRejectInvite }) => {
    return (
        <>
            <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose}></div>
            <div className="absolute top-16 right-0 left-0 max-w-md mx-auto z-50 px-4">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                    <div className="p-4 border-b border-slate-200">
                        <h3 className="font-bold text-slate-800 text-lg">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                            <ul>
                                {notifications.map(notification => (
                                    <li key={notification.id} className={`p-4 ${!notification.isRead ? 'bg-orange-50/50' : 'bg-white'} hover:bg-slate-50 transition-colors border-b border-slate-100`}>
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                                                <NotificationIcon type={notification.type} />
                                            </div>
                                            <div className="flex-grow">
                                                <p className="text-sm text-slate-700">{notification.text}</p>
                                                <span className="text-xs text-slate-400 font-semibold">{timeAgo(notification.timestamp)}</span>
                                            </div>
                                        </div>
                                        {notification.type === NotificationType.GroupInvite && (
                                            <div className="mt-3 flex justify-end gap-2">
                                                <button onClick={() => onRejectInvite(notification.id)} className="flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-600 font-bold py-1.5 px-3 rounded-lg text-xs transition-colors border border-slate-300">
                                                    <XIcon className="w-4 h-4" />
                                                    <span>Decline</span>
                                                </button>
                                                <button onClick={() => onAcceptInvite(notification.id, notification.groupId)} className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white font-bold py-1.5 px-3 rounded-lg text-xs transition-colors">
                                                    <CheckIcon className="w-4 h-4" />
                                                    <span>Accept</span>
                                                </button>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center p-8 text-slate-500">
                                <p>You have no notifications yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotificationsPanel;