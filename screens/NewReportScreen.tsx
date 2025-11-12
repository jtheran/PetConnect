import React, { useState } from 'react';
import { XIcon, CameraIcon } from '../components/icons';
import { ReportStatus } from '../types';

interface NewReportScreenProps {
  onClose: () => void;
}

const NewReportScreen: React.FC<NewReportScreenProps> = ({ onClose }) => {
  const [reportType, setReportType] = useState<ReportStatus>('Lost');

  return (
    <div className="fixed inset-0 bg-slate-50 z-50 flex flex-col">
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-20 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={onClose} className="p-2 text-slate-600 hover:bg-slate-100 rounded-full">
            <XIcon className="w-7 h-7" />
          </button>
          <h2 className="text-xl font-bold text-slate-800">New Report</h2>
          <button className="bg-orange-500 text-white font-bold py-2 px-5 rounded-lg text-sm hover:bg-orange-600 transition-colors">
            Submit
          </button>
        </div>
      </header>
      <main className="flex-grow max-w-md w-full mx-auto p-4 space-y-4 overflow-y-auto">
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
                    <input type="text" placeholder="Pet's Name" className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition" />
                    <input type="text" placeholder="Breed" className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition" />
                     <textarea 
                        placeholder="Adoption Story (tell us about the pet)..." 
                        rows={3}
                        className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition"
                    ></textarea>
                     <input type="text" placeholder="Contact Info (Email or Phone)" className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition" />
                </>
            ) : (
                <>
                    <input type="text" placeholder="Pet's Name (if known)" className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition" />
                    <input type="text" placeholder="Breed" className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition" />
                    <input type="text" placeholder={reportType === 'Lost' ? 'Last Seen Location' : 'Location Found'} className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition" />
                    <input type="date" className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition text-slate-500" />
                    <textarea 
                        placeholder="Additional details (colors, collar, etc.)..." 
                        rows={3}
                        className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition"
                    ></textarea>
                </>
            )}
        </div>
      </main>
    </div>
  );
};

export default NewReportScreen;