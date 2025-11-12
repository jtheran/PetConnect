

import React, { useState } from 'react';
import { Report, ReportStatus } from '../types';

const mockReports: Report[] = [
    { id: 'lf1', petName: 'Charlie', status: 'Lost', location: 'Downtown Park', date: 'Oct 28, 2023', image: 'https://picsum.photos/seed/charlie/200/200', breed: 'Beagle' },
    { id: 'lf2', petName: 'Unknown', status: 'Found', location: 'Near Maple St.', date: 'Oct 27, 2023', image: 'https://picsum.photos/seed/found1/200/200', breed: 'Labrador Mix' },
    { id: 'ad1', petName: 'Whiskers', status: 'Adoption', location: 'City Shelter', date: 'Ready Now', image: 'https://picsum.photos/seed/whiskers/200/200', breed: 'Tabby Cat', description: 'A friendly and playful cat looking for a forever home. Loves sunny spots and chasing strings.' },
    { id: 'lf3', petName: 'Bella', status: 'Lost', location: 'Oakwood Forest', date: 'Oct 25, 2023', image: 'https://picsum.photos/seed/bella/200/200', breed: 'Husky' },
    { id: 'ad2', petName: 'Rocky', status: 'Adoption', location: 'Private Foster', date: 'Ready Now', image: 'https://picsum.photos/seed/rocky/200/200', breed: 'Boxer Mix', description: 'Energetic and loving dog, great with kids and other pets. Fully house-trained.' },
];

const ReportCard: React.FC<{ report: Report }> = ({ report }) => {
    const getStatusStyles = () => {
        switch (report.status) {
            case 'Lost': return 'bg-red-100 text-red-700';
            case 'Found': return 'bg-green-100 text-green-700';
            case 'Adoption': return 'bg-purple-100 text-purple-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex gap-4 p-3">
            <img src={report.image} alt={report.petName} className="w-28 h-28 object-cover rounded-xl flex-shrink-0" />
            <div className="flex flex-col flex-grow">
                <span className={`px-3 py-1 text-xs font-bold rounded-full self-start ${getStatusStyles()}`}>
                    {report.status}
                </span>
                <h3 className="text-lg font-bold text-slate-800 mt-1">{report.petName}</h3>
                <p className="text-sm text-slate-600 font-semibold">{report.breed}</p>
                 {report.description && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{report.description}</p>}
                <p className="text-xs text-slate-400 mt-auto pt-1">{report.location} - {report.date}</p>
            </div>
        </div>
    );
}

interface ReportsScreenProps {
  onNewReport: () => void;
}

const ReportsScreen: React.FC<ReportsScreenProps> = ({ onNewReport }) => {
    const [activeTab, setActiveTab] = useState<ReportStatus>('Lost');

    const filteredReports = mockReports.filter(r => r.status === activeTab);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">Community Reports</h2>
                <button onClick={onNewReport} className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-orange-600 transition-colors">New Report</button>
            </div>
            
            <div className="flex bg-slate-200 rounded-lg p-1 mb-4">
                <button onClick={() => setActiveTab('Lost')} className={`w-1/3 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'Lost' ? 'bg-white shadow text-orange-600' : 'text-slate-600'}`}>
                    Lost
                </button>
                <button onClick={() => setActiveTab('Found')} className={`w-1/3 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'Found' ? 'bg-white shadow text-orange-600' : 'text-slate-600'}`}>
                    Found
                </button>
                <button onClick={() => setActiveTab('Adoption')} className={`w-1/3 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'Adoption' ? 'bg-white shadow text-orange-600' : 'text-slate-600'}`}>
                    Adoption
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

export default ReportsScreen;