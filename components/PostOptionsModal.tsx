import React from 'react';
import { CameraIcon, DocumentReportIcon, XIcon } from './icons';

interface PostOptionsModalProps {
  onClose: () => void;
  onNewPost: () => void;
  onNewReport: () => void;
}

const PostOptionsModal: React.FC<PostOptionsModalProps> = ({ onClose, onNewPost, onNewReport }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative w-full bg-slate-50 rounded-t-2xl shadow-xl p-4 animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-800">Create</h3>
          <button onClick={onClose} className="p-2 text-slate-500 hover:bg-slate-200 rounded-full">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onNewPost}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all"
          >
            <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center">
              <CameraIcon className="w-7 h-7" />
            </div>
            <span className="font-semibold text-slate-700">New Post</span>
          </button>
          <button
            onClick={onNewReport}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all"
          >
            <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center">
              <DocumentReportIcon className="w-7 h-7" />
            </div>
            <span className="font-semibold text-slate-700">New Report</span>
          </button>
        </div>
      </div>
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default PostOptionsModal;
