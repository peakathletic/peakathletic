
import React, { useState, useEffect } from 'react';
import { X, Save, Wand2, Search, Upload, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { improveText, searchInfo } from '../services/geminiService';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionKey: string;
  initialData: any;
  onSave: (data: any) => void;
}

const FIELD_LABELS: Record<string, string> = {
  title: 'العنوان',
  subtitle: 'النص الفرعي / الوصف',
  ctaText: 'نص الزر',
  text: 'المحتوى النصي',
  name: 'الاسم',
  role: 'الدور / الصفة',
  description: 'التفاصيل / الوصف',
  date: 'التاريخ',
  time: 'الوقت',
  activity: 'النشاط',
  hall: 'القاعة',
  coachName: 'اسم المدرب',
  day: 'اليوم',
  branch: 'الفرع',
  type: 'نوع النشاط',
  address: 'العنوان',
  logoImage: 'رابط صورة الشعار',
  backgroundImage: 'صورة الخلفية (رابط أو رفع)',
  image: 'الصورة',
  coachImage: 'صورة المدرب',
  platform: 'المنصة',
  url: 'الرابط',
  email: 'البريد الإلكتروني',
  phone: 'رقم الهاتف',
  copyrightText: 'نص حقوق الملكية',
  price: 'السعر',
  // New Fields
  phase1Title: 'عنوان المرحلة الأولى',
  phase1Duration: 'مدة المرحلة الأولى',
  phase1Details: 'تفاصيل المرحلة الأولى (كل نقطة في سطر)',
  phase2Title: 'عنوان المرحلة الثانية',
  phase2Duration: 'مدة المرحلة الثانية',
  phase2Details: 'تفاصيل المرحلة الثانية (كل نقطة في سطر)',
  color: 'اللون (blue, red, cyan, indigo, etc)',
  icon: 'اسم الأيقونة (Flame, Target, etc)'
};

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, sectionKey, initialData, onSave }) => {
  const [formData, setFormData] = useState<any>(null);
  const [arrayKeys, setArrayKeys] = useState<string[]>([]);
  const [loadingAI, setLoadingAI] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [activeSearchField, setActiveSearchField] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      const preparedData = JSON.parse(JSON.stringify(initialData));
      const keys: string[] = [];
      
      // Convert arrays to strings for textareas
      Object.keys(preparedData).forEach(key => {
        if (Array.isArray(preparedData[key])) {
          preparedData[key] = preparedData[key].join('\n');
          keys.push(key);
        }
      });
      
      setFormData(preparedData);
      setArrayKeys(keys);
      setUploadError(null);
      setActiveSearchField(null);
      setSearchQuery('');
    }
  }, [isOpen, initialData]);

  if (!isOpen || !formData) return null;

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Convert strings back to arrays
    const finalData = { ...formData };
    arrayKeys.forEach(key => {
      if (typeof finalData[key] === 'string') {
        finalData[key] = finalData[key].split('\n').filter((line: string) => line.trim() !== '');
      }
    });

    onSave(finalData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    setUploadError(null);
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB warning
         setUploadError("تحذير: الصورة كبيرة الحجم (>1MB). قد يؤثر ذلك على الأداء.");
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        handleChange(key, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAIImprove = async (key: string) => {
    setLoadingAI(key);
    const improved = await improveText(formData[key]);
    handleChange(key, improved);
    setLoadingAI(null);
  };

  const toggleSearch = (key: string) => {
    if (activeSearchField === key) {
      setActiveSearchField(null);
    } else {
      setActiveSearchField(key);
      setSearchQuery('');
    }
  };

  const executeSearch = async (key: string) => {
    if (!searchQuery.trim()) return;
    setLoadingAI(key);
    const info = await searchInfo(searchQuery);
    handleChange(key, info);
    setLoadingAI(null);
    setActiveSearchField(null);
  };

  const renderField = (key: string, value: any) => {
    if (key === 'id' || (key === 'mapUrl' && sectionKey !== 'locations')) return null;

    const label = FIELD_LABELS[key] || key;
    const isArrayField = arrayKeys.includes(key);

    // Handle Platform Select for Social Links
    if (key === 'platform') {
      return (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          <select
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent"
          >
            <option value="facebook">فيسبوك (Facebook)</option>
            <option value="instagram">انستجرام (Instagram)</option>
            <option value="tiktok">تيك توك (TikTok)</option>
            <option value="whatsapp">واتساب (WhatsApp)</option>
          </select>
        </div>
      );
    }

    if (key.toLowerCase().includes('image')) {
      return (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-4">
              <img src={value} alt="Preview" className="w-16 h-16 object-cover rounded-md border shrink-0" />
              <div className="flex-1 w-full">
                <input 
                  type="text" 
                  value={value} 
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-xs mb-2 text-gray-600 font-mono focus:ring-2 focus:ring-accent"
                  placeholder="رابط الصورة (URL)"
                  dir="ltr"
                />
                <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-md inline-flex items-center gap-2 transition-colors text-sm w-full sm:w-auto justify-center">
                  <Upload size={16} />
                  <span>رفع صورة من الجهاز</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, key)} />
                </label>
              </div>
            </div>
            {uploadError && <p className="text-xs text-accent font-bold">{uploadError}</p>}
            <p className="text-xs text-gray-500">يمكنك إدخال رابط مباشر للصورة أو رفعها من جهازك (يفضل WebP/JPG).</p>
          </div>
        </div>
      );
    }

    const isLongText = value.length > 50 || key === 'description' || key === 'text' || key === 'subtitle' || isArrayField;

    return (
      <div key={key} className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative">
          {isLongText ? (
            <textarea
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent min-h-[100px]"
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
              dir="ltr" 
            />
          )}
          
          {(key !== 'url' && !isArrayField) && (
            <div className="absolute top-2 left-2 flex gap-1 flex-col">
              <div className="flex gap-1">
                 <button
                  onClick={() => handleAIImprove(key)}
                  disabled={loadingAI === key}
                  className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                  title="تحسين النص بالذكاء الاصطناعي"
                >
                  {loadingAI === key && activeSearchField !== key ? <span className="animate-spin text-xs">⌛</span> : <Wand2 size={14} />}
                </button>
                <button
                  onClick={() => toggleSearch(key)}
                   disabled={loadingAI === key}
                  className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors"
                  title="البحث عن معلومات"
                >
                   <Search size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Inline Search Box */}
        {activeSearchField === key && (
          <div className="mt-2 bg-green-50 p-2 rounded-lg border border-green-200 flex gap-2 animate-fade-in">
            <input 
              type="text" 
              placeholder="اكتب موضوع البحث هنا..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 p-1 text-sm border rounded focus:ring-1 focus:ring-green-500 outline-none"
            />
            <button 
              onClick={() => executeSearch(key)}
              disabled={loadingAI === key}
              className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loadingAI === key ? 'جاري البحث...' : 'بحث'}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" dir="rtl">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
          <h3 className="text-xl font-bold text-primary">تعديل المحتوى</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-accent transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {Object.entries(formData).map(([key, value]) => renderField(key, value))}
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            إلغاء
          </button>
          <button 
            onClick={handleSaveClick}
            className="px-6 py-2 bg-accent hover:bg-red-700 text-white rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-red-600/20"
          >
            <Save size={18} />
            حفظ التغييرات
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
