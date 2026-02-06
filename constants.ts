
import { SiteContent } from './types';

export const INITIAL_CONTENT: SiteContent = {
  header: {
    logoImage: "https://placehold.co/150x50/transparent/0f172a?text=PEAK+ATHLETIC&font=montserrat",
    title: "PEAK ATHLETIC"
  },
  hero: {
    title: "أطلق العنان لإمكانياتك في Peak Athletic",
    subtitle: "نحن نبني الأبطال من خلال التدريب الاحترافي، المرافق العالمية، والشغف بالتميز.",
    ctaText: "عرض المواعيد",
    backgroundImage: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2670&auto=format&fit=crop"
  },
  mission: {
    title: "رسالتنا وهدفنا",
    text: "في Peak Athletic، نؤمن بأن الرياضة هي أكثر من مجرد تدريب؛ هي مدرسة للحياة. رسالتنا هي تمكين كل رياضي من اكتشاف قدراته الحقيقية، وتنمية الشخصية القيادية، وتعزيز روح الفريق، لنصنع معاً مستقبلاً مليئاً بالإنجازات والبطولات.",
    backgroundImage: "https://images.unsplash.com/photo-1552674605-469455965632?q=80&w=2070&auto=format&fit=crop"
  },
  socialLinks: [
    { id: 'soc1', platform: 'facebook', url: 'https://facebook.com' },
    { id: 'soc2', platform: 'instagram', url: 'https://instagram.com' },
    { id: 'soc3', platform: 'whatsapp', url: 'https://wa.me/201234567890' },
    { id: 'soc4', platform: 'tiktok', url: 'https://tiktok.com' }
  ],
  locations: [
    {
      id: "loc1",
      name: "فرع التجمع الخامس",
      address: "شارع التسعين، القاهرة الجديدة",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
      mapUrl: "https://maps.google.com"
    },
    {
      id: "loc2",
      name: "فرع الشيخ زايد",
      address: "مجمع بيفرلي هيلز، الجيزة",
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1375&auto=format&fit=crop",
      mapUrl: "https://maps.google.com"
    }
  ],
  events: [
    {
      id: "evt1",
      title: "بطولة السباحة الصيفية",
      date: "15 أغسطس 2024",
      description: "انضم إلينا في أكبر حدث للسباحة هذا العام مع جوائز قيمة ومنافسة قوية.",
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: "evt2",
      title: "ماراثون الجري الخيري",
      date: "20 سبتمبر 2024",
      description: "نركض من أجل قضية نبيلة. جميع العائدات تذهب لدعم الرياضيين الشباب.",
      image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=1474&auto=format&fit=crop"
    }
  ],
  teams: [
    {
      id: "team1",
      name: "فريق كرة السلة",
      role: "الناشئين",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ee3?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: "team2",
      name: "فريق كرة القدم",
      role: "المحترفين",
      image: "https://images.unsplash.com/photo-1517466787929-bc90951d64b8?q=80&w=1469&auto=format&fit=crop"
    },
    {
      id: "team3",
      name: "فريق التنس",
      role: "سيدات",
      image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1470&auto=format&fit=crop"
    }
  ],
  schedule: [
    {
      id: "sch1",
      time: "10:00 ص",
      activity: "كروس فيت",
      hall: "القاعة الرئيسية",
      coachName: "أحمد علي",
      coachImage: "https://randomuser.me/api/portraits/men/32.jpg",
      day: "الأحد",
      branch: "التجمع الخامس",
      type: "لياقة بدنية"
    },
    {
      id: "sch2",
      time: "04:00 م",
      activity: "كرة قدم",
      hall: "الملعب الخارجي",
      coachName: "كابتن محمد",
      coachImage: "https://randomuser.me/api/portraits/men/45.jpg",
      day: "الأحد",
      branch: "الشيخ زايد",
      type: "رياضات جماعية"
    },
     {
      id: "sch3",
      time: "06:00 م",
      activity: "سباحة",
      hall: "المسبح الأولمبي",
      coachName: "سارة حسن",
      coachImage: "https://randomuser.me/api/portraits/women/44.jpg",
      day: "الاثنين",
      branch: "التجمع الخامس",
      type: "رياضات مائية"
    }
  ],
  store: {
    title: "Peak Athletic Store",
    subtitle: "تجهّز مثل الأبطال. اكتشف مجموعتنا الحصرية من الملابس والمعدات الرياضية عالية الجودة.",
    backgroundImage: "https://images.unsplash.com/photo-1556906781-9a412961d28c?q=80&w=2070&auto=format&fit=crop"
  },
  storeProducts: [
    {
      id: "prod1",
      name: "قميص التدريب الاحترافي",
      price: "450 ج.م",
      image: "https://images.unsplash.com/photo-1581655701402-e9e238fa7567?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "prod2",
      name: "حقيبة رياضية Peak",
      price: "850 ج.م",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "prod3",
      name: "زجاجة مياه حرارية",
      price: "250 ج.م",
      image: "https://images.unsplash.com/photo-1602143407151-011141959845?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "prod4",
      name: "قفازات الملاكمة",
      price: "600 ج.م",
      image: "https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=1000&auto=format&fit=crop"
    }
  ],
  storeLinks: [
    { id: 'st1', platform: 'instagram', url: 'https://instagram.com' },
    { id: 'st2', platform: 'facebook', url: 'https://facebook.com' },
    { id: 'st3', platform: 'whatsapp', url: 'https://wa.me/201234567890' }
  ],
  footer: {
    description: "الوجهة الأولى للرياضيين الطموحين في مصر. نبني المستقبل بطل تلو الآخر.",
    email: "info@peakacademy.com",
    phone: "+20 123 456 7890",
    address: "القاهرة الجديدة، مصر",
    copyrightText: "جميع الحقوق محفوظة."
  },

  // NEW DYNAMIC CONTENT
  vision: [
    { id: 'v1', title: 'الرياضة ليست مجرد أداء محفوظ', text: 'وليست كما يروج لها أنها عرض ترفيهي استعراضي. لا ننكر أن المتعة جزء من الرياضة، ولكنها شعور يولد بعد جهد وعناء.', color: 'blue' },
    { id: 'v2', title: 'الرياضة ليست تجارة', text: 'وليست مجرد دعاية جيدة أو منظر جيد للتمرين دون أساس علمي. الرياضة أهداف، اختبارات، متابعة، تدرج، وتحليل نتائج وتطوير.', color: 'cyan' },
    { id: 'v3', title: 'الرياضة ليست مجرد لعبة', text: 'الرياضة بحر من العلوم وجهود آلاف العلماء عبر سنين. المدرب الذي لا يدرك هذه العلوم لا يستحق شرف بناء الأبطال.', color: 'indigo' }
  ],
  goals: [
    { id: 'g1', text: 'العمل على أساس علمي مبني على علوم الرياضة' },
    { id: 'g2', text: 'المتابعة المستمرة للتطور أو التدني في المستوى عن طريق الاختبار والتقييم' },
    { id: 'g3', text: 'الاهتمام بالتغذية والراحات للرياضي عن طريق الإرشاد الغذائي' },
    { id: 'g4', text: 'الاهتمام بالجوانب النفسية والإجتماعية والتحفيز المستمر' },
    { id: 'g5', text: 'العمل تحت أي ظروف وبأقل إمكانيات لتحقيق أفضل نتائج' },
    { id: 'g6', text: 'التثقيف المستمر للاعبين عن حقيقة الرياضة وأساسياتها' },
    { id: 'g7', text: 'المتابعة المستمرة خارج التدريب وتنظيم الروتين اليومي' }
  ],
  features: [
    { id: 'f1', title: 'الاختبارات البدنية والفسيولوجية', text: 'إجراء قياسات دورية دقيقة لقياس مدى التحسن الفسيولوجي والبدني للاعب.', icon: 'ClipboardCheck', color: 'blue' },
    { id: 'f2', title: 'بروفايل اللاعب (Player Profile)', text: 'ملف شامل يتم تحديثه باستمرار بنتائج الاختبارات والقياسات ومتابعة تطور الأرقام.', icon: 'Users', color: 'green' },
    { id: 'f3', title: 'الإرشاد الغذائي', text: 'نموذج إرشاد غذائي ومتابعة يومية لتحديد ما يجب تناوله وما يجب منعه في روتين اللاعب.', icon: 'Apple', color: 'orange' },
    { id: 'f4', title: 'نظام Score Level System', text: 'نظام متطور لمتابعة وتقييم صعوبة الأداء والشدة في التمارين ومستوى اللاعب بشكل دقيق.', icon: 'TrendingUp', color: 'purple' }
  ],
  trainingPrograms: [
    {
      id: 'p1',
      title: "برنامج خفض الوزن",
      icon: 'Flame',
      phase1Title: "مرحلة زيادة الحرق وزيادة القوة",
      phase1Duration: "شهرين - 8 اسابيع - 12 حصة | الوحدة 1.5 ساعة",
      phase1Details: [
        "زيادة النشاط العام: لزيادة معدل الحرق عن طريق تدريبات القوة المركبة.",
        "التحمل التنفسي: الكارديو وتدريبات الـ HIIT.",
        "قوة المفاصل: تدريبات الثبات والتوازن.",
        "المرونة: جلسات مرونة كاملة."
      ],
      phase1Theme: "blue",
      phase2Title: "مرحلة اعادة تكوين الجسم",
      phase2Duration: "شهرين - 8 اسابيع - 12 حصة | الوحدة 1.5 ساعة",
      phase2Details: [
        "القوة: تدريبات مقاومة لزيادة الكتلة العضلية.",
        "التحمل التنفسي: تدريبات كارديو و HIIT عالية الشدة.",
        "التحمل العضلي: زيادة صعوبة التدريبات.",
        "التوازن والرشاقة: زيادة صعوبة تدريبات التوازن واضافة تدريبات رشاقة ضمن الكارديو."
      ],
      phase2Theme: "red"
    },
    {
      id: 'p2',
      title: "برنامج الأهداف والمشاكل الخاصة",
      icon: 'Target',
      phase1Title: "مرحلة العلاج والتهيئة",
      phase1Duration: "شهرين - 12 حصة | تخصيص 50-60% من الوقت للمشكلة",
      phase1Details: [
        "المرونة: المرونة العامة والمخصصة للحالة.",
        "التحمل التنفسي + العضلي: الجري وتدريبات مستمرة / البلانكات بانواعها.",
        "القوة: بناء كتلة عضلية جيدة عن طريق تدريبات القوة الأساسية وتدريبات العزل.",
        "التوافق والرشاقة: بداية تعليم."
      ],
      phase1Theme: "blue",
      phase2Title: "مرحلة الاعداد العام",
      phase2Duration: "شهرين - 12 حصة | تخصيص 50-60% من الوقت للمشكلة",
      phase2Details: [
        "المرونة: المرونة العامة والمخصصة للحالة.",
        "التحمل التنفسي + العضلي: الجري وتدريبات مستمرة / البلانكات بانواعها.",
        "القوة: بناء كتلة عضلية جيدة عن طريق تدريبات القوة الأساسية وتدريبات العزل."
      ],
      phase2Theme: "red"
    },
    {
      id: 'p3',
      title: "برنامج اعداد الرياضيين",
      icon: 'Trophy',
      phase1Title: "مرحلة الأعداد العام",
      phase1Duration: "شهرين - 8 اسابيع - 12 حصة | الوحدة 1.5 ساعة",
      phase1Details: [
        "المرونة: جلسات مرونة كاملة.",
        "التحمل التنفسي + العضلي: الجري وتدريبات مستمرة / البلانكات بانواعها.",
        "القوة: بناء كتلة عضلية جيدة عن طريق تدريبات القوة الأساسية وتدريبات العزل.",
        "الرشاقة + التوازن + التوافق: تدريبات اساسية وعامة.",
        "السرعة + رد الفعل: تدريبات اساسية وعامة."
      ],
      phase1Theme: "blue",
      phase2Title: "مرحلة الأعداد الخاص",
      phase2Duration: "شهرين - 8 اسابيع - 12 حصة | الوحدة 1.5 ساعة",
      phase2Details: [
        "التحمل: تحمل اداء / بلانكات اقل لاكن معقدة.",
        "القدرة والقوة الأنفجارية: البالوميترك وتدريبات القوة بسرعة اكثر وتخصصية.",
        "السرعة ورد الفعل: مسافات اكبر وتدريبات سرعة معقدة.",
        "الرشاقة والتوازن والتوافق: تدريبات تخصصية."
      ],
      phase2Theme: "red"
    },
    {
      id: 'p4',
      title: "برنامج الاعداد البدني العام",
      icon: 'Dumbbell',
      phase1Title: "مرحلة البناء والتنيشيط",
      phase1Duration: "شهرين - 8 اسابيع - 12 حصة | الوحدة 1.5 ساعة",
      phase1Details: [
        "زيادة النشاط العام: رفع كفائة الجهاز التنفسى والقلبى.",
        "القوة العامة: تدريبات القوة الأساسية.",
        "السرعة والرشاقة: تدريبات الثبات والتوازن.",
        "المرونة: جلسات مرونة كاملة."
      ],
      phase1Theme: "blue",
      phase2Title: "مرحلة الشدة العالية",
      phase2Duration: "شهرين - 8 اسابيع - 12 حصة | الوحدة 1.5 ساعة",
      phase2Details: [
        "التحمل التنفسى والعضلى: تدريبات كارديو و HIIT عالية الشدة و تدريبات بلانك متنوعة.",
        "القدرة والقوة: تدريبات القوة القصوى والقوة المميزة بالسرعة.",
        "التوازن والرشاقة: تدريبات توازن ورشاقة متنوعة."
      ],
      phase2Theme: "red"
    }
  ]
};
