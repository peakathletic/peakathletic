
import React from 'react';
import { X, Target, Activity, Users, BookOpen, Clock, HeartPulse, Trophy, Dumbbell, Apple, ClipboardCheck, TrendingUp, Info, Star, Edit2, PlusCircle, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { VisionItem, GoalItem, FeatureItem, SectionKey } from '../types';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  vision: VisionItem[];
  goals: GoalItem[];
  features: FeatureItem[];
  onEdit: (section: SectionKey, item: any, index: number) => void;
  onAdd: (section: SectionKey) => void;
  onDelete: (section: SectionKey, index: number) => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ 
  isOpen, onClose, isEditing, 
  vision, goals, features, 
  onEdit, onAdd, onDelete 
}) => {
  if (!isOpen) return null;

  const getIcon = (name: string) => {
    const icons: any = { ClipboardCheck, Users, Apple, TrendingUp, BookOpen, Clock, HeartPulse, Dumbbell };
    return icons[name] || Star;
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-sm">
      {/* Side Menu / Modal Container */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-2xl h-full bg-slate-900 text-white overflow-y-auto shadow-2xl relative scrollbar-hide border-l border-white/10"
        dir="rtl"
      >
        <button 
          onClick={onClose}
          className="fixed top-4 left-4 z-50 p-2 bg-accent rounded-full hover:bg-red-700 transition-colors shadow-lg"
        >
          <X size={24} />
        </button>

        {/* 1. Intro Slide - Static for simplicity, could be dynamic */}
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-slate-800 to-slate-900 border-b border-slate-700">
           <div className="w-24 h-24 mb-6 bg-slate-800 rounded-full flex items-center justify-center border-4 border-accent shadow-xl shadow-accent/20">
              <span className="text-3xl font-black italic text-white">P</span>
           </div>
           <h1 className="text-3xl md:text-5xl font-black mb-4 text-white leading-tight">
             أهلاً بكم في<br/>
             <span className="text-accent inline-block mt-2">أكاديمية الإعداد البدني</span>
           </h1>
           <h2 className="text-2xl text-yellow-400 font-bold mb-8 animate-pulse">هنا بداية القمة</h2>
           <div className="inline-block bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
             <div className="text-lg font-mono text-blue-400 font-bold" dir="ltr">#Rise_To_Your_Peak</div>
             <div className="text-base font-bold text-slate-300 mt-1">#ارتـقِ_إلى_قمتك</div>
           </div>
           <p className="mt-8 text-slate-500 font-semibold">C / Mahmoud Omar Nady</p>
        </div>

        {/* 2. Vision Slide */}
        <div className="p-6 md:p-10 bg-slate-900 border-b border-slate-800 relative group/section">
          <div className="flex items-center justify-center gap-3 mb-10">
            <Target className="text-yellow-500" size={32} />
            <h2 className="text-4xl font-black text-center text-yellow-500">الرؤية</h2>
          </div>
          
          <div className="space-y-6">
            {vision.map((item, index) => (
               <div key={item.id} className={`bg-gradient-to-br from-${item.color}-900 to-slate-800 p-6 rounded-2xl shadow-lg border-r-4 border-${item.color}-500 relative group`}>
                   {isEditing && (
                     <div className="absolute top-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit('vision', item, index)} className="p-1.5 bg-accent rounded-full hover:bg-red-700"><Edit2 size={14} /></button>
                        <button onClick={() => onDelete('vision', index)} className="p-1.5 bg-accent rounded-full hover:bg-red-700"><Trash2 size={14} /></button>
                     </div>
                   )}
                   <h3 className={`text-xl font-black text-${item.color}-200 mb-3`}>{item.title}</h3>
                   <p className="text-slate-300 leading-relaxed font-bold text-lg">{item.text}</p>
               </div>
            ))}
             {isEditing && (
              <button onClick={() => onAdd('vision')} className="w-full py-3 border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center text-slate-500 hover:text-accent hover:border-accent">
                <PlusCircle size={20} className="ml-2" /> إضافة رؤية
              </button>
            )}
          </div>
        </div>

        {/* 3. Goals Slide */}
        <div className="p-6 md:p-10 bg-black relative overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 bg-accent/5 pattern-grid-lg"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-10">
              <Activity className="text-accent" size={32} />
              <h2 className="text-4xl font-black text-center text-accent">الأهداف</h2>
            </div>

            <div className="grid gap-4">
               {goals.map((item, index) => (
                 <div key={item.id} className="flex items-start gap-4 bg-slate-800/80 p-4 rounded-xl border border-slate-700 hover:border-accent transition-colors relative group">
                   {isEditing && (
                     <div className="absolute top-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit('goals', item, index)} className="p-1.5 bg-accent rounded-full hover:bg-red-700"><Edit2 size={14} /></button>
                        <button onClick={() => onDelete('goals', index)} className="p-1.5 bg-accent rounded-full hover:bg-red-700"><Trash2 size={14} /></button>
                     </div>
                   )}
                   <div className="text-2xl font-black text-slate-600 font-mono">{(index + 1).toString().padStart(2, '0')}</div>
                   <div className="flex-1 font-bold text-slate-200 text-lg leading-snug">{item.text}</div>
                 </div>
               ))}
               {isEditing && (
                <button onClick={() => onAdd('goals')} className="w-full py-3 border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center text-slate-500 hover:text-accent hover:border-accent">
                  <PlusCircle size={20} className="ml-2" /> إضافة هدف
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 5. Features Slide (Moved up as requested layout or standard flow) */}
        <div className="p-6 md:p-10 bg-gradient-to-t from-slate-900 to-black">
           <div className="flex items-center justify-center gap-3 mb-10">
             <Star className="text-yellow-500" size={32} />
             <h2 className="text-4xl font-black text-center text-yellow-500">مميزات الاشتراك</h2>
           </div>
           
           <div className="space-y-6">
              {features.map((item, index) => {
                 const Icon = getIcon(item.icon);
                 return (
                  <div key={item.id} className="flex gap-5 items-start bg-slate-800/50 p-4 rounded-xl relative group">
                     {isEditing && (
                       <div className="absolute top-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => onEdit('features', item, index)} className="p-1.5 bg-accent rounded-full hover:bg-red-700"><Edit2 size={14} /></button>
                          <button onClick={() => onDelete('features', index)} className="p-1.5 bg-accent rounded-full hover:bg-red-700"><Trash2 size={14} /></button>
                       </div>
                     )}
                     <div className={`bg-${item.color}-600/20 p-3 rounded-lg text-${item.color}-400 shrink-0`}><Icon size={28} /></div>
                     <div>
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-slate-300 text-lg font-semibold leading-relaxed">{item.text}</p>
                     </div>
                  </div>
                 );
              })}
              {isEditing && (
                <button onClick={() => onAdd('features')} className="w-full py-3 border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center text-slate-500 hover:text-accent hover:border-accent">
                  <PlusCircle size={20} className="ml-2" /> إضافة ميزة
                </button>
              )}
           </div>
        </div>

        <div className="p-8 text-center border-t border-slate-800 bg-black">
           <p className="text-slate-600 text-sm font-mono">© PEAK ATHLETIC ACADEMY - 2024</p>
        </div>

      </motion.div>
    </div>
  );
};

export default AboutModal;
