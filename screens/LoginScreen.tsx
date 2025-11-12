import React from 'react';
import { PawPrintIcon } from '../components/icons';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-sm mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center">
        <PawPrintIcon className="w-20 h-20 mb-4 inline-block" />
        <h1 className="text-4xl font-extrabold text-orange-600 drop-shadow-sm">PetConnect</h1>
        <p className="text-slate-600 mt-2 mb-8">The social network for your best friend.</p>

        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="space-y-4">
            <input type="email" placeholder="Email" className="w-full bg-slate-100 border-2 border-transparent focus:border-orange-400 focus:bg-white focus:ring-0 transition-all text-slate-800 py-3 px-4 rounded-xl" />
            <input type="password" placeholder="Password" className="w-full bg-slate-100 border-2 border-transparent focus:border-orange-400 focus:bg-white focus:ring-0 transition-all text-slate-800 py-3 px-4 rounded-xl" />
          </div>
          <button type="submit" className="mt-6 w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30">
            Login
          </button>
        </form>

        <div className="my-6 flex items-center">
          <hr className="flex-grow border-t border-slate-300" />
          <span className="mx-4 text-slate-500 font-semibold text-sm">OR</span>
          <hr className="flex-grow border-t border-slate-300" />
        </div>
        
        <div className="flex flex-col items-center">
            <p className="text-slate-600 text-sm font-semibold mb-3">Continue with</p>
            <div className="flex justify-center gap-4">
                <button onClick={onLogin} aria-label="Sign in with Google" className="w-14 h-14 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm">
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-7 h-7" />
                </button>
                <button onClick={onLogin} aria-label="Sign in with Microsoft" className="w-14 h-14 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm">
                    <img src="https://www.microsoft.com/favicon.ico" alt="Microsoft" className="w-7 h-7" />
                </button>
                <button onClick={onLogin} aria-label="Sign in with Apple" className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all shadow-sm">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 16 16"><path d="M8.051 1.636a.5.5 0 0 1 .438.223l.06.113c.09.17.16.355.21.554.05.198.077.406.077.625 0 .22-.027.428-.08.626a1.68 1.68 0 0 0-.21.553l-.06.113a.5.5 0 0 1-.438.223h-1.33a.5.5 0 0 0-.498.437 4.93 4.93 0 0 0-.001 2.228.5.5 0 0 0 .498.437h1.33a.5.5 0 0 1 .438.223l.06.113a1.68 1.68 0 0 0 .21.553c.05.2.078.407.078.626 0 .218-.028.426-.08.625a1.68 1.68 0 0 0-.21.554l-.06.113a.5.5 0 0 1-.438.223A3.94 3.94 0 0 1 4.14 9.138a4.13 4.13 0 0 1 0-2.276A3.94 3.94 0 0 1 8.05 1.636z"/><path d="M12.25 6.32a.5.5 0 0 1 .438.223l.05.093c.105.19.18.399.228.625a2.53 2.53 0 0 1 0 1.478c-.048.226-.123.435-.228.625l-.05.093a.5.5 0 0 1-.438.223A2.88 2.88 0 0 1 9.492 8a2.88 2.88 0 0 1 2.758-1.68z"/></svg>
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default LoginScreen;
