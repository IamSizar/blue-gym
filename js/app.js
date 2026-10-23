/**
 * BLUE GYM - MAIN CLIENT APPLICATION
 * Features: Dynamic Pricing & Offers, Diet Food & Drinks Menu, Bilingual (Kurdish Badini & Arabic), Member Registration, LocalStorage Bridge
 */

const BLUE_GYM_CONFIG_KEY = 'blue_gym_config_v1';
const BLUE_GYM_MEMBERS_KEY = 'blue_gym_members_v1';
const BLUE_GYM_LANG_KEY = 'blue_gym_lang';

// Bilingual Diet Menu Items
const dietItemsI18n = {
  ku: [
    {
      id: 1,
      name: 'ئایسۆلێت دایت شەیك (Zero Sugar Whey Isolate)',
      category: 'ڤەخوارنا دایت',
      price: 6000,
      protein: '29g',
      carbs: '0g شەکر',
      cals: '118 kcal',
      desc: 'پرۆتینێ پوختێ ئایسۆلێت ب سیفڕ شەکر و بێ چەوری، تایبەت بۆ پاراستنا ماسوولکەیان د دەمێ دایتێ دا.'
    },
    {
      id: 2,
      name: 'گرین دیتۆکس سمووزی (Green Detox Fat Burn)',
      category: 'ڤەخوارنا دایت',
      price: 4500,
      protein: '3g',
      carbs: '4g فایبەر',
      cals: '45 kcal',
      desc: 'کەلەرم، سێڤا کەسک، خەیار، زنجەبیل و ئاڤا لیمۆنێ بۆ سوتنا دوهنیاتان و پاقژکرنا لەشی ژ ژەهران.'
    },
    {
      id: 3,
      name: 'ئایسد BCAA زیڕۆ کالۆری (Iced Amino Zero Sugar)',
      category: 'ڤەخوارنا دایت',
      price: 4000,
      protein: '8g BCAA',
      carbs: '0g شەکر',
      cals: '10 kcal',
      desc: 'ڤەخوارنەکا تەزی یا ترشێن ئامینۆ ب تاما نەعناع و لیمۆنێ، سیفڕ شەکر بۆ وزە و سوتنا چەوریێ د دەمێ ڕاهێنانێ دا.'
    },
    {
      id: 4,
      name: 'قەهوا تەزی یا کیتۆ دایت (Iced Black Keto Coffee)',
      category: 'ڤەخوارنا دایت',
      price: 3000,
      protein: '1g',
      carbs: '0g کارب',
      cals: '5 kcal',
      desc: 'قەهوا ئەسپرێسۆ یا ساردکراو بێ شەکر دگەل کەمەکا MCT Oil بۆ لەزکرنا سوتنا کالۆریان پێش ڕاهێنانێ.'
    },
    {
      id: 5,
      name: 'سەلەتەیا مریشکێ یا دایت (Grilled Chicken Diet Bowl)',
      category: 'خۆراکێ دایت',
      price: 7500,
      protein: '36g',
      carbs: '6g فایبەر',
      cals: '250 kcal',
      desc: 'سینگێ مریشکێ یێ برژاو بێ ڕۆن دگەل کینوا، کاهوو، برۆکلی و سۆسا لیمۆنێ یا تەبیعی.'
    },
    {
      id: 6,
      name: 'شۆفان و چیایێ دایت (Diet Oats & Chia Berries)',
      category: 'خۆراکێ دایت',
      price: 5000,
      protein: '20g',
      carbs: '18g ئۆتس',
      cals: '190 kcal',
      desc: 'شۆفانی تەبیعی دگەل شیرێ بادامێ یێ بێ شەکر، تۆڤێ چیا و توویێن تەبیعی بۆ تێربوونەکا بێ زێدەبوونا کێشێ.'
    }
  ],
  ar: [
    {
      id: 1,
      name: 'أيسوليت دايت شيك (Zero Sugar Whey Isolate)',
      category: 'مشروب دايت',
      price: 6000,
      protein: '29g',
      carbs: '0g سكر',
      cals: '118 سعرة',
      desc: 'بروتين أيسوليت صافي خالي من السكر والدهون، مثالي للحفاظ على الكتلة العضلية أثناء الرجيم.'
    },
    {
      id: 2,
      name: 'جرين ديتوكس سموذي (Green Detox Fat Burn)',
      category: 'مشروب دايت',
      price: 4500,
      protein: '3g',
      carbs: '4g ألياف',
      cals: '45 سعرة',
      desc: 'خليط طبيعي من التفاح الأخضر، الخيار، الزنجبيل والليمون لحرق الدهون وتنقية الجسم من السموم.'
    },
    {
      id: 3,
      name: 'أيسد BCAA زيرو كالوري (Iced Amino Zero Sugar)',
      category: 'مشروب دايت',
      price: 4000,
      protein: '8g BCAA',
      carbs: '0g سكر',
      cals: '10 سعرة',
      desc: 'مشروب أحماض أمينية منعش بنكهة النعناع والليمون بدون سكر، يمنحك الطاقة ويحفز حرق الدهون.'
    },
    {
      id: 4,
      name: 'قهوة كيتو دايت مثلجة (Iced Black Keto Coffee)',
      category: 'مشروب دايت',
      price: 3000,
      protein: '1g',
      carbs: '0g كارب',
      cals: '5 سعرة',
      desc: 'إسبريسو مثلج بدون سكر مع قطرات زيت MCT لتعزيز سرعة حرق السعرات قبل التمرين.'
    },
    {
      id: 5,
      name: 'سلطة دجاج دايت مشوي (Grilled Chicken Diet Bowl)',
      category: 'وجبة دايت',
      price: 7500,
      protein: '36g',
      carbs: '6g ألياف',
      cals: '250 سعرة',
      desc: 'صدر دجاج مشوي بدون زيوت مع الكينوا، الخس والبروكلي وصلصة الليمون الطبيعية الطازجة.'
    },
    {
      id: 6,
      name: 'شوفان وبذور الشيا دايت (Diet Oats & Chia Berries)',
      category: 'وجبة دايت',
      price: 5000,
      protein: '20g',
      carbs: '18g شوفان',
      cals: '190 سعرة',
      desc: 'شوفان طبيعي مع حليب اللوز الخالي من السكر وبذور الشيا والتوت للشعور بالشبع بدون زيادة الوزن.'
    }
  ]
};

// Full Bilingual Dictionary (Kurdish Badini & Arabic)
const translations = {
  ku: {
    page_title: 'هۆلا وەرزشی یا بلۆ | Blue Gym - بەهێزترین هۆلا لەشجوانیێ',
    brand_tagline: 'هۆلا وەرزشی یا بلۆ • بادینان',
    nav_home: 'دەستپێک',
    nav_services: 'خزمەتگوزاری',
    nav_schedule: 'دەمێن دەوامی',
    nav_pricing: 'بها و ئۆفەر',
    nav_diet: 'مێنیویا دایت',
    nav_register: 'ناڤنڤیسین',
    nav_admin: 'کارگێری (Admin CMS)',
    nav_join_btn: 'تۆماربوون',
    hero_badge_1: '🔥 بهێزترین هۆلا لەشجوانیێ',
    hero_badge_2: '⚡ ئامیرێن سەردەمیانە ٢٠٢٦',
    hero_badge_3: '🏆 ئۆفەرا تایبەت یا هەیڤانە',
    hero_title: 'هێز، لەشجوانی و تەندروستی دگەل <span class="text-primary">بلۆ جیم</span>',
    hero_subtitle: 'هۆلا بلۆ جیم ژینگەهەکا نموونەیی یە بۆ وان هەمی کەسێن دڤێت لەشەکێ ڕێک و ماسوولکەیێن بهێز ئاڤا بکەن. دگەل سەردەمیانەترین ئامیرێن وەرزشی و باشترین ڕاهێنەرێن باوەرپێکری.',
    hero_cta_register: 'ناڤێ خۆ نۆکە تۆمار بکە 🚀',
    hero_cta_pricing: 'پلان و بهایێن هەیڤانە 💳',
    stat_monthly_label: 'دینار بەشداریا هەیڤانە',
    stat_machines_label: 'ئامیرێن مۆدێرن یێن وەرزشێ',
    stat_trainers_label: 'ڕاهێنەرێن پسپۆڕ و باوەرپێکری',
    offer_badge: 'ئۆفەرا بهێز یا دەمەکی',
    offer_title: '٣ هەیڤان بەشدار ببە، هەیڤا ٤ ب تنێ ب ٢٥,٠٠٠ دیناران!',
    offer_desc: 'دەلیڤەیەکا زێڕین بۆ وەرزشڤانان! ئەگەر هین بۆ دەمێ ٣ هەیڤان ناڤێ خۆ تۆمار بکەن، هەیڤا چوارێ بتنێ ب نیڤا بهایی (٢٥,٠٠٠ دینار) دێ وەرگرن.',
    offer_old: '30,000 دینار',
    offer_new: '25,000 دینار',
    services_badge: 'خزمەتگوزاریێن تایبەت',
    services_title: 'چ هەیە ل هۆلا <span class="text-primary">بلۆ جیم</span>؟',
    services_subtitle: 'مە هەمی تشت ئامادە کریە دا کو هین ب باشترین شێواز ڕاهێنانێن خۆ ئەنجام بدەن',
    service_1_title: 'ئامیرێن قورس و هەمەجۆر',
    service_1_desc: 'ئامیرێن ستاندەرد یێن جیهانی بۆ هەمی ماسوولکەیێن لەشی (سنگ، پشت، پێ، دەست و مل).',
    service_2_title: 'بەشێ کاردیۆ و فیتنێسێ',
    service_2_desc: 'ئامیرێن بەزینێ (Treadmill)، پایسکلێن ئەلیکترۆنی، و ئامیرێن شوتینێ بۆ کێمکرنا دوهنیاتان.',
    service_3_title: 'ڕاهێنەرێن تایبەت و خۆراک',
    service_3_desc: 'دانانا پڕۆگرامێن وەرزشی یێن تایبەت و خشتەیێ خۆراکی ل دیڤ شیان و ئارمانجا تە.',
    service_4_title: 'حەمام، ساونا و پاکوخاوێنی',
    service_4_desc: 'خاوێنترین گەرمئاڤ و سۆنایا هێورکەرەوە دگەل لۆکەرێن تایبەت و تەناهی بۆ هەر ئەندامەکی.',
    service_5_title: 'بارێ دایت و ڤەخوارنێن تەندروست',
    service_5_desc: 'بەشێ تایبەتێ شەیك و خۆراکێن دایت یێن کێم کالۆری و بێ شەکر پشتی هەر ڕاهێنانەکێ.',
    service_6_title: 'دەمێن دەواما هۆلێ',
    service_6_desc: '🌸 ئافرەتان: ٠٦:٠٠ سپێدێ هەتا ٠٢:٠٠ نیڤڕۆ<br>⚡ زەلامان: ٠٣:٠٠ ئێڤاری هەتا ١١:٠٠ شەڤێ',
    schedule_badge: '⏰ دەمژمێرێن کارکردنێ',
    schedule_title: 'خشتەیێ دەوامێ د هۆلا <span class="text-primary">بلۆ جیم</span> دا',
    schedule_subtitle: 'دەمێن تایبەت بۆ خانمان و پیاوان ب جودا، بۆ دابینکرنا ژینگەهەکا ئارام و وەرزشی یا پێشکەفتی',
    women_badge: 'شیفتا خانمان (ئافرەتان)',
    women_title: 'دەواما ئافرەتان',
    women_desc: 'ژینگەهەکا ب تەمامی تایبەت، ئارام و پاراستی دگەل ڕاهێنەرێن ئافرەت یێن باوەرپێکری.',
    women_duration: '٨ دەمژمێرێن بەردەوام (06:00 AM - 02:00 PM)',
    women_f1: 'ڕاهێنەرێن ئافرەت یێن پسپۆڕ و باوەرپێکری',
    women_f2: 'بەشێ کاردیۆ، فیتنێس و بەرنامەیێن دابەزاندنا کێشێ',
    women_f3: 'تایبەتمەندی و ئاسوودەییا تەمام بۆ خانمان',
    women_f4: 'حەمام و سۆنایا تایبەت و پاقژ',
    women_btn: 'ناڤنڤیسین د دەواما ئافرەتان دا 🌸',
    men_badge: 'شیفتا زەلامان (پیاوان)',
    men_title: 'دەواما زەلامان',
    men_desc: 'ئامیرێن پێشکەفتی، کەشوهەوایێ پڕ وزە، و ڕاهێنەرێن شارەزا د بوارێ لەشجوانی و هێزێ دا.',
    men_duration: '٨ دەمژمێرێن بەردەوام (03:00 PM - 11:00 PM)',
    men_f1: 'ڕاهێنەرێن پسپۆڕ بۆ ماسوولکەسازی و پاوەرلیفتینگ',
    men_f2: 'بەشێ کێشێن گران (Heavy Free Weights & Dumbbells)',
    men_f3: 'بارێ دایت و شەیكێن فرێش و بەهێزکەر',
    men_f4: 'سیستەمێ دەنگی و مۆسیقا ب مۆڕالێ بەرز',
    men_btn: 'ناڤنڤیسین د دەواما زەلامان دا ⚡',
    cleaning_notice_title: '🧹 دەمژمێرا پاقژکرن و ئامادەکاریێ (02:00 نیڤڕۆ – 03:00 ئێڤاری):',
    cleaning_notice_desc: 'د ڤێ دەمژمێرێ دا هۆل دهێتە پاقژکرن، تەعقیمکرن و ئامادەکرن ژ لایێ تیمێ کارگێریێ ڤە بۆ پاراستنا ساخلەمیا هەوە.',
    cleaning_badge: '١ دەمژمێر تەعقیمکرن',
    pricing_badge: 'بها و بەشداری',
    pricing_title: 'پلانێن بەشداریێ یێن <span class="text-primary">بلۆ جیم</span>',
    pricing_subtitle: 'باشترین بها و گونجایترین ئۆفەر بۆ تەندروستیا تە و ئاڤاکرنا لەشەکێ بهێز',
    plan_1_name: 'بەشداریا ئێک هەیڤ',
    plan_1_desc: 'گونجایە بۆ کەسێن نوی و وان یێن دڤێت ڕاهێنانێن خۆ تاقی بکەن.',
    plan_1_period: 'بۆ دەمێ ١ هەیڤ',
    plan_1_f1: 'هەمی ئامیرێن لەشجوانیێ و فیتنێسێ',
    plan_1_f2: 'خزمەتگوزاریا گەرمئاڤێ و حەمامێ',
    plan_1_f3: 'ڕێبەریا سەرەتایی ژ لایێ ڕاهێنەری ڤە',
    plan_1_btn: 'ناڤنڤیسین د ڤێ پلانێ دا',
    plan_2_ribbon: '⭐ ئۆفەرا بهێز یا تایبەت',
    plan_2_name: 'ئۆفەرا ٣ هەیڤ + هەیڤا ٤',
    plan_2_desc: '٣ هەیڤان بەشدار ببە، هەیڤا ٤ ب تنێ ب ٢٥,٠٠٠ دیناران وەربگرە!',
    plan_2_period: 'بۆ ٤ هەیڤان ب تەمامی (پاشکەفتنا ٢٥,٠٠٠ دیناران)',
    plan_2_f1: '٤ هەیڤێن تەمام یێن ڕاهێنانێ بێ سنوور',
    plan_2_f2: 'هەیڤا ٤ ب نیڤا بهایی: بتنێ ٢٥,٠٠٠ دینار',
    plan_2_f3: 'پڕۆگرامێ خۆراکی و سیستەمێ تایبەتێ کێشێ',
    plan_2_f4: '١ ڤەخوارنا دایت یا خۆڕایی ژ دایت بارێ',
    plan_2_btn: 'وەرگرتنا ڤێ ئۆفەرێ',
    plan_3_name: 'پلانا ڤی ئای پی (٦ هەیڤ)',
    plan_3_desc: 'بۆ وەرزشڤانێن ڕژد و ئاستێ بلند دگەل هەمی خزمەتگوزاریێن زێدە.',
    plan_3_period: 'بۆ دەمێ ٦ هەیڤان',
    plan_3_f1: 'ڕاهێنەرێ تایبەت (Personal Trainer)',
    plan_3_f2: 'سۆنا و جاکوزی و لۆکەرێ تایبەت',
    plan_3_f3: 'داشکاندنا ١٥٪ ل سەر هەمی ڤەخوارنان',
    plan_3_btn: 'ناڤنڤیسین د ڤێ پلانێ دا',
    diet_badge: '🥗 بارێ دایت و تەندروستیێ (Diet & Healthy Bar)',
    diet_title: 'مێنیویا <span class="text-primary">تشتێن دایت و ڤەخوارنێن دایت</span>',
    diet_subtitle: 'باشترین و تامخۆشترین ڤەخوارن و ژەمێن تەندروست ب سیفڕ شەکر، کێمترین کالۆری و پرۆتینێ بەرز بۆ دابەزاندنا کێشێ و لەشەکێ ڕێک',
    reg_badge: 'تۆماربوون د سیستەمی دا',
    reg_title: 'فۆڕما <span class="text-primary">ناڤنڤیسینێ</span>',
    reg_subtitle: 'ب کێمتر ژ خولەکەکێ ناڤێ خۆ تۆمار بکە یان پەیوەندیێ ب ژمارا',
    reg_name_label: 'ناڤێ سیانی:',
    reg_name_placeholder: 'بۆ نموونە: کاروان ئەحمەد دهۆکی',
    reg_phone_label: 'ژمارا تەلەفۆنێ:',
    reg_plan_label: 'جۆرێ بەشداریێ:',
    reg_plan_opt1: 'ئۆفەرا تایبەت (٣ هەیڤ + هەیڤا ٤ ب ٢٥,٠٠٠ دیناران) - ١٧٥,٠٠٠ دینار',
    reg_plan_opt2: 'بەشداریا هەیڤانە یا ئاسایی - ٣٠,٠٠٠ دینار',
    reg_plan_opt3: 'پلانا ڤی ئای پی (٦ هەیڤ) - ٢٦٠,٠٠٠ دینار',
    reg_shift_label: 'دەوام / شیفت (دەمی هەلبژێرە):',
    reg_shift_women: '🌸 دەواما ئافرەتان (٠٦:٠٠ سپێدێ - ٠٢:٠٠ نیڤڕۆ)',
    reg_shift_men: '⚡ دەواما زەلامان (٠٣:٠٠ ئێڤاری - ١١:٠٠ شەڤێ)',
    reg_emergency_label: 'ژمارا کەسەکێ نێزیک (کاتی پێتڤی):',
    reg_submit_btn: 'تۆمارکرنا ئەندامیەتێ د هۆلا بلۆ جیم دا 🚀',
    contact_label: 'پەیوەندی و واتسئەپ:',
    footer_text: 'هەمی ماف پاراستینە بۆ هۆلا بلۆ جیم © 2026 | ژمارا تەلەفۆنێ: 0750 990 8866 | دیزاین کرایە ب ڕەنگێ سەرەکی #3784AB',
    currency: 'دینار',
    macro_protein: 'پرۆتین',
    macro_carbs: 'شەکر / کارب',
    macro_cals: 'کالۆری'
  },
  ar: {
    page_title: 'صالة بلو جيم | Blue Gym - أقوى صالة لبناء الأجسام واللياقة',
    brand_tagline: 'صالة بلو جيم الرياضية • بادينان',
    nav_home: 'الرئيسية',
    nav_services: 'الخدمات',
    nav_schedule: 'أوقات الدوام',
    nav_pricing: 'الأسعار والعروض',
    nav_diet: 'قائمة الدايت',
    nav_register: 'التسجيل',
    nav_admin: 'لوحة الإدارة (CMS)',
    nav_join_btn: 'اشترك الآن',
    hero_badge_1: '🔥 أقوى صالة لبناء الأجسام',
    hero_badge_2: '⚡ أجهزة حديثة متطورة 2026',
    hero_badge_3: '🏆 عروض شهرية خاصة',
    hero_title: 'القوة، اللياقة البدنية والصحة مع <span class="text-primary">بلو جيم</span>',
    hero_subtitle: 'صالة بلو جيم هي البيئة المثالية لبناء جسم متناسق وعضلات قوية بأحدث الأجهزة الرياضية العالمية وتحت إشراف أمهر المدربين المعتمدين.',
    hero_cta_register: 'سجل اسمك الآن 🚀',
    hero_cta_pricing: 'الخطط والأسعار الشهرية 💳',
    stat_monthly_label: 'دينار الاشتراك الشهري',
    stat_machines_label: 'جهاز رياضي حديث متكامل',
    stat_trainers_label: 'مدربون خبراء ومعتمدون',
    offer_badge: 'عرض خاص ولفترة محدودة',
    offer_title: 'اشترك لمدة 3 أشهر، واحصل على الشهر الرابع بـ 25,000 دينار فقط!',
    offer_desc: 'فرصة ذهبية للرياضيين! عند تسجيلك لمدة 3 أشهر، ستحصل على الشهر الرابع بنصف السعر (25,000 دينار فقط).',
    offer_old: '30,000 دينار',
    offer_new: '25,000 دينار',
    services_badge: 'خدماتنا المميزة',
    services_title: 'ماذا توفر لك صالة <span class="text-primary">بلو جيم</span>؟',
    services_subtitle: 'لقد جهزنا كل شيء لتمارس تمارينك بأفضل وأحدث المعايير الاحترافية',
    service_1_title: 'أجهزة الأوزان الحرة والحديد',
    service_1_desc: 'أجهزة قياسية عالمية لجميع عضلات الجسم (الصدر، الظهر، الأرجل، الذراعين والأكتاف).',
    service_2_title: 'قسم الكارديو واللياقة',
    service_2_desc: 'أجهزة الجري والدراجات الإلكترونية الحديثة لحرق الدهون ورفع مستوى اللياقة.',
    service_3_title: 'مدربون شخصيون وتغذية',
    service_3_desc: 'برامج تدريبية مخصصة وجداول غذائية مدروسة ومحسوبة السعرات حسب هدفك.',
    service_4_title: 'حمامات وساونا ونظافة تامة',
    service_4_desc: 'أرقى حمامات مياه دافئة وساونا للاسترخاء العضلي مع خزائن خاصة مؤمنة لكل عضو.',
    service_5_title: 'بار الدايت والمشروبات الصحية',
    service_5_desc: 'مشروبات بروتين ووجبات صحية خفيفة بدون سكر لحرق الدهون بعد كل تمرين.',
    service_6_title: 'أوقات دوام الصالة',
    service_6_desc: '🌸 النساء: 06:00 صباحاً - 02:00 ظهراً<br>⚡ الرجال: 03:00 عصراً - 11:00 ليلاً',
    schedule_badge: '⏰ أوقات العمل الرسمية',
    schedule_title: 'جدول مواعيد صالة <span class="text-primary">بلو جيم</span>',
    schedule_subtitle: 'مواعيد منفصلة ومخصصة للنساء والرجال لراحتكم وخصوصيتكم التامة',
    women_badge: 'فترة السيدات (النساء)',
    women_title: 'دوام النساء',
    women_desc: 'بيئة مريحة وخاصة بالكامل مع مدربات لياقة بدنية معتمدات وأحدث أجهزة الرشاقة والكارديو.',
    women_duration: '٨ ساعات متواصلة (06:00 AM - 02:00 PM)',
    women_f1: 'مدربات محترفات ومعتمدات لمتابعة التدريب',
    women_f2: 'قسم كارديو ولياقة بدنية وبرامج إنقاص الوزن',
    women_f3: 'خصوصية وراحة تامة للسيدات',
    women_f4: 'حمامات خاصة وساونا مجهزة ونظيفة',
    women_btn: 'التسجيل في دوام النساء 🌸',
    men_badge: 'فترة الشباب (الرجال)',
    men_title: 'دوام الرجال',
    men_desc: 'أجهزة متطورة، أجواء حماسية ومدربون محترفون في بناء الأجسام ورفع الأثقال.',
    men_duration: '٨ ساعات متواصلة (03:00 PM - 11:00 PM)',
    men_f1: 'مدربون محترفون لبناء الأجسام والباورليفتنج',
    men_f2: 'قسم أوزان ثقيلة ودامبلز بأوزان متعددة',
    men_f3: 'بار دايت ومشروبات طاقة وبروتين منعشة',
    men_f4: 'نظام صوتي وأجواء حماسية محفزة للتدريب',
    men_btn: 'التسجيل في دوام الرجال ⚡',
    cleaning_notice_title: '🧹 ساعة التنظيف والتعقيم (02:00 ظهراً – 03:00 عصراً):',
    cleaning_notice_desc: 'في هذه الساعة يتم تنظيف الصالة وتعقيم جميع الأجهزة الرياضية بدقة لضمان سلامتكم وصحتكم.',
    cleaning_badge: '١ ساعة تعقيم يومي',
    pricing_badge: 'الأسعار والعضويات',
    pricing_title: 'خطط الاشتراك في <span class="text-primary">بلو جيم</span>',
    pricing_subtitle: 'أفضل الأسعار وأقوى العروض لصحتك وبناء قوام رياضي ممتاز',
    plan_1_name: 'اشتراك شهر واحد',
    plan_1_desc: 'مناسب للمشتركين الجدد ولمن يرغب بتجربة التمارين والصالة.',
    plan_1_period: 'لمدة شهر واحد',
    plan_1_f1: 'الدخول لكافة أجهزة بناء الأجسام واللياقة',
    plan_1_f2: 'استخدام الحمامات والمياه الدافئة',
    plan_1_f3: 'إرشادات أولية وشرح الأجهزة من المدرب',
    plan_1_btn: 'سجل في هذه الخطة',
    plan_2_ribbon: '⭐ أقوى عرض مميز',
    plan_2_name: 'عرض 3 أشهر + الشهر الرابع',
    plan_2_desc: 'اشترك لمدة 3 أشهر، واحصل على الشهر الرابع بـ 25,000 دينار فقط!',
    plan_2_period: 'لمدة 4 أشهر كاملة (توفير 25,000 دينار)',
    plan_2_f1: '4 أشهر كاملة من التمارين بدون قيود',
    plan_2_f2: 'الشهر الرابع بنصف السعر: 25,000 دينار فقط',
    plan_2_f3: 'برنامج تدريب ونظام غذائي مخصص',
    plan_2_f4: 'مشروب دايت مجاني من بار الصالة',
    plan_2_btn: 'احصل على هذا العرض',
    plan_3_name: 'خطة VIP (6 أشهر)',
    plan_3_desc: 'للرياضيين الملتزمين وأصحاب الأهداف العالية مع مدرب شخصي وكافة الميزات.',
    plan_3_period: 'لمدة 6 أشهر كاملة',
    plan_3_f1: 'مدرب شخصي لمتابعة التمرين (Personal Trainer)',
    plan_3_f2: 'استخدام الساونا والجاكوزي وخزانة خاصة',
    plan_3_f3: 'خصم 15% على جميع المشروبات والوجبات',
    plan_3_btn: 'سجل في هذه الخطة',
    diet_badge: '🥗 بار الدايت والصحة (Diet & Healthy Bar)',
    diet_title: 'قائمة <span class="text-primary">أطعمة ومشروبات الدايت</span>',
    diet_subtitle: 'أفضل المشروبات والوجبات الصحية الخالية من السكر وقليلة السعرات الحرارية لإنقاص الوزن والرشاقة',
    reg_badge: 'التسجيل في النظام',
    reg_title: 'استمارة <span class="text-primary">التسجيل</span>',
    reg_subtitle: 'سجل اسمك في أقل من دقيقة أو اتصل على الرقم',
    reg_name_label: 'الاسم الثلاثي:',
    reg_name_placeholder: 'مثال: أحمد علي دهوكي',
    reg_phone_label: 'رقم الهاتف:',
    reg_plan_label: 'نوع الاشتراك:',
    reg_plan_opt1: 'عرض خاص (3 أشهر + الشهر الرابع بـ 25,000 دينار) - 175,000 دينار',
    reg_plan_opt2: 'اشتراك شهري عادي - 30,000 دينار',
    reg_plan_opt3: 'خطة VIP (6 أشهر) - 260,000 دينار',
    reg_shift_label: 'فترة الدوام (اختر الوجبة المناسبة):',
    reg_shift_women: '🌸 دوام النساء (06:00 صباحاً - 02:00 ظهراً)',
    reg_shift_men: '⚡ دوام الرجال (03:00 عصراً - 11:00 ليلاً)',
    reg_emergency_label: 'رقم شخص قريب (للطوارئ):',
    reg_submit_btn: 'تأكيد الاشتراك في صالة بلو جيم 🚀',
    contact_label: 'الاتصال وواتساب:',
    footer_text: 'جميع الحقوق محفوظة لصالة بلو جيم © 2026 | رقم الهاتف: 0750 990 8866 | اللون الأساسي #3784AB',
    currency: 'دينار',
    macro_protein: 'بروتين',
    macro_carbs: 'سكر / كارب',
    macro_cals: 'سعرة'
  }
};

// Default State if not modified in Admin Panel
const defaultConfig = {
  gymPhone: '0750 990 8866',
  monthlyFee: 30000,
  specialOfferMonthFee: 25000,
  specialOfferTitle: 'ئۆفەرا بهێز: ٣ هەیڤان بەشدار ببە، هەیڤا ٤ ب تنێ ب ٢٥,٠٠٠ دیناران وەربگرە!',
  specialOfferDesc: 'دەلیڤەیەکا زێڕین بۆ سەرکەفتنێ! ئەگەر هین بۆ ماوێ ٣ هەیڤان بەشدار ببن، هەیڤا چوارێ بتنێ ب نیڤا بهایی (٢٥,٠٠٠ دینار) دێ وەرگرن.',
  activeNotice: 'دەرگەهێن هۆلا بلۆ جیم ڕۆژانە ڤەکری نە: ئافرەتان (٠٦:٠٠ سپێدێ - ٠٢:٠٠ نیڤڕۆ) و زەلامان (٠٣:٠٠ ئێڤاری - ١١:٠٠ شەڤێ).',
  womenShift: '06:00 سپێدێ - 02:00 نیڤڕۆ',
  menShift: '03:00 ئێڤاری - 11:00 شەڤێ',
  cleaningShift: '02:00 نیڤڕۆ - 03:00 ئێڤاری',
  shakes: dietItemsI18n.ku
};

// Initial Seed Members for Admin Demo
const seedMembers = [
  {
    id: 'MEM-101',
    fullName: 'کاروان ئەحمەد دهۆکی',
    phone: '0750 123 4567',
    plan: 'monthly',
    shift: 'men',
    registeredAt: '2026-09-14',
    status: 'چالاک',
    emergencyContact: '0750 987 6543'
  },
  {
    id: 'MEM-102',
    fullName: 'ڕێبین شێروان زاخۆیی',
    phone: '0750 445 8899',
    plan: 'special-3m',
    shift: 'men',
    registeredAt: '2026-09-15',
    status: 'چالاک',
    emergencyContact: '0750 111 2233'
  },
  {
    id: 'MEM-103',
    fullName: 'ڕۆژین نەجمەدین سێمێلی',
    phone: '0750 334 5566',
    plan: 'monthly',
    shift: 'women',
    registeredAt: '2026-09-16',
    status: 'چالاک',
    emergencyContact: '0750 778 9900'
  }
];

// Current Language Getter & Setter
function getCurrentLang() {
  return localStorage.getItem(BLUE_GYM_LANG_KEY) || 'ku';
}

function formatIQD(amount) {
  const lang = getCurrentLang();
  return Number(amount).toLocaleString('en-US') + ' ' + (lang === 'ar' ? 'دينار' : 'دینار');
}

// Get Config
function getGymConfig() {
  const saved = localStorage.getItem(BLUE_GYM_CONFIG_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      let needsSave = false;
      if (parsed.monthlyFee === 50000) {
        parsed.monthlyFee = 30000;
        needsSave = true;
      }
      if (!parsed.dietItemsUpdated || (parsed.shakes && parsed.shakes[0] && parsed.shakes[0].name.includes('بلۆ بیست'))) {
        parsed.shakes = dietItemsI18n.ku;
        parsed.dietItemsUpdated = true;
        needsSave = true;
      }
      if (needsSave) {
        localStorage.setItem(BLUE_GYM_CONFIG_KEY, JSON.stringify(parsed));
      }
      return { ...defaultConfig, ...parsed };
    } catch (e) {
      console.error(e);
    }
  }
  return defaultConfig;
}

// Get Members
function getGymMembers() {
  const saved = localStorage.getItem(BLUE_GYM_MEMBERS_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
  }
  localStorage.setItem(BLUE_GYM_MEMBERS_KEY, JSON.stringify(seedMembers));
  return seedMembers;
}

// Apply Language to UI
function setLanguage(lang) {
  const validLang = (lang === 'ar') ? 'ar' : 'ku';
  localStorage.setItem(BLUE_GYM_LANG_KEY, validLang);
  document.documentElement.lang = validLang;
  document.documentElement.dir = 'rtl';

  const t = translations[validLang];

  // Document Title
  if (t.page_title) document.title = t.page_title;

  // Translate all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  // Translate Input Placeholders
  const nameInput = document.getElementById('regName');
  if (nameInput && t.reg_name_placeholder) {
    nameInput.placeholder = t.reg_name_placeholder;
  }

  // Translate Select Options
  const planSelect = document.getElementById('regPlan');
  if (planSelect) {
    const opt1 = planSelect.querySelector('option[value="special-3m"]');
    const opt2 = planSelect.querySelector('option[value="monthly"]');
    const opt3 = planSelect.querySelector('option[value="vip-6m"]');
    if (opt1) opt1.textContent = t.reg_plan_opt1;
    if (opt2) opt2.textContent = t.reg_plan_opt2;
    if (opt3) opt3.textContent = t.reg_plan_opt3;
  }

  const shiftSelect = document.getElementById('regShift');
  if (shiftSelect) {
    const optW = shiftSelect.querySelector('option[value="women"]');
    const optM = shiftSelect.querySelector('option[value="men"]');
    if (optW) optW.textContent = t.reg_shift_women;
    if (optM) optM.textContent = t.reg_shift_men;
  }

  // Update active state on language switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === validLang);
  });

  // Re-render Dynamic Values
  applyGymDataToUI();
}

// Render Dynamic Values on Page
function applyGymDataToUI() {
  const config = getGymConfig();
  const lang = getCurrentLang();
  const t = translations[lang] || translations.ku;

  // Monthly Price
  const monthlyEl = document.getElementById('priceMonthly');
  if (monthlyEl) {
    monthlyEl.textContent = Number(config.monthlyFee).toLocaleString('en-US');
  }

  // Special Offer Elements
  const offerTitleEl = document.getElementById('offerBannerTitle');
  if (offerTitleEl) {
    offerTitleEl.textContent = (lang === 'ar') ? t.offer_title : config.specialOfferTitle;
  }

  const offerDescEl = document.getElementById('offerBannerDesc');
  if (offerDescEl) {
    offerDescEl.textContent = (lang === 'ar') ? t.offer_desc : config.specialOfferDesc;
  }

  const offerPriceEl = document.getElementById('offerMonth4Price');
  if (offerPriceEl) {
    offerPriceEl.textContent = Number(config.specialOfferMonthFee).toLocaleString('en-US') + ' ' + t.currency;
  }

  // Shift Times Display
  const womenTimeEl = document.getElementById('womenTimeDisplay');
  if (womenTimeEl) {
    womenTimeEl.textContent = (lang === 'ar') ? '06:00 صباحاً - 02:00 ظهراً' : config.womenShift;
  }

  const menTimeEl = document.getElementById('menTimeDisplay');
  if (menTimeEl) {
    menTimeEl.textContent = (lang === 'ar') ? '03:00 عصراً - 11:00 ليلاً' : config.menShift;
  }

  // Render Diet Items & Drinks
  const shakeContainer = document.getElementById('shakeMenuGrid');
  const items = dietItemsI18n[lang] || dietItemsI18n.ku;
  if (shakeContainer && items) {
    shakeContainer.innerHTML = items.map(item => `
      <div class="shake-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
          <span class="badge ${item.category.includes('ڤەخوارن') || item.category.includes('مشروب') ? 'badge-clean' : 'badge-offer'}" style="font-size: 0.75rem;">
            ${item.category}
          </span>
          <span class="shake-price">${formatIQD(item.price)}</span>
        </div>
        <div class="shake-header" style="margin-bottom: 0.5rem;">
          <h3 style="font-size: 1.15rem;">${item.name}</h3>
        </div>
        <p class="shake-desc">${item.desc}</p>
        <div class="shake-macros">
          <div class="macro-item">
            <span class="macro-label">${t.macro_protein}</span>
            <span class="macro-val">${item.protein}</span>
          </div>
          <div class="macro-item">
            <span class="macro-label">${t.macro_carbs}</span>
            <span class="macro-val">${item.carbs}</span>
          </div>
          <div class="macro-item">
            <span class="macro-label">${t.macro_cals}</span>
            <span class="macro-val">${item.cals}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Check live status
  updateLiveGymStatus();
}

// Real-Time Gym Status Indicator (Women: 06:00 - 14:00, Cleaning: 14:00 - 15:00, Men: 15:00 - 23:00)
function updateLiveGymStatus() {
  const now = new Date();
  const hours = now.getHours();
  const lang = getCurrentLang();

  const liveDot = document.getElementById('livePulseDot');
  const liveText = document.getElementById('liveStatusText');
  const womenCard = document.getElementById('womenShiftCard');
  const menCard = document.getElementById('menShiftCard');

  if (!liveDot || !liveText) return;

  liveDot.className = 'pulse-dot';
  if (womenCard) womenCard.classList.remove('active-shift-card');
  if (menCard) menCard.classList.remove('active-shift-card');

  if (hours >= 6 && hours < 14) {
    liveDot.classList.add('pulse-pink');
    liveText.innerHTML = (lang === 'ar')
      ? `🌸 <strong>الحالة الآن:</strong> الصالة مفتوحة حالياً للنساء (السيدات) (06:00 صباحاً - 02:00 ظهراً)`
      : `🌸 <strong>دۆخێ نوکە:</strong> هۆل یا ڤەکریە بۆ خانمان و ئافرەتان (٠٦:٠٠ سپێدێ - ٠٢:٠٠ نیڤڕۆ)`;
    if (womenCard) womenCard.classList.add('active-shift-card');
  } else if (hours >= 14 && hours < 15) {
    liveDot.classList.add('pulse-gold');
    liveText.innerHTML = (lang === 'ar')
      ? `🧹 <strong>الحالة الآن:</strong> وقت تنظيف وتعقيم الصالة (02:00 ظهراً - 03:00 عصراً)`
      : `🧹 <strong>دۆخێ نوکە:</strong> دەمژمێرا پاقژکرن و تەقیمکرنا هۆلێ یە (٠٢:٠٠ نیڤڕۆ - ٠٣:٠٠ ئێڤاری)`;
  } else if (hours >= 15 && hours < 23) {
    liveDot.classList.add('pulse-cyan');
    liveText.innerHTML = (lang === 'ar')
      ? `⚡ <strong>الحالة الآن:</strong> الصالة مفتوحة حالياً للرجال (الشباب) (03:00 عصراً - 11:00 ليلاً)`
      : `⚡ <strong>دۆخێ نوکە:</strong> هۆل یا ڤەکریە بۆ پیاوان و زەلامان (٠٣:٠٠ ئێڤاری - ١١:٠٠ شەڤێ)`;
    if (menCard) menCard.classList.add('active-shift-card');
  } else {
    liveDot.classList.add('pulse-red');
    liveText.innerHTML = (lang === 'ar')
      ? `🔴 <strong>الحالة الآن:</strong> الصالة مغلقة حالياً • تفتح غداً في الساعة 06:00 صباحاً للنساء`
      : `🔴 <strong>دۆخێ نوکە:</strong> هۆل نۆکە یا گرتیە • سپێدێ ل دەمژمێر ٠٦:٠٠ بۆ خانمان ڤەدبیت`;
  }
}

// Handle User Registration Form
function setupRegistrationForm() {
  const form = document.getElementById('memberRegisterForm');
  const alertBox = document.getElementById('registerSuccessAlert');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const lang = getCurrentLang();
    const fullName = document.getElementById('regName').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const plan = document.getElementById('regPlan').value;
    const shift = document.getElementById('regShift') ? document.getElementById('regShift').value : 'men';
    const emergencyContact = document.getElementById('regEmergency').value.trim() || ((lang === 'ar') ? 'غير محدد' : 'نەدیار');

    if (!fullName || !phone) {
      alert((lang === 'ar') ? 'يرجى ملء الاسم ورقم الهاتف بالكامل.' : 'هیڤیە ناڤ و ژمارا تەلەفۆنێ ب تمامی تژی بکەن.');
      return;
    }

    const members = getGymMembers();
    const newMember = {
      id: 'MEM-' + (Math.floor(Math.random() * 900) + 100),
      fullName,
      phone,
      plan,
      shift,
      registeredAt: new Date().toISOString().split('T')[0],
      status: (lang === 'ar') ? 'نشط' : 'چالاک',
      emergencyContact
    };

    members.unshift(newMember);
    localStorage.setItem(BLUE_GYM_MEMBERS_KEY, JSON.stringify(members));

    // Show Success message in chosen language
    if (alertBox) {
      if (lang === 'ar') {
        const shiftLabel = (shift === 'women') ? 'دوام النساء (06:00 صباحاً - 02:00 ظهراً)' : 'دوام الرجال (03:00 عصراً - 11:00 ليلاً)';
        alertBox.innerHTML = `
          <strong>أهلاً وسهلاً بك يا ${fullName}!</strong> تم تسجيل اشتراكك بنجاح.
          رمز العضوية الخاص بك: <span style="font-weight:900; color:#fff; background:#3784AB; padding:2px 8px; border-radius:4px;">${newMember.id}</span>
          <br>فترة الدوام المختارة: <strong>${shiftLabel}</strong>
          <br>سيتواصل معك فريق صالة بلو جيم قريباً عبر الهاتف (<a href="tel:07509908866" dir="ltr" style="color:#00F0FF; font-weight:bold;">0750 990 8866</a>).
        `;
      } else {
        const shiftLabel = (shift === 'women') ? 'دەواما ئافرەتان (٠٦:٠٠ سپێدێ - ٠٢:٠٠ نیڤڕۆ)' : 'دەواما زەلامان (٠٣:٠٠ ئێڤاری - ١١:٠٠ شەڤێ)';
        alertBox.innerHTML = `
          <strong>دەستخۆش ${fullName}!</strong> ناڤنڤیسینا تە ب سەرکەفتیانە هاتە ئەنجامدان.
          کۆدێ بەشداریا تە: <span style="font-weight:900; color:#fff; background:#3784AB; padding:2px 8px; border-radius:4px;">${newMember.id}</span>
          <br>دەواما هەلبژارتی: <strong>${shiftLabel}</strong>
          <br>تیمێ هۆلا بلۆ جیم دێ ب ڕێکا تەلەفۆنێ (<a href="tel:07509908866" dir="ltr" style="color:#00F0FF; font-weight:bold;">0750 990 8866</a>) پەیوەندیێ ب تە کەت.
        `;
      }
      alertBox.classList.add('success');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    form.reset();
  });
}

// Setup Language Switcher Listener
function setupLanguageSwitcher() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedLang = e.currentTarget.getAttribute('data-lang');
      setLanguage(selectedLang);
    });
  });
}

// Setup Navbar: mobile menu, scroll state, active section highlight
function setupNavbar() {
  const header = document.getElementById('siteHeader');
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  if (!header) return;

  const setMenuOpen = (open) => {
    if (!toggle || !menu) return;
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  if (toggle && menu) {
    toggle.addEventListener('click', () => setMenuOpen(!menu.classList.contains('open')));
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) setMenuOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1100) setMenuOpen(false);
    });
  }

  const navLinks = header.querySelectorAll('.nav-links a, .mobile-links a');
  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter((el, i, arr) => el && arr.indexOf(el) === i);

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);

    const offset = header.offsetHeight + 40;
    let currentId = sections.length ? sections[0].id : null;
    sections.forEach(section => {
      if (section.getBoundingClientRect().top - offset <= 0) currentId = section.id;
    });
    // At the bottom of the page, highlight the last section
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2 && sections.length) {
      currentId = sections[sections.length - 1].id;
    }
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
  const initialLang = getCurrentLang();
  setLanguage(initialLang);
  setupRegistrationForm();
  setupLanguageSwitcher();
  setupNavbar();
  // Keep live status updated every minute
  setInterval(updateLiveGymStatus, 60000);
});
