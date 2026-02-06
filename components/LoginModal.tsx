
import React, { useState } from 'react';
import { X, Lock, KeyRound } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (password: string) => boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(password)) {
      setPassword('');
      setError('');
      onClose();
    } else {
      setError('كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" dir="rtl">
        <div className="bg-primary p-6 text-center">
           <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-accent">
             <KeyRound className="text-accent w-8 h-8" />
           </div>
           <h3 className="text-xl font-bold text-white">تسجيل دخول المسؤول</h3>
           <p className="text-slate-400 text-sm mt-2">أدخل كلمة المرور للوصول إلى لوحة التحكم</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-6 relative">
            <Lock className="absolute top-3 right-3 text-slate-400 w-5 h-5" />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="كلمة المرور"
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
              autoFocus
            />
            {error && <p className="text-accent text-sm mt-2 font-semibold">{error}</p>}
          </div>

          <div className="flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 text-slate-600 rounded-lg hover:bg-gray-50 transition-colors font-bold"
            >
              إلغاء
            </button>
            <button 
              type="submit"
              className="flex-1 py-3 bg-accent text-white rounded-lg hover:bg-red-700 transition-colors font-bold shadow-lg shadow-red-600/20"
            >
              دخول
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
