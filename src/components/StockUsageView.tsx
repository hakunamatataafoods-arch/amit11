import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Package, 
  Users, 
  MinusCircle, 
  RotateCcw, 
  CheckSquare,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { 
  CommodityItem, 
  COMMODITIES, 
  LanguageMode, 
  t, 
  getCommodityName, 
  getCommodityUnit 
} from '../data/translations';
import confetti from 'canvas-confetti';

interface StockUsageViewProps {
  onBack: () => void;
  lang: LanguageMode;
  currentBalances: Record<string, number>;
  onConfirmUsage: (params: {
    commodityId: string;
    commodityName: string;
    quantity: number;
    beneficiaryGroup: string;
    notes?: string;
  }) => Promise<void>;
}

export const StockUsageView: React.FC<StockUsageViewProps> = ({
  onBack,
  lang,
  currentBalances,
  onConfirmUsage,
}) => {
  const beneficiaryGroups = [
    { 
      id: 'children_6m_3y', 
      label: lang === 'en' ? 'Children (6m - 3y Take Home Ration)' : 'બાળકો (૬ માસ થી ૩ વર્ષ - THR)',
      sub: lang === 'en' ? 'Weekly THR Distribution' : 'સાપ્તાહિક THR વિતરણ'
    },
    { 
      id: 'children_3y_6y', 
      label: lang === 'en' ? 'Children (3y - 6y Hot Cooked Meals)' : 'બાળકો (૩ થી ૬ વર્ષ - ગરમ નાસ્તો)',
      sub: lang === 'en' ? 'Daily Preschool Meals' : 'દૈનિક પૂર્વ-શાળા નાસ્તો'
    },
    { 
      id: 'mothers', 
      label: lang === 'en' ? 'Pregnant & Lactating Mothers' : 'સગર્ભા / ધાત્રી માતાઓ',
      sub: lang === 'en' ? 'Matrumrut Nutrition' : 'માતૃઅમૃત પોષણ'
    },
    { 
      id: 'malnourished', 
      label: lang === 'en' ? 'Severely Malnourished Children (SAM)' : 'અતિ કુપોષિત બાળકો (SAM / MAM)',
      sub: lang === 'en' ? 'Special Nutrition Support' : 'વિશેષ પૂરક આહાર'
    },
  ];

  const [selectedCommodity, setSelectedCommodity] = useState<CommodityItem>(COMMODITIES[0]);
  const [selectedGroup, setSelectedGroup] = useState(beneficiaryGroups[0].label);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [quantity, setQuantity] = useState<number>(10);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const currentBal = currentBalances[selectedCommodity.id] ?? selectedCommodity.defaultBalance;

  const handleIncrement = (val: number) => {
    setQuantity((prev) => Math.min(currentBal, prev + val));
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleQuickDeduct = (amount: number) => {
    setQuantity((prev) => Math.min(currentBal, Math.max(1, prev + amount)));
  };

  const handleSubmit = async () => {
    if (quantity <= 0 || isSubmitting) return;

    if (quantity > currentBal) {
      const msg = lang === 'en'
        ? `Warning: Distribution quantity cannot exceed available stock (${currentBal})!`
        : `ચેતવણી: વિતરણ જથ્થો ઉપલબ્ધ સ્ટોક (${currentBal}) કરતાં વધુ ન હોઈ શકે!`;
      alert(msg);
      return;
    }

    setIsSubmitting(true);
    try {
      await onConfirmUsage({
        commodityId: selectedCommodity.id,
        commodityName: getCommodityName(selectedCommodity, lang),
        quantity: quantity,
        beneficiaryGroup: selectedGroup,
      });

      confetti({
        particleCount: 60,
        spread: 55,
        origin: { y: 0.7 },
        colors: ['#13653F', '#0284C7', '#F97316'],
      });

      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
        onBack();
      }, 1400);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F9F3] text-gray-900 pb-28 pt-3 px-4 max-w-md mx-auto relative animate-fadeIn">
      {/* Toast Notification */}
      {showSuccessToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#13653F] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400">
          <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
          <div className="text-sm font-semibold">
            <div>{t('toastUsageSuccess', lang)}</div>
            <div className="text-xs text-emerald-100 font-normal">{t('toastUsageSub', lang)}</div>
          </div>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="flex items-center justify-between pt-2 pb-3">
        <button
          onClick={onBack}
          aria-label={t('back', lang)}
          className="w-11 h-11 rounded-full bg-emerald-100/70 hover:bg-emerald-200 text-[#13653F] flex items-center justify-center transition active:scale-95 shadow-sm"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>

        {/* Center Logo & Tagline */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7">
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
            <div className="text-xl font-extrabold tracking-tight">
              <span className="text-[#EA580C]">Poshan</span>{' '}
              <span className="text-[#13653F]">Setu</span>
            </div>
          </div>
          <div className="text-[11px] font-medium text-emerald-800 tracking-wide mt-0.5">
            {t('motto', lang)}
          </div>
        </div>

        <div className="w-11" />
      </div>

      {/* Main Title Header */}
      <div className="text-center my-3">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          {t('usageTitle', lang)}
        </h1>
        <p className="text-xs sm:text-sm font-medium text-gray-500 mt-0.5">
          {t('usageSubtitle', lang)}
        </p>
      </div>

      {/* CARD 1: Select Commodity */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-emerald-50 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Package className="w-5 h-5 text-emerald-700" />
          <h2 className="text-base font-bold text-gray-900">
            {t('selectCommodity', lang)}
          </h2>
        </div>

        {/* Dropdown Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-2xl px-4 py-3.5 text-left text-sm sm:text-base font-semibold text-gray-800 hover:border-emerald-600 focus:outline-none transition"
          >
            <span>{getCommodityName(selectedCommodity, lang)}</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-30 overflow-hidden divide-y divide-gray-100">
              {COMMODITIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setSelectedCommodity(c);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm font-medium flex items-center justify-between hover:bg-emerald-50 transition ${
                    selectedCommodity.id === c.id ? 'bg-emerald-50 text-[#13653F] font-bold' : 'text-gray-700'
                  }`}
                >
                  <div>
                    <div className="font-bold">{getCommodityName(c, lang)}</div>
                    <div className="text-xs text-gray-500 font-normal">{c.nameEn}</div>
                  </div>
                  <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100/70 text-emerald-800">
                    {t('currentStockLabel', lang)} {currentBalances[c.id] ?? c.defaultBalance} {getCommodityUnit(c, lang)}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Selection Pills */}
        <div className="flex flex-wrap gap-2.5 mt-3">
          {COMMODITIES.map((c) => {
            const isSelected = selectedCommodity.id === c.id;
            const shortLabel = lang === 'en' 
              ? (c.id === 'rice' ? 'Rice' : c.id === 'matrumrut' ? 'Matrumrut' : 'Balbhog')
              : (c.id === 'rice' ? 'ચોખા (Rice)' : c.id === 'matrumrut' ? 'માતૃઅમૃત (Matrumrut)' : 'બાળભોગ (Balbhog)');
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCommodity(c)}
                className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition ${
                  isSelected
                    ? 'bg-[#E2F5E9] text-[#13653F] ring-2 ring-[#13653F]/20'
                    : 'bg-[#F2F9F3] text-gray-700 hover:bg-emerald-100/60'
                }`}
              >
                {shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* CARD 2: Beneficiary Category */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-emerald-50 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-5 h-5 text-emerald-700" />
          <h2 className="text-base font-bold text-gray-900">
            {t('beneficiaryGroup', lang)}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {beneficiaryGroups.map((grp) => {
            const active = selectedGroup === grp.label;
            return (
              <button
                key={grp.id}
                type="button"
                onClick={() => setSelectedGroup(grp.label)}
                className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition border flex items-center justify-between ${
                  active
                    ? 'border-[#13653F] bg-[#E2F5E9] text-[#13653F]'
                    : 'border-gray-200 bg-[#F8FAF9] text-gray-700 hover:border-emerald-300'
                }`}
              >
                <span>{grp.label}</span>
                <span className="text-[11px] font-normal text-gray-500">{grp.sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CARD 3: Distributed Quantity */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-emerald-50 mb-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MinusCircle className="w-5 h-5 text-emerald-700" />
            <h2 className="text-base font-bold text-gray-900">
              {t('distributedQty', lang)}
            </h2>
          </div>
          <div className="text-xs text-gray-500 font-medium">
            {t('currentStockLabel', lang)} <span className="font-bold text-[#13653F]">{currentBal}</span>
          </div>
        </div>

        {/* Big Stepper Row */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <button
            type="button"
            onClick={handleDecrement}
            aria-label="Decrease quantity"
            className="w-16 h-16 rounded-full bg-[#E2F5E9] hover:bg-[#D4EEDD] text-[#13653F] flex items-center justify-center text-3xl font-bold transition active:scale-90 shadow-sm"
          >
            −
          </button>

          <div className="flex-1 bg-[#F9FCFA] border-2 border-[#A7F3D0] rounded-2xl py-3 px-4 flex flex-col items-center justify-center shadow-inner">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.min(currentBal, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-full text-center text-4xl sm:text-5xl font-extrabold text-[#13653F] bg-transparent focus:outline-none"
            />
            <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider mt-0.5">
              {getCommodityUnit(selectedCommodity, lang)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleIncrement(1)}
            aria-label="Increase quantity"
            className="w-16 h-16 rounded-full bg-[#E2F5E9] hover:bg-[#D4EEDD] text-[#13653F] flex items-center justify-center text-3xl font-bold transition active:scale-90 shadow-sm"
          >
            +
          </button>
        </div>

        {/* Quick Increment Pills */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          {[5, 10, 25].map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => handleQuickDeduct(amt)}
              className="py-2.5 rounded-xl bg-[#E2F5E9] hover:bg-[#D4EEDD] text-[#13653F] text-sm sm:text-base font-bold transition active:scale-95 text-center shadow-xs"
            >
              +{amt}
            </button>
          ))}
        </div>

        {/* Notice Banner */}
        <div className="bg-[#FEF9C3] border border-[#FDE047] rounded-2xl p-3.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
            <RotateCcw className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-xs sm:text-sm font-semibold text-amber-900 leading-snug">
            {t('usageNotice', lang)}
          </div>
        </div>
      </div>

      {/* Projected Balance preview */}
      <div className="text-center mb-4 text-xs font-medium text-emerald-800">
        {t('usageProjected', lang)}{' '}
        <span className="font-extrabold text-sm text-[#13653F]">
          {Math.max(0, currentBal - quantity)} {getCommodityUnit(selectedCommodity, lang)}
        </span>
      </div>

      {/* Bottom Save Action Button */}
      <button
        type="button"
        disabled={isSubmitting || quantity <= 0}
        onClick={handleSubmit}
        className="w-full bg-[#13653F] hover:bg-[#0E4E30] active:scale-[0.98] text-white py-4 px-6 rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition disabled:opacity-50"
      >
        <CheckSquare className="w-6 h-6 shrink-0" />
        <span>{isSubmitting ? t('saving', lang) : t('confirmUsageBtn', lang)}</span>
      </button>
    </div>
  );
};
