import React, { useState, useEffect } from 'react';
import { 
  Menu, X, MapPin, Users, ShoppingBag, 
  Instagram, Facebook, Phone, KeyRound, Edit2, 
  Clock, Map, LogOut,
  Trash2, PlusCircle, Video, MessageCircle, ArrowRight,
  ShoppingCart, Globe, Calendar, Dumbbell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteContent, SectionKey } from './types';
import { INITIAL_CONTENT } from './constants';
import { loadContent, saveContent } from './services/storageService';
import EditModal from './components/EditModal';
import LoginModal from './components/LoginModal';
import ConfirmModal from './components/ConfirmModal';
import AboutModal from './components/AboutModal';
import ProgramsModal from './components/ProgramsModal';

const SectionWrapper: React.FC<{ 
  id: string; 
  className?: string; 
  children: React.ReactNode; 
  isEditing: boolean;
  onEdit?: () => void;
}> = ({ id, className = "", children, isEditing, onEdit }) => (
  <section id={id} className={`relative group ${className}`}>
    {children}
    {isEditing && onEdit && (
      <button 
        type="button"
        onClick={(e) => { 
          e.preventDefault(); 
          e.stopPropagation(); 
          onEdit(); 
        }}
        className="absolute top-4 left-4 z-40 p-2 bg-accent text-white rounded-full shadow-lg hover:bg-red-700 transition-transform hover:scale-110 flex items-center gap-2"
        title="تعديل هذا القسم"
      >
        <Edit2 size={16} />
        <span className="text-xs font-bold hidden group-hover:inline">تعديل</span>
      </button>
    )}
  </section>
);

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

const getNewItemTemplate = (type: SectionKey, extraData: any = {}) => {
  const id = Date.now().toString();
  switch (type) {
    case 'locations':
      return { id, name: "فرع جديد", address: "عنوان الفرع الجديد", image: "https://placehold.co/600x400/e2e8f0/1e293b?text=New+Location", mapUrl: "https://maps.google.com" };
    case 'events':
      return { id, title: "حدث جديد", date: "قريباً", description: "وصف الحدث الجديد...", image: "https://placehold.co/600x400/e2e8f0/1e293b?text=New+Event" };
    case 'teams':
      return { id, name: "اسم الفريق", role: "فئة الفريق", image: "https://placehold.co/400x400/e2e8f0/1e293b?text=Team" };
    case 'schedule':
      return { id, time: "00:00", activity: "نشاط جديد", hall: "اسم القاعة", coachName: "اسم المدرب", coachImage: "https://placehold.co/100x100/e2e8f0/1e293b?text=Coach", day: extraData.day || "الأحد", branch: extraData.branch || "الفرع الرئيسي", type: extraData.type || "عام" };
    case 'socialLinks':
    case 'storeLinks':
      return { id, platform: 'facebook', url: 'https://' };
    case 'storeProducts':
      return { id, name: "منتج جديد", price: "000 ج.م", image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Product" };
    case 'vision':
      return { id, title: "رؤية جديدة", text: "نص الرؤية...", color: "blue" };
    case 'goals':
      return { id, text: "هدف جديد..." };
    case 'features':
      return { id, title: "ميزة جديدة", text: "وصف الميزة...", icon: "Star", color: "blue" };
    case 'trainingPrograms':
      return { 
        id, 
        title: "برنامج جديد", 
        icon: "Dumbbell", 
        phase1Title: "المرحلة الأولى", 
        phase1Duration: "شهر", 
        phase1Details: ["نقطة 1"], 
        phase1Theme: "blue",
        phase2Title: "المرحلة الثانية", 
        phase2Duration: "شهر", 
        phase2Details: ["نقطة 1"], 
        phase2Theme: "red"
      };
    default:
      return {};
  }
};

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case 'facebook': return { Icon: Facebook, color: 'text-blue-600', text: 'تسوق عبر فيسبوك' };
    case 'instagram': return { Icon: Instagram, color: 'text-pink-600', text: 'تسوق عبر انستجرام' };
    case 'whatsapp': return { Icon: Phone, color: 'text-green-500', text: 'اطلب عبر واتساب' };
    case 'tiktok': return { Icon: Video, color: 'text-black', text: 'تابعنا على تيك توك' };
    case 'amazon': return { Icon: ShoppingCart, color: 'text-yellow-600', text: 'متجر أمازون' };
    case 'website': return { Icon: Globe, color: 'text-slate-600', text: 'الموقع الإلكتروني' };
    default: return { Icon: MessageCircle, color: 'text-gray-400', text: 'رابط المتجر' };
  }
};

