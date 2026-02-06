
import React from 'react';
import { X, Dumbbell, Flame, Trophy, Activity, Clock, Zap, Target, HeartPulse, Edit2, PlusCircle, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProgramItem, SectionKey } from '../types';

interface ProgramsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  programs: ProgramItem[];
  onEdit: (section: SectionKey, item: any, index: number) => void;
  onAdd: (section: SectionKey) => void;
  onDelete: (section: SectionKey, index: number) => void;
}

const ProgramCard: React.FC<{
  program: ProgramItem;
  index: number;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ program, index, isEditing, onEdit, onDelete }) => {
  const getIcon = (name: string) => {
    const icons: any = { Flame, Target, Trophy, Dumbbell };
    return icons[name] || Dumbbell;
  };
  
  const Icon = getIcon(program.icon);

  // Construct phase objects from flat structure
  const phases = [
    {
      title: program.phase1Title,
      duration: program.phase1Duration,
      details: program.phase1Details,
      theme: program.phase1Theme
    },
    {
      title: program.phase2Title,
      duration: program.phase2Duration,
      details: program.phase2Details,
      theme: program.phase2Theme
    }
  ];

  return (
    <div className="mb-12 last:mb-0 relative group">
      {isEditing && (
        <div className="absolute top-0 left-0 z-20 flex gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(); }} 
            className="p-2 bg-accent text-white rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(); }} 
            className="p-2 bg-accent text-white rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}

      <div className="flex items-center gap-3 mb-6 justify-center">
        <div className="p-3 rounded-full bg-slate-800 text-accent border border-slate-700">
          <Icon size={32} />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white text-center border-b-2 border-accent pb-2">
          {program.title}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {phases.map((phase, idx) => (
          <div 
            key={idx} 
            className={`relative rounded-3xl overflow-hidden shadow-xl border-2 ${
              phase.theme === 'blue' ? 'border-blue-900 bg-slate-900' : 'border-red-900 bg-slate-900'
            }`}
          >
            {/* Header */}
            <div className={`p-4 text-center ${
              phase.theme === 'blue' 
                ? 'bg-gradient-to-r from-blue-900 to-slate-900 text-blue-100' 
                : 'bg-gradient-to-r from-red-900 to-slate-900 text-red-100'
            }`}>
              <h3 className="text-xl font-bold mb-1">{phase.title}</h3>
              <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-mono opacity-90">
                <Clock size={14} />
                <span>{phase.duration}</span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <ul className="space-y-3">
                {phase.details && phase.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm md:text-lg font-bold text-slate-300 leading-relaxed">
                    <div className={`mt-2 w-2 h-2 rounded-full shrink-0 ${
                      phase.theme === 'blue' ? 'bg-blue-500' : 'bg-red-500'
                    }`} />
                    <span dangerouslySetInnerHTML={{ __html: detail }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProgramsModal: React.FC<ProgramsModalProps> = ({ 
  isOpen, onClose, isEditing, programs, onEdit, onAdd, onDelete 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/70 backdrop-blur-sm">
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-3xl h-full bg-slate-950 text-white overflow-y-auto shadow-2xl relative scrollbar-hide border-l border-white/10"
        dir="rtl"
      >
        <button 
          onClick={onClose}
          className="fixed top-4 left-4 z-50 p-2 bg-accent rounded-full hover:bg-red-700 transition-colors shadow-lg"
        >
          <X size={24} />
        </button>

        <div className="p-6 md:p-10 pb-20">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-black mb-2 bg-gradient-to-r from-accent to-orange-500 bg-clip-text text-transparent">
              برامجنا التدريبية
            </h1>
            <p className="text-slate-400 text-lg">خطط مصممة علمياً للوصول بك إلى القمة</p>
          </div>

          <div className="space-y-16">
            {programs.map((program, idx) => (
              <ProgramCard 
                key={program.id} 
                index={idx}
                program={program}
                isEditing={isEditing}
                onEdit={() => onEdit('trainingPrograms', program, idx)}
                onDelete={() => onDelete('trainingPrograms', idx)}
              />
            ))}
            
            {isEditing && (
              <button 
                onClick={() => onAdd('trainingPrograms')}
                className="w-full py-6 border-4 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-500 hover:text-accent hover:border-accent hover:bg-slate-900 transition-all group"
              >
                <PlusCircle size={48} className="mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xl font-bold">إضافة برنامج تدريبي جديد</span>
              </button>
            )}
          </div>
          
          <div className="mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            <p>جميع البرامج تخضع لإشراف الكابتن محمود عمر نادي</p>
            <p className="mt-1 font-mono" dir="ltr">#Rise_To_Your_Peak</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProgramsModal;
