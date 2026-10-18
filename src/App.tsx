/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Globe, 
  Bell, 
  Home, 
  HelpCircle, 
  Building, 
  User, 
  ChevronDown, 
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Check
} from 'lucide-react';
import { 
  COMMODITIES, 
  CommodityItem, 
  LanguageMode,
  t,
  getCommodityName
} from './data/translations';
import { 
  TruckStockIllustration, 
  StockUsageIllustration, 
  BalanceShelfIllustration, 
  SetuShareIllustration, 
  DailyMenuIllustration, 
  AttendanceIllustration, 
  MealPhotoIllustration, 
  SmartRationIllustration, 
  DownloadReportIllustration 
} from './components/CardIllustrations';
import { StockInwardView } from './components/StockInwardView';
import { StockUsageView } from './components/StockUsageView';
import { BalanceRemainingView } from './components/BalanceRemainingView';
import { 
  SetuShareModal, 
  DailyMenuModal, 
  AttendanceModal, 
  MealPhotoModal, 
  SmartRationModal, 
  DownloadReportModal,
  HelpModal,
  CentreDetailsModal,
  ProfileModal 
} from './components/OtherFeatureModals';
import { 
  recordStockAction, 
  subscribeToActiveStock, 
  fetchActiveStockRest,
  DEFAULT_VILLAGE
} from './services/firebase';

