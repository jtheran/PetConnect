import React, { useState } from 'react';
import { XIcon, CameraIcon } from '../components/icons';
import { Service, ServiceType } from '../types';

interface EditServiceScreenProps {
  service: Service;
  onCancel: () => void;
  onUpdate: (service: Service) => void;
}

const EditServiceScreen: React.FC<EditServiceScreenProps> = ({ service, onCancel, onUpdate }) => {
    const [name, setName] = useState(service.name);
    const [description, setDescription] = useState(service.description);
    const [price, setPrice] = useState(service.price);
    const [type, setType] = useState<ServiceType>(service.type);
    const [address, setAddress] = useState(service.address);
    const [image, setImage] = useState<string | null>(service.image);

    const canUpdate = name.trim() !== '' && description.trim() !== '' && price.trim() !== '' && address.trim() !== '' && image !== null;

    const handleUpdate = () => {
        if (canUpdate) {
            onUpdate({ ...service, name, description, price, type, image, address });
        }
    };

    const handleImageUpload = () => {
        setImage(`https://picsum.photos/seed/service${Date.now()}/600/600`);
    };

    return (
        <div className="fixed inset-0 bg-slate-50 z-50 flex flex-col">
            <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-20 shadow-sm">
                <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
                    <button onClick={onCancel} className="p-2 text-slate-600 hover:bg-slate-100 rounded-full">
                        <XIcon className="w-7 h-7" />
                    </button>
                    <h2 className="text-xl font-bold text-slate-800">Edit Product/Service</h2>
                    <button 
                        onClick={handleUpdate}
                        disabled={!canUpdate}
                        className="bg-orange-500 text-white font-bold py-2 px-5 rounded-lg text-sm hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Save
                    </button>
                </div>
            </header>
            <main className="flex-grow max-w-md w-full mx-auto p-4 space-y-4 overflow-y-auto">
                <div 
                    onClick={handleImageUpload}
                    className="aspect-video w-full bg-slate-200 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-300 transition-colors overflow-hidden"
                >
                    {image ? (
                        <img src={image} alt="Service preview" className="w-full h-full object-cover" />
                    ) : (
                        <>
                            <CameraIcon className="w-12 h-12 mb-2" />
                            <p className="font-semibold">Tap to upload a photo</p>
                        </>
                    )}
                </div>
                
                <div className="space-y-3">
                    <input type="text" placeholder="Product or Service Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition text-slate-800" />
                    <textarea 
                        placeholder="Description" 
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition text-slate-800"
                    ></textarea>
                    <div className="flex gap-3">
                         <input type="text" placeholder="Price (e.g., $25)" value={price} onChange={(e) => setPrice(e.target.value)} className="w-1/2 p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition text-slate-800" />
                         <select 
                            value={type}
                            onChange={(e) => setType(e.target.value as ServiceType)}
                            className="w-1/2 p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition text-slate-800"
                        >
                            <option value={ServiceType.Product}>Product</option>
                            <option value={ServiceType.Service}>Service</option>
                        </select>
                    </div>
                    <input type="text" placeholder="Address / Location" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition text-slate-800" />
                </div>
            </main>
        </div>
    );
};

export default EditServiceScreen;