export default function App() {
  const [content, setContent] = useState<SiteContent>(INITIAL_CONTENT);
  const [isEditing, setIsEditing] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [programsModalOpen, setProgramsModalOpen] = useState(false);
  const [currentEditSection, setCurrentEditSection] = useState<{ key: SectionKey; data: any; index?: number } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeScheduleTab, setActiveScheduleTab] = useState<string>("التجمع الخامس");
  const [scheduleFilterDay, setScheduleFilterDay] = useState<string>("الكل");
  const [scheduleFilterType, setScheduleFilterType] = useState<string>("الكل");

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    isDestructive: false,
    confirmText: 'تأكيد'
  });

  useEffect(() => {
    const data = loadContent();
    if (!data.vision) data.vision = INITIAL_CONTENT.vision;
    if (!data.goals) data.goals = INITIAL_CONTENT.goals;
    if (!data.features) data.features = INITIAL_CONTENT.features;
    if (!data.trainingPrograms) data.trainingPrograms = INITIAL_CONTENT.trainingPrograms;
    
    if (!data.header) data.header = INITIAL_CONTENT.header;
    if (!data.socialLinks) data.socialLinks = INITIAL_CONTENT.socialLinks;
    if (!data.footer) data.footer = INITIAL_CONTENT.footer;
    if (!data.store) data.store = INITIAL_CONTENT.store;
    if (!data.storeLinks) data.storeLinks = INITIAL_CONTENT.storeLinks;
    if (!data.storeProducts) data.storeProducts = INITIAL_CONTENT.storeProducts;
    if (!data.mission) data.mission = INITIAL_CONTENT.mission; 
    setContent(data);
  }, []);

  const handleSaveContent = (key: SectionKey, data: any, index?: number) => {
    const newContent = { ...content };
    
    if (index !== undefined && Array.isArray(newContent[key])) {
      const newArray = [...(newContent[key] as any[])];
      newArray[index] = data;
      (newContent as any)[key] = newArray;
    } else {
      (newContent as any)[key] = data;
    }

    if (saveContent(newContent)) {
      setContent(newContent);
      setEditModalOpen(false);
      setCurrentEditSection(null);
    } else {
      console.error("Save failed (Storage limit likely exceeded).");
    }
  };

  const openEdit = (key: SectionKey, data: any, index?: number) => {
    setCurrentEditSection({ key, data, index });
    setEditModalOpen(true);
  };

  const handleAddItem = (key: SectionKey, extraData: any = {}) => {
    const newItem = getNewItemTemplate(key, extraData);
    const newContent = { ...content };
    if (Array.isArray(newContent[key])) {
      const newArray = [...(newContent[key] as any[])];
      newArray.push(newItem);
      (newContent as any)[key] = newArray;
      
      if (saveContent(newContent)) {
        setContent(newContent);
        openEdit(key, newItem, newArray.length - 1);
      }
    }
  };

  const handleDeleteItem = (key: SectionKey, index: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    
    setConfirmModal({
      isOpen: true,
      title: 'حذف العنصر',
      message: 'هل أنت متأكد تماماً من حذف هذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.',
      isDestructive: true,
      confirmText: 'حذف',
      onConfirm: () => {
        const newContent = { ...content };
        if (Array.isArray(newContent[key])) {
          (newContent[key] as any[]).splice(index, 1);
          if (saveContent(newContent)) {
            setContent(newContent);
          }
        }
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleLogin = (password: string) => {
    if (password === 'Mahmod6454') {
      setIsEditing(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsEditing(false);
  };

  const uniqueDays = ["الكل", ...Array.from(new Set(content.schedule.map(i => i.day)))];
  const uniqueTypes = ["الكل", ...Array.from(new Set(content.schedule.map(i => i.type)))];
  const uniqueBranches = Array.from(new Set(content.schedule.map(i => i.branch)));
  
  const filteredSchedule = content.schedule.filter(item => {
    const matchBranch = item.branch === activeScheduleTab;
    const matchDay = scheduleFilterDay === "الكل" || item.day === scheduleFilterDay;
    const matchType = scheduleFilterType === "الكل" || item.type === scheduleFilterType;
    return matchBranch && matchDay && matchType;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden" dir="rtl">
      {/* Modals */}
      <EditModal 
        isOpen={editModalOpen} 
        onClose={() => setEditModalOpen(false)} 
        sectionKey={currentEditSection?.key || 'hero'}
        initialData={currentEditSection?.data || {}}
        onSave={(data) => handleSaveContent(currentEditSection?.key!, data, currentEditSection?.index)}
      />
      <LoginModal 
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={handleLogin}
      />
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        isDestructive={confirmModal.isDestructive}
        confirmText={confirmModal.confirmText}
      />
      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
        isEditing={isEditing}
        vision={content.vision}
        goals={content.goals}
        features={content.features}
        onEdit={openEdit}
        onAdd={handleAddItem}
        onDelete={handleDeleteItem}
      />
      <ProgramsModal
        isOpen={programsModalOpen}
        onClose={() => setProgramsModalOpen(false)}
        isEditing={isEditing}
        programs={content.trainingPrograms}
        onEdit={openEdit}
        onAdd={handleAddItem}
        onDelete={handleDeleteItem}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md text-white shadow-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <SectionWrapper id="header" isEditing={isEditing} onEdit={() => openEdit('header', content.header)}>
            <div className="flex items-center gap-3">
               <img src={content.header.logoImage} alt="Logo" className="h-12 w-auto object-contain" />
               <span className="font-black text-xl tracking-wider hidden sm:block text-white">{content.header.title}</span>
            </div>
          </SectionWrapper>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 font-bold text-sm">
            <a href="#hero" className="hover:text-accent transition-colors">الرئيسية</a>
            <a href="#locations" className="hover:text-accent transition-colors">الأماكن</a>
            <a href="#events" className="hover:text-accent transition-colors">الأحداث</a>
            <a href="#teams" className="hover:text-accent transition-colors">الفرق</a>
            <a href="#schedule" className="hover:text-accent transition-colors">الجدول</a>
            <a href="#store" className="hover:text-accent transition-colors">المتجر</a>
            <button onClick={() => setProgramsModalOpen(true)} className="px-4 py-2 bg-accent/20 border border-accent rounded-full text-accent hover:bg-accent hover:text-white transition-all">البرامج التدريبية</button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-slate-900 text-white p-6 md:hidden flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-xl">القائمة</span>
              <button onClick={() => setMobileMenuOpen(false)}><X size={28} /></button>
            </div>
            <nav className="flex flex-col gap-6 text-xl font-bold">
               <a href="#hero" onClick={() => setMobileMenuOpen(false)}>الرئيسية</a>
               <a href="#locations" onClick={() => setMobileMenuOpen(false)}>الأماكن</a>
               <a href="#events" onClick={() => setMobileMenuOpen(false)}>الأحداث</a>
               <a href="#teams" onClick={() => setMobileMenuOpen(false)}>الفرق</a>
               <a href="#schedule" onClick={() => setMobileMenuOpen(false)}>الجدول</a>
               <a href="#store" onClick={() => setMobileMenuOpen(false)}>المتجر</a>
               <button onClick={() => { setMobileMenuOpen(false); setProgramsModalOpen(true); }} className="text-right text-accent">البرامج التدريبية</button>
               <button onClick={() => { setMobileMenuOpen(false); setAboutModalOpen(true); }} className="text-right text-accent">عن الأكاديمية</button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <SectionWrapper id="hero" isEditing={isEditing} onEdit={() => openEdit('hero', content.hero)}>
        <div className="relative h-[90vh] flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0">
             <img src={content.hero.backgroundImage} alt="Hero" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-slate-900 via-transparent to-black/30"></div>
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <FadeIn>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                {content.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-slate-200 mb-10 max-w-3xl mx-auto font-medium">
                {content.hero.subtitle}
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <a 
                  href="#teams" 
                  className="px-8 py-4 bg-accent text-white rounded-full font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105"
                >
                  {content.hero.ctaText}
                </a>
                <a 
                  href="#schedule" 
                  className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
                >
                  ابدأ رحلتك
                </a>
                
                {/* About & Programs Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setAboutModalOpen(true)}
                    className="px-8 py-4 bg-white/10 backdrop-blur border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-2 justify-center"
                  >
                    اكتشف الأكاديمية
                  </button>
                  <button 
                    onClick={() => setProgramsModalOpen(true)}
                    className="px-8 py-4 bg-slate-900/50 backdrop-blur border border-accent/50 text-white rounded-full font-bold text-lg hover:bg-accent hover:border-accent transition-all flex items-center gap-2 justify-center shadow-lg shadow-black/20"
                  >
                    <Dumbbell size={20} />
                    برامجنا التدريبية
                  </button>
                </div>

              </div>
            </FadeIn>
          </div>
        </div>
      </SectionWrapper>

      {/* Social Bar */}
      <div className="bg-accent text-white py-4 relative z-20 shadow-lg">
         <div className="container mx-auto px-4 flex justify-center gap-8 flex-wrap">
           {content.socialLinks.map((link, idx) => (
             <div key={link.id} className="relative group/social">
                {isEditing && (
                  <div className="absolute -top-10 left-0 bg-white p-1 rounded-md shadow flex gap-1 z-30 opacity-0 group-hover/social:opacity-100">
                    <button onClick={() => openEdit('socialLinks', link, idx)} className="text-blue-600"><Edit2 size={14} /></button>
                    <button onClick={(e) => handleDeleteItem('socialLinks', idx, e)} className="text-red-600"><Trash2 size={14} /></button>
                  </div>
                )}
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-transform hover:scale-110 block">
                  {link.platform === 'facebook' && <Facebook size={24} />}
                  {link.platform === 'instagram' && <Instagram size={24} />}
                  {link.platform === 'whatsapp' && <Phone size={24} />}
                  {link.platform === 'tiktok' && <Video size={24} />}
                </a>
             </div>
           ))}
           {isEditing && (
             <button onClick={() => handleAddItem('socialLinks')} className="bg-white/20 p-1 rounded hover:bg-white/40"><PlusCircle size={20} /></button>
           )}
         </div>
      </div>

      {/* Mission / About Teaser */}
      <SectionWrapper id="mission" className="py-20 bg-white" isEditing={isEditing} onEdit={() => openEdit('mission', content.mission)}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
               <FadeIn>
                 <div className="inline-block px-4 py-1 bg-slate-100 text-accent font-bold rounded-full mb-4 text-sm">من نحن</div>
                 <h2 className="text-4xl font-black text-slate-900 mb-6">{content.mission.title}</h2>
                 <p className="text-lg text-slate-600 leading-relaxed mb-8">{content.mission.text}</p>
                 <div className="flex flex-wrap gap-4">
                   <button 
                     onClick={() => setAboutModalOpen(true)}
                     className="flex items-center gap-2 text-accent font-bold hover:gap-4 transition-all"
                   >
                     اقرأ المزيد عن رؤيتنا <ArrowRight size={20} />
                   </button>
                 </div>
               </FadeIn>
            </div>
            <div className="md:w-1/2">
              <FadeIn delay={0.2}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img src={content.mission.backgroundImage} alt="Mission" className="w-full h-[400px] object-cover" />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Locations Section */}
      <SectionWrapper id="locations" className="py-20 bg-slate-50" isEditing={isEditing}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">فروعنا</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">تنتشر فروعنا في أفضل المواقع لتكون قريبة منك دائماً</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {content.locations.map((loc, idx) => (
              <FadeIn key={loc.id} delay={idx * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group h-full flex flex-col relative">
                  {isEditing && (
                    <div className="absolute top-4 left-4 z-30 flex gap-2">
                       <button onClick={() => openEdit('locations', loc, idx)} className="p-2 bg-accent text-white rounded-full"><Edit2 size={16}/></button>
                       <button onClick={(e) => handleDeleteItem('locations', idx, e)} className="p-2 bg-red-800 text-white rounded-full"><Trash2 size={16}/></button>
                    </div>
                  )}
                  <div className="relative h-64 overflow-hidden">
                    <img src={loc.image} alt={loc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow-sm">
                      <MapPin size={16} className="text-accent" />
                      {loc.name}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2">{loc.name}</h3>
                    <p className="text-slate-500 mb-6 flex-1">{loc.address}</p>
                    <a 
                      href={loc.mapUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-3 border border-slate-200 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-colors font-bold text-slate-700"
                    >
                      <Map size={18} />
                      عرض على الخريطة
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
            {isEditing && (
              <button 
                onClick={() => handleAddItem('locations')}
                className="bg-white border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center min-h-[300px] hover:border-accent hover:text-accent transition-colors"
              >
                <PlusCircle size={48} className="mb-2" />
                <span className="font-bold">إضافة فرع جديد</span>
              </button>
            )}
          </div>
        </div>
      </SectionWrapper>

      {/* Events Section */}
      <SectionWrapper id="events" className="py-20 bg-slate-900 text-white" isEditing={isEditing}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
             <div>
               <h2 className="text-4xl font-black mb-2 text-white">الأحداث والبطولات</h2>
               <p className="text-slate-400">تابع أحدث المنافسات والفعاليات</p>
             </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.events.map((evt, idx) => (
              <FadeIn key={evt.id} delay={idx * 0.1}>
                 <div className="group relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-accent transition-colors">
                    {isEditing && (
                      <div className="absolute top-4 left-4 z-30 flex gap-2">
                        <button onClick={() => openEdit('events', evt, idx)} className="p-2 bg-accent text-white rounded-full"><Edit2 size={16}/></button>
                        <button onClick={(e) => handleDeleteItem('events', idx, e)} className="p-2 bg-red-800 text-white rounded-full"><Trash2 size={16}/></button>
                      </div>
                    )}
                    <div className="h-48 overflow-hidden">
                       <img src={evt.image} alt={evt.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-6">
                       <div className="flex items-center gap-2 text-accent text-sm font-bold mb-3">
                         <Calendar size={16} />
                         {evt.date}
                       </div>
                       <h3 className="text-xl font-bold mb-3">{evt.title}</h3>
                       <p className="text-slate-400 text-sm line-clamp-3 mb-4">{evt.description}</p>
                       <button className="text-white font-bold text-sm border-b border-accent pb-1 hover:text-accent transition-colors">اقرأ التفاصيل</button>
                    </div>
                 </div>
              </FadeIn>
            ))}
            {isEditing && (
               <button 
                onClick={() => handleAddItem('events')}
                className="bg-slate-800 border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center min-h-[300px] text-slate-500 hover:border-accent hover:text-accent transition-colors"
              >
                <PlusCircle size={48} className="mb-2" />
                <span className="font-bold">إضافة حدث جديد</span>
              </button>
            )}
          </div>
        </div>
      </SectionWrapper>

      {/* Teams Section */}
      <SectionWrapper id="teams" className="py-20 bg-white" isEditing={isEditing}>
         <div className="container mx-auto px-4">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-black text-slate-900 mb-4">فرقنا الرياضية</h2>
               <p className="text-slate-500">نخبة من الرياضيين في مختلف الألعاب</p>
            </div>

            <div className="flex flex-wrap justify-center gap-10">
              {content.teams.map((team, idx) => (
                <FadeIn key={team.id} delay={idx * 0.1}>
                  <div className="relative group text-center w-64">
                    {isEditing && (
                      <div className="absolute -top-2 -left-2 z-30 flex gap-2">
                        <button onClick={() => openEdit('teams', team, idx)} className="p-2 bg-accent text-white rounded-full"><Edit2 size={16}/></button>
                        <button onClick={(e) => handleDeleteItem('teams', idx, e)} className="p-2 bg-red-800 text-white rounded-full"><Trash2 size={16}/></button>
                      </div>
                    )}
                    <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-slate-100 shadow-xl relative mb-6 group-hover:border-accent transition-colors">
                       <img src={team.image} alt={team.name} className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{team.name}</h3>
                    <span className="text-accent font-medium">{team.role}</span>
                  </div>
                </FadeIn>
              ))}
              {isEditing && (
                <button 
                  onClick={() => handleAddItem('teams')}
                  className="w-48 h-48 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                >
                  <PlusCircle size={32} />
                </button>
              )}
            </div>
         </div>
      </SectionWrapper>

      {/* Dynamic Schedule Section */}
      <SectionWrapper id="schedule" className="py-20 bg-slate-50" isEditing={isEditing}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-slate-900 mb-4">جدول التمارين</h2>
            <p className="text-slate-500">اختر الفرع واليوم المناسب لك</p>
          </div>

          {/* Branch Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {uniqueBranches.map(branch => (
              <button
                key={branch}
                onClick={() => setActiveScheduleTab(branch)}
                className={`px-6 py-2 rounded-full font-bold transition-all ${
                  activeScheduleTab === branch 
                    ? 'bg-accent text-white shadow-lg shadow-accent/30' 
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {branch}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm max-w-3xl mx-auto">
             <div className="flex items-center gap-2">
               <span className="text-sm font-bold text-slate-500">اليوم:</span>
               <select 
                 value={scheduleFilterDay}
                 onChange={(e) => setScheduleFilterDay(e.target.value)}
                 className="bg-slate-100 border-none rounded-lg py-2 px-4 text-sm font-bold focus:ring-2 focus:ring-accent outline-none"
               >
                 {uniqueDays.map(d => <option key={d} value={d}>{d}</option>)}
               </select>
             </div>
             <div className="flex items-center gap-2">
               <span className="text-sm font-bold text-slate-500">النشاط:</span>
               <select 
                 value={scheduleFilterType}
                 onChange={(e) => setScheduleFilterType(e.target.value)}
                 className="bg-slate-100 border-none rounded-lg py-2 px-4 text-sm font-bold focus:ring-2 focus:ring-accent outline-none"
               >
                 {uniqueTypes.map(t => <option key={t} value={t}>{t}</option>)}
               </select>
             </div>
          </div>

          {/* Schedule List */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto min-h-[400px]">
            {filteredSchedule.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {filteredSchedule.map((item, idx) => {
                  // Find original index for editing
                  const originalIndex = content.schedule.findIndex(i => i.id === item.id);
                  return (
                    <div key={item.id} className="p-6 flex flex-col md:flex-row items-center gap-6 hover:bg-slate-50 transition-colors relative group">
                       {isEditing && (
                          <div className="absolute top-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button onClick={() => openEdit('schedule', item, originalIndex)} className="p-2 bg-accent text-white rounded-full"><Edit2 size={14}/></button>
                            <button onClick={(e) => handleDeleteItem('schedule', originalIndex, e)} className="p-2 bg-red-800 text-white rounded-full"><Trash2 size={14}/></button>
                          </div>
                       )}
                       
                       <div className="flex items-center gap-4 min-w-[150px]">
                         <div className="bg-accent/10 text-accent p-3 rounded-xl font-bold text-center min-w-[80px]">
                           {item.time}
                         </div>
                       </div>
                       
                       <div className="flex-1 text-center md:text-right">
                         <h4 className="text-xl font-bold text-slate-900 mb-1">{item.activity}</h4>
                         <div className="flex items-center gap-4 text-sm text-slate-500 justify-center md:justify-start">
                           <span className="flex items-center gap-1"><MapPin size={14}/> {item.hall}</span>
                           <span className="flex items-center gap-1"><Calendar size={14}/> {item.day}</span>
                         </div>
                       </div>

                       <div className="flex items-center gap-3 min-w-[200px] justify-end">
                          <div className="text-right">
                            <div className="font-bold text-slate-900 text-sm">ك/ {item.coachName}</div>
                            <div className="text-xs text-slate-500">مدرب الفريق</div>
                          </div>
                          <img src={item.coachImage} alt={item.coachName} className="w-12 h-12 rounded-full border border-slate-200" />
                       </div>
                    </div>
                  );
                })}
              </div>
            ) : (
               <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                  <Calendar size={48} className="mb-4 opacity-50"/>
                  <p>لا توجد مواعيد متاحة مع الفلاتر الحالية.</p>
               </div>
            )}
            
            {isEditing && (
              <div className="p-4 bg-slate-100 text-center border-t border-slate-200">
                <button 
                  onClick={() => handleAddItem('schedule', { branch: activeScheduleTab })}
                  className="px-6 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg text-slate-700 font-bold flex items-center gap-2 mx-auto"
                >
                  <PlusCircle size={20} />
                  إضافة موعد جديد في {activeScheduleTab}
                </button>
              </div>
            )}
          </div>
        </div>
      </SectionWrapper>

      {/* Store Section */}
      <SectionWrapper id="store" className="py-20 relative text-white" isEditing={isEditing} onEdit={() => openEdit('store', content.store)}>
         <div className="absolute inset-0 z-0">
             <img src={content.store.backgroundImage} alt="Store BG" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-slate-900/90"></div>
         </div>
         
         <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
               <div>
                  <h2 className="text-4xl font-black mb-2">{content.store.title}</h2>
                  <p className="text-slate-400 max-w-xl">{content.store.subtitle}</p>
               </div>
               
               <div className="flex gap-4 mt-6 md:mt-0">
                  {content.storeLinks.map((link, idx) => {
                    const { Icon, color } = getSocialIcon(link.platform);
                    return (
                      <div key={link.id} className="relative group/link">
                         {isEditing && (
                           <div className="absolute -top-8 left-0 flex gap-1">
                             <button onClick={() => openEdit('storeLinks', link, idx)} className="text-xs bg-white text-black px-1 rounded">Edit</button>
                             <button onClick={(e) => handleDeleteItem('storeLinks', idx, e)} className="text-xs bg-red-600 text-white px-1 rounded">Del</button>
                           </div>
                         )}
                         <a href={link.url} target="_blank" rel="noopener noreferrer" className={`p-3 bg-white rounded-full ${color} hover:scale-110 transition-transform block`}>
                           <Icon size={20} />
                         </a>
                      </div>
                    );
                  })}
                  {isEditing && (
                    <button onClick={() => handleAddItem('storeLinks')} className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20"><PlusCircle size={20}/></button>
                  )}
               </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {content.storeProducts.map((prod, idx) => (
                <FadeIn key={prod.id} delay={idx * 0.1}>
                  <div className="bg-white rounded-xl overflow-hidden group relative">
                     {isEditing && (
                        <div className="absolute top-2 left-2 z-30 flex gap-2">
                           <button onClick={() => openEdit('storeProducts', prod, idx)} className="p-1.5 bg-accent text-white rounded-full"><Edit2 size={14}/></button>
                           <button onClick={(e) => handleDeleteItem('storeProducts', idx, e)} className="p-1.5 bg-red-800 text-white rounded-full"><Trash2 size={14}/></button>
                        </div>
                     )}
                     <div className="h-48 overflow-hidden relative">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-bold">
                          {prod.price}
                        </div>
                     </div>
                     <div className="p-4">
                        <h3 className="font-bold text-slate-900 mb-2">{prod.name}</h3>
                        <button className="w-full py-2 bg-slate-100 text-slate-700 text-sm font-bold rounded-lg hover:bg-accent hover:text-white transition-colors flex items-center justify-center gap-2">
                           <ShoppingBag size={16} />
                           طلب المنتج
                        </button>
                     </div>
                  </div>
                </FadeIn>
              ))}
              {isEditing && (
                 <button 
                  onClick={() => handleAddItem('storeProducts')}
                  className="bg-white/5 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center hover:border-accent hover:text-accent transition-colors text-white/50"
                >
                  <PlusCircle size={32} className="mb-2" />
                  <span className="font-bold text-sm">إضافة منتج</span>
                </button>
              )}
            </div>
         </div>
      </SectionWrapper>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <SectionWrapper id="footer" isEditing={isEditing} onEdit={() => openEdit('footer', content.footer)}>
               <div className="mb-6">
                 <img src={content.header.logoImage} alt="Logo" className="h-10 opacity-80 mb-4" />
                 <p className="leading-relaxed">{content.footer.description}</p>
               </div>
               <div className="space-y-2">
                 <p className="flex items-center gap-2"><MapPin size={16}/> {content.footer.address}</p>
                 <p className="flex items-center gap-2"><Phone size={16}/> {content.footer.phone}</p>
                 <p className="flex items-center gap-2"><MessageCircle size={16}/> {content.footer.email}</p>
               </div>
            </SectionWrapper>

            <div>
              <h3 className="text-white font-bold text-lg mb-6">روابط سريعة</h3>
              <ul className="space-y-3">
                <li><a href="#hero" className="hover:text-accent transition-colors">الرئيسية</a></li>
                <li><a href="#locations" className="hover:text-accent transition-colors">الفروع</a></li>
                <li><a href="#schedule" className="hover:text-accent transition-colors">المواعيد</a></li>
                <li><a href="#store" className="hover:text-accent transition-colors">المتجر</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-6">تواصل معنا</h3>
              <div className="flex gap-4">
                 {content.socialLinks.map(link => {
                    const PlatformIcon = link.platform === 'facebook' ? Facebook : link.platform === 'instagram' ? Instagram : link.platform === 'whatsapp' ? Phone : Video;
                    return (
                       <a key={link.id} href={link.url} className="p-2 bg-slate-900 rounded-lg hover:bg-accent hover:text-white transition-colors">
                          <PlatformIcon size={20} />
                       </a>
                    )
                 })}
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-sm">{content.footer.copyrightText} © {new Date().getFullYear()}</p>
             
             {/* Admin Login Trigger */}
             <div className="flex items-center gap-4">
                {isEditing ? (
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500 hover:text-red-400 font-bold text-sm"
                  >
                    <LogOut size={16} /> تسجيل خروج
                  </button>
                ) : (
                  <button 
                    onClick={() => setLoginModalOpen(true)}
                    className="text-slate-800 hover:text-slate-700 transition-colors"
                  >
                    <KeyRound size={16} />
                  </button>
                )}
             </div>
          </div>
        </div>
      </footer>

      {!isEditing && (
        <div className="fixed bottom-5 right-5 z-50 md:bottom-6 md:right-7">
          <button
            onClick={() => setLoginModalOpen(true)}
            title="دخول المدير"
            className="w-12 h-12 rounded-full bg-accent text-white shadow-2xl shadow-accent/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-300"
          >
            <KeyRound size={20} />
            <span className="sr-only">الوصول إلى لوحة التحكم</span>
          </button>
        </div>
      )}

    </div>
  );
}