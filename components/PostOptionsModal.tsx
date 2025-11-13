import React from 'react';
import { CameraIcon, DocumentReportIcon, XIcon, UserGroupIcon, UserPlusIcon, StorefrontIcon } from './icons';

interface PostOptionsModalProps {
  onClose: () => void;
  onNewPost: () => void;
  onNewReport: () => void;
  onNewGroup: () => void;
  onNewPet: () => void;
  onNewService: () => void;
}

const OptionButton: React.FC<{
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  iconBgColor: string;
  iconTextColor: string;
}> = ({ onClick, icon, label, iconBgColor, iconTextColor }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-4 w-full p-3 bg-white rounded-xl shadow-sm hover:shadow-md hover:scale-[1.03] transition-all"
  >
    <div className={`w-12 h-12 ${iconBgColor} ${iconTextColor} rounded-full flex items-center justify-center`}>
      {icon}
    </div>
    <span className="font-semibold text-slate-700 text-lg">{label}</span>
  </button>
);

const PostOptionsModal: React.FC<PostOptionsModalProps> = ({ onClose, onNewPost, onNewReport, onNewGroup, onNewPet, onNewService }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative w-full bg-slate-50 rounded-t-2xl shadow-xl p-4 animate-modal-entry
                      md:max-w-md md:rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-800">Create</h3>
          <button onClick={onClose} className="p-2 text-slate-500 hover:bg-slate-200 rounded-full">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-3">
            <OptionButton
                onClick={onNewPost}
                icon={<CameraIcon className="w-7 h-7" />}
                label="New Post"
                iconBgColor="bg-orange-100"
                iconTextColor="text-orange-500"
            />
            <OptionButton
                onClick={onNewPet}
                icon={<UserPlusIcon className="w-7 h-7" />}
                label="Add Pet"
                iconBgColor="bg-green-100"
                iconTextColor="text-green-500"
            />
            <OptionButton
                onClick={onNewService}
                icon={<StorefrontIcon className="w-7 h-7" />}
                label="Sell Product/Service"
                iconBgColor="bg-cyan-100"
                iconTextColor="text-cyan-500"
            />
            <OptionButton
                onClick={onNewReport}
                icon={<DocumentReportIcon className="w-7 h-7" />}
                label="New Report"
                iconBgColor="bg-blue-100"
                iconTextColor="text-blue-500"
            />
             <OptionButton
                onClick={onNewGroup}
                icon={<UserGroupIcon className="w-7 h-7" />}
                label="New Group"
                iconBgColor="bg-purple-100"
                iconTextColor="text-purple-500"
            />
        </div>
      </div>
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-modal-entry {
          animation: slide-up 0.3s ease-out;
        }

        @media (min-width: 768px) {
          .animate-modal-entry {
            animation: fade-in-scale 0.2s ease-out;
          }
        }
      `}</style>
    </div>
  );
};

export default PostOptionsModal;