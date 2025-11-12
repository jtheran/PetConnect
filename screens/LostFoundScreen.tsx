

import React, { useState } from 'react';

type ReportStatus = 'Lost' | 'Found';

interface LostFoundReport {
    id: string;
    petName: string;
    status: ReportStatus;
    location: string;
    date: string;
    image: string;
    breed: string;
}

const mockReports: LostFoundReport[] = [
    { id: 'lf1', petName: 'Charlie', status: 'Lost', location: 'Downtown Park', date: 'Oct 28, 2023', image: 'https://picsum.photos/seed/charlie/200/200', breed: 'Beagle' },
    { id: 'lf2', petName: 'Unknown', status: 'Found', location: 'Near Maple St.', date: 'Oct 27, 2023', image: 'https://picsum.photos/seed/found1/200/200', breed: 'Labrador Mix' },
    { id: 'lf3', petName: 'Bella', status: 'Lost', location: 'Oakwood Forest', date: 'Oct 25, 2023', image: 'https://picsum.photos/seed/bella/200/200', breed: 'Husky' },
];

const ReportCard: React.FC<{ report: LostFoundReport }> = ({ report }) => {
    const isLost = report.status === 'Lost';
    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex gap-4 p-3">
            <img src={report.image} alt={report.petName} className="w-28 h-28 object-cover rounded-xl" />
            <div className="flex flex-col">
                <span className={`px-3 py-1 text-xs font-bold rounded-full self-start ${isLost ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {report.status}
                </span>
                <h3 className="text-lg font-bold text-slate-800 mt-1">{report.petName}</h3>
                <p className="text-sm text-slate-600">{report.breed}</p>
                <p className="text-xs text-slate-400 mt-auto">{report.location} - {report.date}</p>
            </div>
        </div>
    );
}

interface LostFoundScreenProps {
  onNewReport: () => void;
}

const LostFoundScreen: React.FC<LostFoundScreenProps> = ({ onNewReport }) => {
    const [activeTab, setActiveTab] = useState<ReportStatus>('Lost');

    const filteredReports = mockReports.filter(r => r.status === activeTab);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">Lost & Found</h2>
                <button onClick={onNewReport} className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-orange-600 transition-colors">New Report</button>
            </div>
            
            <div className="flex bg-slate-200 rounded-lg p-1 mb-4">
                <button onClick={() => setActiveTab('Lost')} className={`w-1/2 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'Lost' ? 'bg-white shadow text-orange-600' : 'text-slate-600'}`}>
                    Lost Pets
                </button>
                <button onClick={() => setActiveTab('Found')} className={`w-1/2 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'Found' ? 'bg-white shadow text-orange-600' : 'text-slate-600'}`}>
                    Found Pets
                </button>
            </div>

            <div className="space-y-4">
                {filteredReports.length > 0 ? (
                    filteredReports.map(report => <ReportCard key={report.id} report={report} />)
                ) : (
                    <p className="text-center text-slate-500 pt-8">No {activeTab.toLowerCase()} pets reported here.</p>
                )}
            </div>
        </div>
    );
};

export default LostFoundScreen;