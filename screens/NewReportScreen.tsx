import React, { useState } from 'react';
import { XIcon, CameraIcon } from '../components/icons';
import { ReportStatus } from '../types';

interface NewReportScreenProps {
  onClose: () => void;
}

const NewReportScreen: React.FC<NewReportScreenProps> = ({ onClose }) => {
  const [reportType, setReportType] = useState<ReportStatus>('Lost');

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center p-0 md:p-4">
       <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
       <div className="relative w-full bg-slate-50 rounded-t-2xl flex flex-col h-[90vh]
                      md:max-w-lg md:h-auto md:max-h-[90vh] md:rounded-2xl md:shadow-xl animate-modal-entry">
      <header className="flex-shrink-0 bg-white/80 backdrop-blur-lg z-10 shadow-sm p-3 flex items-center justify-between md:rounded-t-2xl">
          <button onClick={onClose} className="p-2 text-slate-600 hover:bg-slate-100 rounded-full">
            <XIcon className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-bold text-slate-800">New Report</h2>
          <button className="bg-orange-500 text-white font-bold py-1.5 px-4 rounded-lg text-sm hover:bg-orange-600 transition-colors">
            Submit
          </button>
        </header>
        <main className="flex-grow overflow-y-auto p-4 space-y-4">
        <div className="flex bg-slate-200 rounded-lg p-1">
            <button onClick={() => setReportType('Lost')} className={`w-1/3 py-2 rounded-md text-sm font-semibold transition-colors ${reportType === 'Lost' ? 'bg-white shadow text-orange-600' : 'text-slate-600'}`}>
                Lost
            </button>
            <button onClick={() => setReportType('Found')} className={`w-1/3 py-2 rounded-md text-sm font-semibold transition-colors ${reportType === 'Found' ? 'bg-white shadow text-orange-600' : 'text-slate-600'}`}>
                Found
            </button>
            <button onClick={() => setReportType('Adoption')} className={`w-1/3 py-2 rounded-md text-sm font-semibold transition-colors ${reportType === 'Adoption' ? 'bg-white shadow text-orange-600' : 'text-slate-600'}`}>
                Adoption
            </button>
        </div>

        <div className="aspect-square w-full bg-slate-200 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-300 transition-colors">
            <CameraIcon className="w-12 h-12 mb-2" />
            <p className="font-semibold">Upload photo of pet</p>
        </div>

        <div className="space-y-3">
            {reportType === 'Adoption' ? (
                <>
                    <input type="text" placeholder="Pet's Name" className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition text-slate-800" />
                    <input type="text" placeholder="Breed" className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition text-slate-800" />
                     <textarea 
                        placeholder="Adoption Story (tell us about the pet)..." 
                        rows={3}
                        className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition text-slate-800"
                    ></textarea>
                     <input type="text" placeholder="Contact Info (Email or Phone)" className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition text-slate-800" />
                </>
            ) : (
                <>
                    <input type="text" placeholder="Pet's Name (if known)" className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition text-slate-800" />
                    <input type="text" placeholder="Breed" className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition text-slate-800" />
                    <input type="text" placeholder={reportType === 'Lost' ? 'Last Seen Location' : 'Location Found'} className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition text-slate-800" />
                    <input type="date" className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition text-slate-800" />
                    <textarea 
                        placeholder="Additional details (colors, collar, etc.)..." 
                        rows={3}
                        className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition text-slate-800"
                    ></textarea>
                </>
            )}
        </div>
      </main>
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

export default NewReportScreen;