type ActiveView = 'home' | 'inward' | 'usage' | 'balance';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  
  // Persistent language state (defaulting to Gujarati as requested for Gujarat Anganwadi, with seamless toggle to English or Bilingual)
  const [language, setLanguage] = useState<LanguageMode>(() => {
    try {
      const saved = localStorage.getItem('poshan_setu_lang');
      if (saved === 'en' || saved === 'gu' || saved === 'bilingual') {
        return saved;
      }
    } catch (e) {
      console.warn(e);
    }
    return 'gu';
  });

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  // Balances mapped by commodity ID
  const [balances, setBalances] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    COMMODITIES.forEach((c) => {
      initial[c.id] = c.defaultBalance;
    });
    try {
      const cached = localStorage.getItem('poshan_setu_active_stock');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.balance !== undefined) {
          initial['balbhog_500g'] = parsed.balance;
        }
      }
    } catch (e) {
      console.warn(e);
    }
    return initial;
  });

  const [lastActionNotice, setLastActionNotice] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<string | null>(null);

  // Update HTML lang attribute and localStorage whenever language changes
  const changeLanguage = (newLang: LanguageMode) => {
    setLanguage(newLang);
    setIsLangOpen(false);
    try {
      localStorage.setItem('poshan_setu_lang', newLang);
      document.documentElement.lang = newLang === 'gu' ? 'gu' : 'en';
    } catch (e) {
      console.warn(e);
    }
  };

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Subscribe to live Firebase Realtime Database `/active_stock`
  useEffect(() => {
    fetchActiveStockRest().then((data) => {
      if (data && typeof data.balance === 'number') {
        setBalances((prev) => ({
          ...prev,
          balbhog_500g: data.balance,
        }));
      }
    });

    const unsubscribe = subscribeToActiveStock((data) => {
      if (data && typeof data.balance === 'number') {
        setBalances((prev) => ({
          ...prev,
          balbhog_500g: data.balance,
        }));
        if (data.lastAction) {
          setLastActionNotice(`${data.lastAction} (${data.change > 0 ? '+' : ''}${data.change})`);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Stock Inward Submission Handler (+ સ્ટોક આવક)
  const handleConfirmInward = async (params: {
    commodityId: string;
    commodityName: string;
    quantity: number;
    challanNo: string;
    expiryDate: string;
  }) => {
    const currentVal = balances[params.commodityId] ?? 245;
    const newBal = currentVal + params.quantity;

    // 1. Update phone screen immediately (optimistic UI)
    setBalances((prev) => ({
      ...prev,
      [params.commodityId]: newBal,
    }));

    // 2. Write object to Firebase under '/active_stock': { balance, lastAction, change, timestamp, village: "૦૪ - વડતાલ" }
    // 3. Push record to '/transaction_history' in Firebase
    await recordStockAction({
      newBalance: newBal,
      lastAction: language === 'en' ? "+ Stock Received (Inward)" : "+ સ્ટોક આવક (Inward)",
      change: params.quantity,
      commodity: params.commodityName,
      challanNo: params.challanNo,
      expiryDate: params.expiryDate,
      village: DEFAULT_VILLAGE,
      workerName: "Anita Sharma",
      centerName: "AWC-10103 Kalyan Centre",
    });

    setLastActionNotice(`+ ${params.quantity}`);
  };

  // Stock Usage Submission Handler (- દૈનિક વિતરણ)
  const handleConfirmUsage = async (params: {
    commodityId: string;
    commodityName: string;
    quantity: number;
    beneficiaryGroup: string;
    notes?: string;
  }) => {
    const currentVal = balances[params.commodityId] ?? 245;
    const newBal = Math.max(0, currentVal - params.quantity);

    // 1. Update phone screen immediately
    setBalances((prev) => ({
      ...prev,
      [params.commodityId]: newBal,
    }));

    // 2. Write object to Firebase under '/active_stock'
    // 3. Push to '/transaction_history'
    await recordStockAction({
      newBalance: newBal,
      lastAction: language === 'en' ? "- Daily Distribution (Usage)" : "- દૈનિક વિતરણ (Usage)",
      change: -params.quantity,
      commodity: params.commodityName,
      challanNo: params.beneficiaryGroup,
      village: DEFAULT_VILLAGE,
      workerName: "Anita Sharma",
      centerName: "AWC-10103 Kalyan Centre",
    });

    setLastActionNotice(`- ${params.quantity}`);
  };

  // Render sub-screens with current language
  if (activeView === 'inward') {
    return (
      <StockInwardView
        onBack={() => setActiveView('home')}
        lang={language}
        currentBalances={balances}
        onConfirmInward={handleConfirmInward}
      />
    );
  }

  if (activeView === 'usage') {
    return (
      <StockUsageView
        onBack={() => setActiveView('home')}
        lang={language}
        currentBalances={balances}
        onConfirmUsage={handleConfirmUsage}
      />
    );
  }

  if (activeView === 'balance') {
    return (
      <BalanceRemainingView
        onBack={() => setActiveView('home')}
        lang={language}
        currentBalances={balances}
        onNavigateInward={() => setActiveView('inward')}
        onNavigateUsage={() => setActiveView('usage')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F9F3] text-gray-900 pb-24 pt-2 px-3 sm:px-4 max-w-md mx-auto relative select-none animate-fadeIn">
      {/* 1. TOP USER CARD (Exact match to Screenshot 1) */}
      <div className="bg-[#EBF7EE] rounded-3xl p-3.5 sm:p-4 mb-3 shadow-xs border border-emerald-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-white shadow-xs shrink-0">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256"
              alt="Anita Sharma"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-gray-900 leading-tight">
              {t('workerName', language)}
            </h2>
            <p className="text-xs font-semibold text-gray-600">
              {t('workerRole', language)}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-1 text-xs font-bold text-gray-800">
            <MapPin className="w-4 h-4 text-[#13653F] fill-[#13653F]" />
            <span>{t('centreName', language)}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-white/90 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
            <span
              className={`w-2 h-2 rounded-full ${
                isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <span className="text-[11px] font-bold text-emerald-900">
              {isOnline ? t('online', language) : t('offline', language)}
            </span>
          </div>
        </div>
      </div>

      {/* 2. BRAND & HEADER BAR (Exact match to Screenshot 1) */}
      <div className="flex items-center justify-between mb-4 px-1">
        {/* Poshan Setu Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 shrink-0">
            <svg viewBox="0 0 512 512" fill="none" className="w-full h-full">
              <circle cx="256" cy="256" r="230" fill="#E2F5E9" />
              <path d="M120 380 C180 340 332 340 392 380 C360 360 310 350 256 350 C202 350 152 360 120 380 Z" fill="#13653F"/>
              <circle cx="180" cy="220" r="24" fill="#13653F"/>
              <circle cx="332" cy="220" r="24" fill="#0D7651"/>
              <circle cx="256" cy="180" r="28" fill="#F97316"/>
              <path d="M256 130 C270 90 310 90 320 120 C300 135 275 140 256 130 Z" fill="#22C55E"/>
              <path d="M256 130 C242 90 202 90 192 120 C212 135 237 140 256 130 Z" fill="#16A34A"/>
            </svg>
          </div>
          <div>
            <div className="text-2xl font-black tracking-tight leading-none">
              <span className="text-[#EA580C]">Poshan</span>{' '}
              <span className="text-[#13653F]">Setu</span>
            </div>
            <div className="text-[10px] font-semibold text-emerald-800 mt-0.5">
              {t('motto', language)}
            </div>
          </div>
        </div>

        {/* Right Tools: Language Picker & Notification Bell */}
        <div className="flex items-center gap-2">
          {/* Language Toggle Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-xs font-bold text-gray-800 shadow-2xs hover:bg-gray-50 active:scale-95 transition"
            >
              <Globe className="w-3.5 h-3.5 text-[#13653F]" />
              <span>
                {language === 'gu' ? 'ગુજરાતી' : language === 'en' ? 'English' : 'દ્વિભાષી'}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-40 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-1.5 overflow-hidden animate-fadeIn">
                <button
                  onClick={() => changeLanguage('gu')}
                  className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between hover:bg-emerald-50 transition ${
                    language === 'gu' ? 'text-[#13653F] font-bold bg-emerald-50/60' : 'text-gray-700'
                  }`}
                >
                  <span>ગુજરાતી (Gujarati)</span>
                  {language === 'gu' && <Check className="w-3.5 h-3.5 text-[#13653F]" />}
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between hover:bg-emerald-50 transition ${
                    language === 'en' ? 'text-[#13653F] font-bold bg-emerald-50/60' : 'text-gray-700'
                  }`}
                >
                  <span>English</span>
                  {language === 'en' && <Check className="w-3.5 h-3.5 text-[#13653F]" />}
                </button>
                <button
                  onClick={() => changeLanguage('bilingual')}
                  className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between hover:bg-emerald-50 transition ${
                    language === 'bilingual' ? 'text-[#13653F] font-bold bg-emerald-50/60' : 'text-gray-700'
                  }`}
                >
                  <span>Bilingual (દ્વિભાષી)</span>
                  {language === 'bilingual' && <Check className="w-3.5 h-3.5 text-[#13653F]" />}
                </button>
              </div>
            )}
          </div>

          {/* Notification Bell */}
          <button
            onClick={() => setOpenModal('help')}
            aria-label="Notifications"
            className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 relative shadow-2xs hover:bg-gray-50 active:scale-95 transition"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EA580C]" />
          </button>
        </div>
      </div>

      {/* QUICK LIVE STOCK BANNER */}
      <div 
        onClick={() => setActiveView('balance')}
        className="bg-white rounded-2xl p-3 mb-3.5 shadow-2xs border border-emerald-100 flex items-center justify-between cursor-pointer hover:border-emerald-300 transition"
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#13653F] animate-pulse" />
          <div className="text-xs text-gray-700 font-semibold">
            {t('activeStockBanner', language)}{' '}
            <span className="font-extrabold text-[#13653F]">
              {balances['balbhog_500g']} {language === 'en' ? 'Balbhog' : 'બાળભોગ'}
            </span>{' '}
            •{' '}
            <span className="font-bold text-gray-800">
              {balances['rice']} {language === 'en' ? 'kg Rice' : 'કિગ્રા ચોખા'}
            </span>
          </div>
        </div>
        <div className="text-[11px] font-bold text-[#13653F] flex items-center gap-0.5">
          <span>{t('details', language)}</span>
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>

      {/* 3. 3x3 GRID OF ROUNDED WHITE CARDS (Exact match to Screenshot 1) */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-6">
        {/* CARD 1: Stock Received */}
        <button
          type="button"
          onClick={() => setActiveView('inward')}
          className="bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 shadow-xs hover:shadow-md border border-emerald-50/60 flex flex-col items-center justify-between text-center transition active:scale-95 group h-[148px] sm:h-[162px]"
        >
          <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
            <TruckStockIllustration className="w-full h-24 sm:h-28" />
          </div>
          <div className="mt-1">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
              {t('card1Title', language)}
            </h3>
            <span className="text-[10px] text-emerald-800 font-bold block mt-0.5">
              {t('card1Sub', language)}
            </span>
          </div>
        </button>

        {/* CARD 2: Stock Usage */}
        <button
          type="button"
          onClick={() => setActiveView('usage')}
          className="bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 shadow-xs hover:shadow-md border border-emerald-50/60 flex flex-col items-center justify-between text-center transition active:scale-95 group h-[148px] sm:h-[162px]"
        >
          <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
            <StockUsageIllustration className="w-full h-24 sm:h-28" />
          </div>
          <div className="mt-1">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
              {t('card2Title', language)}
            </h3>
            <span className="text-[10px] text-sky-800 font-bold block mt-0.5">
              {t('card2Sub', language)}
            </span>
          </div>
        </button>

        {/* CARD 3: Balance Remaining */}
        <button
          type="button"
          onClick={() => setActiveView('balance')}
          className="bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 shadow-xs hover:shadow-md border border-emerald-50/60 flex flex-col items-center justify-between text-center transition active:scale-95 group h-[148px] sm:h-[162px]"
        >
          <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
            <BalanceShelfIllustration className="w-full h-24 sm:h-28" />
          </div>
          <div className="mt-1">
            <h3 className="text-[11px] sm:text-xs font-bold text-gray-900 leading-tight">
              {t('card3Title', language)}
            </h3>
            <span className="text-[10px] text-gray-500 font-semibold block mt-0.5">
              {t('card3Sub', language)}
            </span>
          </div>
        </button>

        {/* CARD 4: Setu Share Exchange */}
        <button
          type="button"
          onClick={() => setOpenModal('exchange')}
          className="bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 shadow-xs hover:shadow-md border border-emerald-50/60 flex flex-col items-center justify-between text-center transition active:scale-95 group h-[148px] sm:h-[162px]"
        >
          <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
            <SetuShareIllustration className="w-full h-24 sm:h-28" />
          </div>
          <div className="mt-1">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
              {t('card4Title', language)}
            </h3>
            <span className="text-[10px] text-purple-800 font-semibold block mt-0.5">
              {t('card4Sub', language)}
            </span>
          </div>
        </button>

        {/* CARD 5: Daily Food Menu */}
        <button
          type="button"
          onClick={() => setOpenModal('menu')}
          className="bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 shadow-xs hover:shadow-md border border-emerald-50/60 flex flex-col items-center justify-between text-center transition active:scale-95 group h-[148px] sm:h-[162px]"
        >
          <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
            <DailyMenuIllustration className="w-full h-24 sm:h-28" />
          </div>
          <div className="mt-1">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
              {t('card5Title', language)}
            </h3>
            <span className="text-[10px] text-amber-800 font-semibold block mt-0.5">
              {t('card5Sub', language)}
            </span>
          </div>
        </button>

        {/* CARD 6: Student Attendance */}
        <button
          type="button"
          onClick={() => setOpenModal('attendance')}
          className="bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 shadow-xs hover:shadow-md border border-emerald-50/60 flex flex-col items-center justify-between text-center transition active:scale-95 group h-[148px] sm:h-[162px]"
        >
          <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
            <AttendanceIllustration className="w-full h-24 sm:h-28" />
          </div>
          <div className="mt-1">
            <h3 className="text-[11px] sm:text-xs font-bold text-gray-900 leading-tight">
              {t('card6Title', language)}
            </h3>
            <span className="text-[10px] text-emerald-800 font-bold block mt-0.5">
              {t('card6Sub', language)}
            </span>
          </div>
        </button>

        {/* CARD 7: Meal Photo Upload */}
        <button
          type="button"
          onClick={() => setOpenModal('photo')}
          className="bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 shadow-xs hover:shadow-md border border-emerald-50/60 flex flex-col items-center justify-between text-center transition active:scale-95 group h-[148px] sm:h-[162px]"
        >
          <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
            <MealPhotoIllustration className="w-full h-24 sm:h-28" />
          </div>
          <div className="mt-1">
            <h3 className="text-[11px] sm:text-xs font-bold text-gray-900 leading-tight">
              {t('card7Title', language)}
            </h3>
            <span className="text-[10px] text-gray-600 font-semibold block mt-0.5">
              {t('card7Sub', language)}
            </span>
          </div>
        </button>

        {/* CARD 8: Smart Ration */}
        <button
          type="button"
          onClick={() => setOpenModal('smart_ration')}
          className="bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 shadow-xs hover:shadow-md border border-emerald-50/60 flex flex-col items-center justify-between text-center transition active:scale-95 group h-[148px] sm:h-[162px]"
        >
          <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
            <SmartRationIllustration className="w-full h-24 sm:h-28" />
          </div>
          <div className="mt-1">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
              {t('card8Title', language)}
            </h3>
            <span className="text-[10px] text-emerald-800 font-bold block mt-0.5">
              {t('card8Sub', language)}
            </span>
          </div>
        </button>

        {/* CARD 9: Download Report */}
        <button
          type="button"
          onClick={() => setOpenModal('report')}
          className="bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 shadow-xs hover:shadow-md border border-emerald-50/60 flex flex-col items-center justify-between text-center transition active:scale-95 group h-[148px] sm:h-[162px]"
        >
          <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
            <DownloadReportIllustration className="w-full h-24 sm:h-28" />
          </div>
          <div className="mt-1">
            <h3 className="text-[11px] sm:text-xs font-bold text-gray-900 leading-tight">
              {t('card9Title', language)}
            </h3>
            <span className="text-[10px] text-[#13653F] font-bold block mt-0.5">
              {t('card9Sub', language)}
            </span>
          </div>
        </button>
      </div>

      {/* QUICK ACTION FLOATING PILLS */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => setActiveView('inward')}
          className="bg-[#13653F] hover:bg-[#0E4E30] text-white py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition"
        >
          <TrendingUp className="w-4 h-4 text-emerald-300" />
          <span>{t('quickInward', language)}</span>
        </button>

        <button
          onClick={() => setActiveView('usage')}
          className="bg-[#0284C7] hover:bg-[#0369A1] text-white py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition"
        >
          <TrendingDown className="w-4 h-4 text-sky-200" />
          <span>{t('quickUsage', language)}</span>
        </button>
      </div>

      {/* 4. BOTTOM NAVIGATION BAR (Exact match to Screenshot 1) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-emerald-100 py-2.5 px-6 flex items-center justify-between z-40 shadow-lg">
        {/* Home Tab (Active Pill) */}
        <button
          onClick={() => setActiveView('home')}
          className="flex flex-col items-center gap-1 text-[#13653F] transition"
        >
          <div className="px-5 py-1.5 rounded-full bg-[#E8F5E9] flex items-center justify-center">
            <Home className="w-5 h-5 fill-[#13653F]" />
          </div>
          <span className="text-[11px] font-bold">{t('navHome', language)}</span>
        </button>

        {/* Help Tab */}
        <button
          onClick={() => setOpenModal('help')}
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900 transition"
        >
          <div className="p-1">
            <HelpCircle className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium">{t('navHelp', language)}</span>
        </button>

        {/* Centre Details Tab */}
        <button
          onClick={() => setOpenModal('centre')}
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900 transition"
        >
          <div className="p-1">
            <Building className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium">{t('navCentre', language)}</span>
        </button>

        {/* Profile Tab */}
        <button
          onClick={() => setOpenModal('profile')}
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900 transition"
        >
          <div className="p-1">
            <User className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium">{t('navProfile', language)}</span>
        </button>
      </div>

      {/* Interactive Feature Modals with language passed */}
      <SetuShareModal
        isOpen={openModal === 'exchange'}
        onClose={() => setOpenModal(null)}
        lang={language}
      />
      <DailyMenuModal
        isOpen={openModal === 'menu'}
        onClose={() => setOpenModal(null)}
        lang={language}
      />
      <AttendanceModal
        isOpen={openModal === 'attendance'}
        onClose={() => setOpenModal(null)}
        lang={language}
      />
      <MealPhotoModal
        isOpen={openModal === 'photo'}
        onClose={() => setOpenModal(null)}
        lang={language}
      />
      <SmartRationModal
        isOpen={openModal === 'smart_ration'}
        onClose={() => setOpenModal(null)}
        lang={language}
      />
      <DownloadReportModal
        isOpen={openModal === 'report'}
        onClose={() => setOpenModal(null)}
        lang={language}
      />
      <HelpModal
        isOpen={openModal === 'help'}
        onClose={() => setOpenModal(null)}
        lang={language}
      />
      <CentreDetailsModal
        isOpen={openModal === 'centre'}
        onClose={() => setOpenModal(null)}
        lang={language}
      />
      <ProfileModal
        isOpen={openModal === 'profile'}
        onClose={() => setOpenModal(null)}
        lang={language}
      />
    </div>
  );
}
