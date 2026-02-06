
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel,
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  isDestructive = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-fade-in" dir="rtl">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            {isDestructive && <div className="p-2 bg-red-100 rounded-full text-accent"><AlertTriangle size={24} /></div>}
            <h3 className="text-xl font-bold text-primary">{title}</h3>
          </div>
          <p className="text-slate-600 leading-relaxed">{message}</p>
        </div>
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
          <button 
            onClick={onCancel}
            className="px-4 py-2 text-slate-700 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 rounded-lg transition-all font-bold"
          >
            {cancelText}
          </button>
          <button 
            onClick={onConfirm}
            className={`px-6 py-2 text-white rounded-lg transition-all font-bold shadow-lg transform active:scale-95 ${
              isDestructive 
                ? 'bg-accent hover:bg-red-700 shadow-red-600/20' 
                : 'bg-accent hover:bg-red-700 shadow-red-600/20'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
