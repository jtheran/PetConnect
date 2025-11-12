import React, { useState, useRef, useEffect } from 'react';
import { User } from '../types';
import { XIcon, CameraIcon } from '../components/icons';

interface EditProfileScreenProps {
  user: User;
  onUpdate: (name: string, avatar: string) => void;
  onCancel: () => void;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ user, onUpdate, onCancel }) => {
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleSave = () => {
    onUpdate(name, avatar);
  };

  const handleChangeAvatar = () => {
    // Simulate changing avatar
    setAvatar(`https://picsum.photos/seed/user${Date.now()}/200/200`);
  };

  const openCamera = async () => {
    // Make sure to stop any existing stream before starting a new one
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setStream(mediaStream);
      setIsCameraOpen(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Could not access the camera. Please check permissions.");
    }
  };

  const closeCamera = () => {
    // The useEffect cleanup hook will handle stopping the stream tracks.
    // We just need to nullify the stream state here.
    setStream(null);
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setAvatar(dataUrl);
        closeCamera();
      }
    }
  };

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }

    // Cleanup effect: This function will be called when the component unmounts
    // or when the stream state changes. It ensures the camera is turned off.
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="w-full h-full flex flex-col bg-slate-50">
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-20 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={onCancel} className="p-2 text-slate-600 hover:bg-slate-100 rounded-full">
            <XIcon className="w-7 h-7" />
          </button>
          <h2 className="text-xl font-bold text-slate-800">Edit Profile</h2>
          <button 
            onClick={handleSave}
            className="bg-orange-500 text-white font-bold py-2 px-5 rounded-lg text-sm hover:bg-orange-600 transition-colors"
          >
            Save
          </button>
        </div>
      </header>
      <main className="flex-grow max-w-md w-full mx-auto p-4 space-y-6">
        <div className="flex flex-col items-center">
            <img src={avatar} alt="User avatar" className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover" />
            <div className="flex items-center gap-4 mt-4">
                <button onClick={handleChangeAvatar} className="text-orange-600 font-bold text-sm hover:underline">
                    Change Photo
                </button>
                <button onClick={openCamera} className="text-orange-600 font-bold text-sm hover:underline flex items-center gap-1.5">
                    <CameraIcon className="w-5 h-5" />
                    Take Photo
                </button>
            </div>
        </div>
        <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-slate-600 px-1">Name</label>
            <input 
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition"
            />
        </div>
      </main>
      
      {isCameraOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
          <canvas ref={canvasRef} className="hidden"></canvas>
          <button onClick={closeCamera} className="absolute top-6 right-4 p-2 text-white/80 hover:text-white z-10 bg-black/30 rounded-full">
            <XIcon className="w-8 h-8" />
          </button>
          <div className="absolute bottom-10 z-10">
            <button
                onClick={capturePhoto}
                aria-label="Capture photo"
                className="w-20 h-20 rounded-full border-4 border-white/50 bg-white/30 transition-colors hover:bg-white/50"
            ></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfileScreen;