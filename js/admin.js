/**
 * BLUE GYM - ADMIN CMS CONTROLLER
 * Full management of Prices, Offers, Members, Media, and Reports
 * Bilingual: Kurdish Badini (کوردی بادینی) & Arabic (العربية)
 */

const BLUE_GYM_CONFIG_KEY = 'blue_gym_config_v1';
const BLUE_GYM_MEMBERS_KEY = 'blue_gym_members_v1';
const BLUE_GYM_MEDIA_KEY = 'blue_gym_media_v1';
const BLUE_GYM_LANG_KEY = 'blue_gym_lang';

// Bilingual Translations for Admin Panel
const adminTranslations = {
  ku: {
    admin_page_title: 'پانێلا کارگێریێ | Blue Gym CMS Admin',
    admin_brand_subtitle: 'سیستەمێ کارگێریێ (CMS)',
    admin_nav_overview: 'تەماشایا گشتی (Dashboard)',
    admin_nav_members: 'بڕێڤەبرنا ئەندامان',
    admin_nav_pricing: 'دەستکاریا بها و ئۆفەران',
    admin_nav_diet: 'مێنیویا خۆراک و ڤەخوارنێن دایت',
    admin_nav_media: 'بارکرنا وێنەیان (Media)',
    admin_back_home: '← زڤڕین بۆ مالپەڕێ سەرەکی',
    admin_header_title_pre: 'پانێلا کارگێریێ یا',
    admin_header_subtitle: 'ڕێڤەبرنا بەشداربوویان، گوهۆڕینا بهایان، ئۆفەرا هەیڤا ٤ و بەڕێوەبرنا ناڤەڕۆکێ',
    admin_export_btn: 'داگرتنا لیستا ئەندامان (JSON/Backup)',
    admin_kpi_members: 'ئەندامێن بەشداربووی',
    admin_kpi_revenue: 'داهاتێ گشتی یێ پێشبینیکری',
    admin_kpi_price: 'بهایێ هەیڤانە یێ چالاک',
    admin_pricing_title: 'دەستکاریکردنا بهایێن هۆلێ و ئۆفەرا هەیڤانە',
    admin_label_monthly: 'بهایێ بەشداریا هەیڤانە (دینارێن عیراقی):',
    admin_label_offer: 'بهایێ هەیڤا چوارێ د ئۆفەرا تایبەت دا (دینار):',
    admin_label_women_shift: 'دەواما ئافرەتان (خانمان):',
    admin_label_men_shift: 'دەواما زەلامان (پیاوان):',
    admin_label_offer_title: 'سەردێڕێ ئۆفەرا تایبەت:',
    admin_label_offer_desc: 'شڕۆڤەکرنا ئۆفەرێ بۆ بەشداربوویان:',
    admin_btn_save_pricing: 'پاشکەفتنا گوهۆڕینان و نیشاندان ل سەر مالپەڕی 💾',
    admin_members_title: 'لیستا ناڤنڤیسینێن ئەندامان',
    search_placeholder: 'لێگەڕیان ب ناڤ یان تەلەفۆن...',
    admin_btn_refresh: 'نویژەنکرن',
    th_code: 'کۆد',
    th_name: 'ناڤێ سیانی',
    th_phone: 'ژمارا تەلەفۆنێ',
    th_shift: 'دەوام / شیفت',
    th_plan: 'پلان',
    th_reg_date: 'ڕۆژا ناڤنڤیسینێ',
    th_status: 'دۆخ',
    th_actions: 'کردار',
    admin_media_title: 'بارکرنا وێنەیێن هۆلێ و دیزاینێن نوی (Media Upload)',
    admin_media_badge: 'وێنەیێن چالاک',
    admin_media_desc: 'هین دشێن وێنەیێن تایبەت ب هۆلا بلۆ جیم، ئامیرێن نوی، و پۆستەرێن ڕیکلامێ بار بکەن. وێنە دێ ل سیستەمی دا هێنە پاراستن.',
    admin_dropzone_title: 'وێنەی ڕابکێشە ڤێرێ یان کلیک بکە بۆ هەلبژارتنێ',
    admin_dropzone_note: '(PNG, JPG, WEBP - پەسەندکراو بۆ وێنەیێن هۆلێ)',
    currency: 'دینار',
    no_members: 'چ ئەندام نەهاتنە دیتن ل دیڤ ڤێ گەڕیانێ.',
    plan_offer: 'ئۆفەرا ٣+١ (١٧٥,٠٠٠ دینار)',
    plan_monthly: 'هەیڤانە (٣٠,٠٠٠ دینار)',
    plan_vip: 'VIP (٢٦٠,٠٠٠ دینار)',
    shift_women_badge: '🌸 خانمان (٦-٢)',
    shift_men_badge: '⚡ پیاوان (٣-١١)',
    status_active: 'چالاک',
    status_inactive: 'ڕاوەستای',
    btn_activate: 'چالاککرن',
    btn_pause: 'ڕاوەستاندن',
    btn_delete: 'ژێبرن',
    confirm_delete: 'ئەرێ تو پشتڕاستی تە دڤێت ڤی ئەندامی ژێببەی؟',
    toast_deleted: 'ئەندام ب سەرکەفتیانە ژ سیستەمی هاتە ژێبرن.',
    toast_status_changed: 'دۆخێ ئەندامی هاتە گوهۆڕین بۆ:',
    toast_saved_pricing: '✓ بهایێن نوی، خشتەیێ دەوامێ و ئۆفەرا هەیڤا ٤ ب سەرکەفتیانە هاتنە پاراستن!',
    toast_backup_downloaded: 'پاشکەفتا زانیاریان (Backup) ب سەرکەفتیانە هاتە داگرتن.',
    toast_list_refreshed: 'لیست هاتە نویژەنکرن.',
    no_images: 'چ وێنە نەهاتینە بارکرن هەتا نۆکە.',
    toast_image_uploaded: 'وێنە ب سەرکەفتیانە هاتە بارکرن و پاراستن!',
    toast_image_deleted: 'وێنە هاتە ژێبرن.'
  },
  ar: {
    admin_page_title: 'لوحة التحكم | Blue Gym CMS Admin',
    admin_brand_subtitle: 'نظام الإدارة (CMS)',
    admin_nav_overview: 'نظرة عامة (Dashboard)',
    admin_nav_members: 'إدارة الأعضاء المشتركين',
    admin_nav_pricing: 'تعديل الأسعار والعروض',
    admin_nav_diet: 'قائمة أطعمة ومشروبات الدايت',
    admin_nav_media: 'رفع وتعديل الصور (Media)',
    admin_back_home: '← العودة إلى الموقع الرئيسي',
    admin_header_title_pre: 'لوحة التحكم الخاصة بـ',
    admin_header_subtitle: 'إدارة المشتركين، تعديل الأسعار، عرض الشهر الرابع وإدارة المحتوى الرياضي',
    admin_export_btn: 'تصدير بيانات الأعضاء (نسخة احتياطية)',
    admin_kpi_members: 'الأعضاء المشتركون',
    admin_kpi_revenue: 'الإيراد الإجمالي المتوقع',
    admin_kpi_price: 'سعر الاشتراك الشهري الفعّال',
    admin_pricing_title: 'تعديل أسعار القاعة والعروض الشهرية',
    admin_label_monthly: 'سعر الاشتراك الشهري (دينار عراقي):',
    admin_label_offer: 'سعر الشهر الرابع في العرض الخاص (دينار):',
    admin_label_women_shift: 'فترة السيدات (النساء):',
    admin_label_men_shift: 'فترة الرجال:',
    admin_label_offer_title: 'عنوان العرض الخاص:',
    admin_label_offer_desc: 'شرح وتفاصيل العرض للمشتركين:',
    admin_btn_save_pricing: 'حفظ التعديلات والتحديث المباشر على الموقع 💾',
    admin_members_title: 'قائمة تسجيلات الأعضاء المشتركين',
    search_placeholder: 'بحث بالاسم أو الهاتف أو الكود...',
    admin_btn_refresh: 'تحديث',
    th_code: 'الكود',
    th_name: 'الاسم الثلاثي',
    th_phone: 'رقم الهاتف',
    th_shift: 'الفترة / الشفت',
    th_plan: 'الخطة',
    th_reg_date: 'تاريخ التسجيل',
    th_status: 'الحالة',
    th_actions: 'الإجراءات',
    admin_media_title: 'رفع صور الصالة والتصميمات (Media Upload)',
    admin_media_badge: 'الصور النشطة',
    admin_media_desc: 'يمكنكم رفع صور خاصة بقاعة بلو جيم، الأجهزة الحديثة، والبوسترات الإعلانية لحفظها داخل النظام.',
    admin_dropzone_title: 'اسحب الصور إلى هنا أو انقر للاختيار',
    admin_dropzone_note: '(PNG, JPG, WEBP - المدعومة لصور القاعة)',
    currency: 'دينار',
    no_members: 'لا يوجد أعضاء يطابقون عملية البحث.',
    plan_offer: 'عرض ٣+١ (١٧٥,٠٠٠ دينار)',
    plan_monthly: 'شهري (٣٠,٠٠٠ دينار)',
    plan_vip: 'VIP (٢٦٠,٠٠٠ دينار)',
    shift_women_badge: '🌸 سيدات (٦-٢)',
    shift_men_badge: '⚡ رجال (٣-١١)',
    status_active: 'نشط',
    status_inactive: 'متوقف',
    btn_activate: 'تفعيل',
    btn_pause: 'إيقاف',
    btn_delete: 'حذف',
    confirm_delete: 'هل أنت متأكد من رغبتك في حذف هذا العضو المشترك؟',
    toast_deleted: 'تم حذف العضو المشترك بنجاح من النظام.',
    toast_status_changed: 'تم تغيير حالة المشترك إلى:',
    toast_saved_pricing: '✓ تم حفظ الأسعار الجديدة، أوقات الفترات، وعرض الشهر الرابع بنجاح!',
    toast_backup_downloaded: 'تم تحميل النسخة الاحتياطية (Backup) بنجاح.',
    toast_list_refreshed: 'تم تحديث القائمة بنجاح.',
    no_images: 'لم يتم رفع أي صور حتى الآن.',
    toast_image_uploaded: 'تم رفع الصورة وحفظها بنجاح!',
    toast_image_deleted: 'تم حذف الصورة بنجاح.'
  }
};

// Language Helpers
function getCurrentAdminLang() {
  return localStorage.getItem(BLUE_GYM_LANG_KEY) || 'ku';
}

function setAdminLanguage(lang) {
  const selectedLang = lang === 'ar' ? 'ar' : 'ku';
  localStorage.setItem(BLUE_GYM_LANG_KEY, selectedLang);
  document.documentElement.lang = selectedLang;

  const dict = adminTranslations[selectedLang];

  // Update text elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Update search input placeholder
  const searchInput = document.getElementById('memberSearchInput');
  if (searchInput && dict.search_placeholder) {
    searchInput.placeholder = dict.search_placeholder;
  }

  // Update switcher buttons active state
  document.querySelectorAll('#adminLangSwitcher .lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === selectedLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Re-render components with translated dynamic text
  renderMembers();
  updateKPIs();
}

// Default configuration if empty
const defaultConfig = {
  gymPhone: '0750 990 8866',
  monthlyFee: 30000,
  specialOfferMonthFee: 25000,
  specialOfferTitle: 'ئۆفەرا بهێز: ٣ هەیڤان بەشدار ببە، هەیڤا ٤ ب تنێ ب ٢٥,٠٠٠ دیناران وەربگرە!',
  specialOfferDesc: 'دەلیڤەیەکا زێڕین بۆ سەرکەفتنێ! ئەگەر هین بۆ ماوێ ٣ هەیڤان بەشدار ببن، هەیڤا چوارێ بتنێ ب نیڤا بهایی (٢٥,٠٠٠ دینار) دێ وەرگرن.',
  womenShift: '06:00 سپێدێ - 02:00 نیڤڕۆ',
  menShift: '03:00 ئێڤاری - 11:00 شەڤێ',
  cleaningShift: '02:00 نیڤڕۆ - 03:00 ئێڤاری',
  shakes: [
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
  ]
};

// Seed members
const seedMembers = [
  {
    id: 'MEM-101',
    fullName: 'کاروان ئەحمەد دهۆکی',
    phone: '0750 123 4567',
    plan: 'monthly',
    shift: 'men',
    registeredAt: '2026-09-14',
    status: 'چالاک'
  },
  {
    id: 'MEM-102',
    fullName: 'ڕێبین شێروان زاخۆیی',
    phone: '0750 445 8899',
    plan: 'special-3m',
    shift: 'men',
    registeredAt: '2026-09-15',
    status: 'چالاک'
  },
  {
    id: 'MEM-103',
    fullName: 'ڕۆژین نەجمەدین سێمێلی',
    phone: '0750 334 5566',
    plan: 'vip-6m',
    shift: 'women',
    registeredAt: '2026-09-16',
    status: 'چالاک'
  }
];

function getConfig() {
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
        parsed.shakes = defaultConfig.shakes;
        parsed.dietItemsUpdated = true;
        needsSave = true;
      }
      if (needsSave) {
        localStorage.setItem(BLUE_GYM_CONFIG_KEY, JSON.stringify(parsed));
      }
      return { ...defaultConfig, ...parsed };
    } catch (e) {}
  }
  return defaultConfig;
}

function saveConfig(cfg) {
  localStorage.setItem(BLUE_GYM_CONFIG_KEY, JSON.stringify(cfg));
}

function getMembers() {
  const saved = localStorage.getItem(BLUE_GYM_MEMBERS_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {}
  }
  localStorage.setItem(BLUE_GYM_MEMBERS_KEY, JSON.stringify(seedMembers));
  return seedMembers;
}

function saveMembers(m) {
  localStorage.setItem(BLUE_GYM_MEMBERS_KEY, JSON.stringify(m));
}

function getUploadedMedia() {
  const saved = localStorage.getItem(BLUE_GYM_MEDIA_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveUploadedMedia(media) {
  localStorage.setItem(BLUE_GYM_MEDIA_KEY, JSON.stringify(media));
}

// Show Toast
function showToast(msg) {
  const toast = document.getElementById('adminToast');
  if (!toast) return;
  toast.innerHTML = msg;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 4000);
}

// Load and populate Price & Offer Form
function initPriceCMS() {
  const config = getConfig();
  const lang = getCurrentAdminLang();
  const dict = adminTranslations[lang];

  document.getElementById('cmsMonthlyFee').value = config.monthlyFee;
  document.getElementById('cmsOfferFee').value = config.specialOfferMonthFee;
  document.getElementById('cmsOfferTitle').value = config.specialOfferTitle;
  document.getElementById('cmsOfferDesc').value = config.specialOfferDesc;
  if (document.getElementById('cmsWomenShift')) {
    document.getElementById('cmsWomenShift').value = config.womenShift || '06:00 سپێدێ - 02:00 نیڤڕۆ';
  }
  if (document.getElementById('cmsMenShift')) {
    document.getElementById('cmsMenShift').value = config.menShift || '03:00 ئێڤاری - 11:00 شەڤێ';
  }

  const form = document.getElementById('priceOfferForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const updated = {
      ...config,
      monthlyFee: Number(document.getElementById('cmsMonthlyFee').value),
      specialOfferMonthFee: Number(document.getElementById('cmsOfferFee').value),
      womenShift: document.getElementById('cmsWomenShift') ? document.getElementById('cmsWomenShift').value.trim() : config.womenShift,
      menShift: document.getElementById('cmsMenShift') ? document.getElementById('cmsMenShift').value.trim() : config.menShift,
      specialOfferTitle: document.getElementById('cmsOfferTitle').value.trim(),
      specialOfferDesc: document.getElementById('cmsOfferDesc').value.trim()
    };
    saveConfig(updated);
    updateKPIs();
    const curDict = adminTranslations[getCurrentAdminLang()];
    showToast(curDict.toast_saved_pricing);
  });
}

// Render Member Table
function renderMembers(filterText = '') {
  const members = getMembers();
  const tbody = document.getElementById('memberTableBody');
  if (!tbody) return;

  const lang = getCurrentAdminLang();
  const dict = adminTranslations[lang];

  const filtered = members.filter(m => {
    const q = filterText.toLowerCase();
    return (m.fullName && m.fullName.toLowerCase().includes(q)) ||
           (m.phone && m.phone.includes(q)) ||
           (m.id && m.id.toLowerCase().includes(q));
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; color: var(--text-dim); padding: 2rem;">
          ${dict.no_members}
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(m => {
    let planBadge = '';
    if (m.plan === 'special-3m') {
      planBadge = `<span class="badge badge-offer">${dict.plan_offer}</span>`;
    } else if (m.plan === 'monthly') {
      planBadge = `<span class="badge badge-spray">${dict.plan_monthly}</span>`;
    } else {
      planBadge = `<span class="badge badge-clean">${dict.plan_vip}</span>`;
    }

    const isWomen = m.shift === 'women';
    const shiftBadge = isWomen
      ? `<span class="badge badge-women">${dict.shift_women_badge}</span>`
      : `<span class="badge badge-men">${dict.shift_men_badge}</span>`;

    const isPending = m.status === 'ڕاوەستای' || m.status === 'متوقف';
    const statusText = isPending ? dict.status_inactive : dict.status_active;

    return `
      <tr>
        <td><strong>${m.id}</strong></td>
        <td>${m.fullName}</td>
        <td><span dir="ltr">${m.phone}</span></td>
        <td>${shiftBadge}</td>
        <td>${planBadge}</td>
        <td>${m.registeredAt || '-'}</td>
        <td>
          <span class="badge ${isPending ? 'badge-danger' : 'badge-clean'}">${statusText}</span>
        </td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="toggleMemberStatus('${m.id}')" style="padding: 0.25rem 0.6rem; font-size: 0.78rem;">
            ${isPending ? dict.btn_activate : dict.btn_pause}
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteMember('${m.id}')" style="padding: 0.25rem 0.6rem; font-size: 0.78rem;">
            ${dict.btn_delete}
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// Delete Member
window.deleteMember = function(id) {
  const lang = getCurrentAdminLang();
  const dict = adminTranslations[lang];

  if (confirm(dict.confirm_delete)) {
    let members = getMembers();
    members = members.filter(m => m.id !== id);
    saveMembers(members);
    renderMembers();
    updateKPIs();
    showToast(dict.toast_deleted);
  }
};

// Toggle Member Status
window.toggleMemberStatus = function(id) {
  const lang = getCurrentAdminLang();
  const dict = adminTranslations[lang];

  const members = getMembers();
  const target = members.find(m => m.id === id);
  if (target) {
    const isNowActive = target.status === 'ڕاوەستای' || target.status === 'متوقف';
    target.status = isNowActive ? (lang === 'ar' ? 'نشط' : 'چالاک') : (lang === 'ar' ? 'متوقف' : 'ڕاوەستای');
    saveMembers(members);
    renderMembers();
    updateKPIs();
    showToast(`${dict.toast_status_changed} ${target.status}`);
  }
};

// Calculate and render KPIs
function updateKPIs() {
  const members = getMembers();
  const config = getConfig();
  const lang = getCurrentAdminLang();
  const dict = adminTranslations[lang];

  const totalMembersEl = document.getElementById('kpiTotalMembers');
  const revenueEl = document.getElementById('kpiEstimatedRevenue');
  const activePriceEl = document.getElementById('kpiActivePrice');

  if (totalMembersEl) totalMembersEl.textContent = members.length;
  if (activePriceEl) activePriceEl.textContent = Number(config.monthlyFee).toLocaleString('en-US') + ' ' + dict.currency;

  // Estimate revenue
  let totalRev = 0;
  members.forEach(m => {
    if (m.plan === 'special-3m') totalRev += 175000;
    else if (m.plan === 'vip-6m') totalRev += 260000;
    else totalRev += config.monthlyFee;
  });

  if (revenueEl) revenueEl.textContent = totalRev.toLocaleString('en-US') + ' ' + dict.currency;
}

// Media Upload Handling
function initMediaUploader() {
  const dropzone = document.getElementById('mediaDropzone');
  const fileInput = document.getElementById('mediaFileInput');
  const previewGrid = document.getElementById('uploadedImagesGrid');

  if (!dropzone || !fileInput) return;

  dropzone.addEventListener('click', () => fileInput.click());

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.style.borderColor = 'var(--primary-light)';
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.style.borderColor = 'var(--border-color)';
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.style.borderColor = 'var(--border-color)';
    if (e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length) {
      handleFiles(fileInput.files);
    }
  });

  function handleFiles(files) {
    const existing = getUploadedMedia();
    const lang = getCurrentAdminLang();
    const dict = adminTranslations[lang];

    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        existing.push({
          id: 'IMG-' + Date.now() + '-' + Math.floor(Math.random() * 100),
          name: file.name,
          src: event.target.result,
          uploadedAt: new Date().toLocaleDateString(lang === 'ar' ? 'ar-IQ' : 'ku-IQ')
        });
        saveUploadedMedia(existing);
        renderMediaGrid();
        showToast(dict.toast_image_uploaded);
      };
      reader.readAsDataURL(file);
    });
  }

  function renderMediaGrid() {
    const media = getUploadedMedia();
    const lang = getCurrentAdminLang();
    const dict = adminTranslations[lang];

    if (!previewGrid) return;

    if (media.length === 0) {
      previewGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; color: var(--text-dim); padding: 1rem;">
          ${dict.no_images}
        </div>
      `;
      return;
    }

    previewGrid.innerHTML = media.map(item => `
      <div class="image-preview-box">
        <img src="${item.src}" alt="${item.name}">
        <button class="btn-delete-img" onclick="deleteImage('${item.id}')" title="Delete">✕</button>
      </div>
    `).join('');
  }

  window.deleteImage = function(id) {
    let media = getUploadedMedia();
    media = media.filter(m => m.id !== id);
    saveUploadedMedia(media);
    renderMediaGrid();
    const dict = adminTranslations[getCurrentAdminLang()];
    showToast(dict.toast_image_deleted);
  };

  renderMediaGrid();
}

// Export members data backup
function initExport() {
  const exportBtn = document.getElementById('exportDataBtn');
  if (!exportBtn) return;

  exportBtn.addEventListener('click', () => {
    const data = {
      config: getConfig(),
      members: getMembers(),
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blue-gym-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    const dict = adminTranslations[getCurrentAdminLang()];
    showToast(dict.toast_backup_downloaded);
  });
}

// Search Filter
function initSearch() {
  const searchInput = document.getElementById('memberSearchInput');
  const refreshBtn = document.getElementById('refreshMembersBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderMembers(e.target.value.trim());
    });
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      renderMembers();
      updateKPIs();
      const dict = adminTranslations[getCurrentAdminLang()];
      showToast(dict.toast_list_refreshed);
    });
  }
}

// Setup Admin Language Switcher
function setupAdminLanguageSwitcher() {
  const switcher = document.getElementById('adminLangSwitcher');
  if (!switcher) return;

  switcher.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.getAttribute('data-lang');
      setAdminLanguage(targetLang);
    });
  });
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = getCurrentAdminLang();
  setupAdminLanguageSwitcher();
  setAdminLanguage(savedLang);
  initPriceCMS();
  renderMembers();
  updateKPIs();
  initMediaUploader();
  initExport();
  initSearch();
});
