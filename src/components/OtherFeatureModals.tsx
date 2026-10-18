import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Share2, 
  Utensils, 
  UserCheck, 
  Camera, 
  Calculator, 
  FileDown, 
  PhoneCall, 
  Building2, 
  User, 
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LanguageMode } from '../data/translations';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: LanguageMode;
}

// 1. SETU SHARE EXCHANGE MODAL
export const SetuShareModal: React.FC<ModalProps> = ({ isOpen, onClose, lang }) => {
  const isEn = lang === 'en';
  const [partnerCentre, setPartnerCentre] = useState('AWC-10104 Vadtal North');
  const [exchangeItem, setExchangeItem] = useState('Balbhog 500g Packet');
  const [packets, setPackets] = useState(15);
  const [exchangeType, setExchangeType] = useState<'send' | 'receive'>('send');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleShare = () => {
    setIsSent(true);
    confetti({ particleCount: 40, spread: 50 });
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#13653F]" />
            <h3 className="font-bold text-gray-900 text-base">
              {isEn ? 'Setu Share (Inter-Centre Exchange)' : 'સેતુ શેર આપ-લે (Setu Share Exchange)'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          {isEn
            ? 'Quickly exchange grain or nutritional supplements with nearby Anganwadi centres.'
            : 'નજીકના આંગણવાડી કેન્દ્ર સાથે અનાજ અથવા પૂરક આહાર પેકેટોની તાત્કાલિક આપ-લે કરો.'}
        </p>

        <div className="mt-4 space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">
              {isEn ? 'Exchange Type' : 'આપ-લે પ્રકાર (Type)'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setExchangeType('send')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                  exchangeType === 'send'
                    ? 'bg-[#E2F5E9] text-[#13653F] border-[#13653F]'
                    : 'bg-gray-50 border-gray-200 text-gray-700'
                }`}
              >
                {isEn ? 'Transfer Out (Lend)' : 'સહાય આપો (Transfer Out)'}
              </button>
              <button
                type="button"
                onClick={() => setExchangeType('receive')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                  exchangeType === 'receive'
                    ? 'bg-[#E2F5E9] text-[#13653F] border-[#13653F]'
                    : 'bg-gray-50 border-gray-200 text-gray-700'
                }`}
              >
                {isEn ? 'Receive In (Borrow)' : 'સહાય લો (Receive In)'}
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">
              {isEn ? 'Select Target Centre' : 'નજીકનું કેન્દ્ર પસંદ કરો (Target AWC)'}
            </label>
            <select
              value={partnerCentre}
              onChange={(e) => setPartnerCentre(e.target.value)}
              className="w-full bg-[#F8FAF9] border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium"
            >
              <option value="AWC-10104 Vadtal North">AWC-10104 Vadtal North (0.8 km)</option>
              <option value="AWC-10105 Vadtal Station">AWC-10105 Vadtal Station (1.4 km)</option>
              <option value="AWC-10082 Anand Gam">AWC-10082 Anand Gam (3.5 km)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">
              {isEn ? 'Commodity' : 'વસ્તુ (Commodity)'}
            </label>
            <select
              value={exchangeItem}
              onChange={(e) => setExchangeItem(e.target.value)}
              className="w-full bg-[#F8FAF9] border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium"
            >
              <option value="Balbhog 500g Packet">
                {isEn ? 'Balbhog 500g Packet' : 'બાળભોગ પેકેટ (૫૦૦ ગ્રામ)'}
              </option>
              <option value="Rice (Govt Stock)">
                {isEn ? 'Rice (Govt Stock - kg)' : 'ચોખા (સરકારી જથ્થો - કિગ્રા)'}
              </option>
              <option value="Matrumrut">
                {isEn ? 'Matrumrut Packet' : 'માતૃઅમૃત પેકેટ'}
              </option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">
              {isEn ? `Quantity: ${packets} units` : `જથ્થો: ${packets} પેકેટ`}
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={packets}
              onChange={(e) => setPackets(parseInt(e.target.value))}
              className="w-full accent-[#13653F]"
            />
          </div>
        </div>

        <button
          onClick={handleShare}
          disabled={isSent}
          className="mt-6 w-full bg-[#13653F] hover:bg-[#0E4E30] text-white py-3 rounded-2xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
        >
          {isSent ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
          <span>
            {isSent 
              ? (isEn ? 'Transfer Request Sent!' : 'આપ-લે સફળ થઈ ગઈ!') 
              : (isEn ? 'Confirm Transfer Request' : 'આપ-લે વિનંતી મોકલો (Confirm Transfer)')}
          </span>
        </button>
      </div>
    </div>
  );
};

// 2. DAILY FOOD MENU MODAL
export const DailyMenuModal: React.FC<ModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;
  const isEn = lang === 'en';

  const days = [
    { 
      day: isEn ? 'Monday' : 'સોમવાર (Monday)', 
      meal: isEn ? 'Sukhadi + Spiced Poha' : 'સુખડી + પૌંઆ બટાકા', 
      cal: '480 kcal', 
      pro: isEn ? 'Protein: 12g' : 'પ્રોટીન: ૧૨ ગ્રામ' 
    },
    { 
      day: isEn ? 'Tuesday' : 'મંગળવાર (Tuesday)', 
      meal: isEn ? 'Steamed Muthiya + Dal Rice' : 'મુઠિયા + દાળ-ભાત', 
      cal: '520 kcal', 
      pro: isEn ? 'Protein: 14g' : 'પ્રોટીન: ૧૪ ગ્રામ' 
    },
    { 
      day: isEn ? 'Wednesday' : 'બુધવાર (Wednesday)', 
      meal: isEn ? 'Balbhog Shiro + Sprouted Pulses' : 'બાળભોગ શીરો + ફણગાવેલા કઠોળ', 
      cal: '510 kcal', 
      pro: isEn ? 'Protein: 15g' : 'પ્રોટીન: ૧૫ ગ્રામ' 
    },
    { 
      day: isEn ? 'Thursday' : 'ગુરુવાર (Thursday)', 
      meal: isEn ? 'Khichdi Kadhi + Green Veggies' : 'ખીચડી કઢી + શાકભાજી', 
      cal: '490 kcal', 
      pro: isEn ? 'Protein: 11g' : 'પ્રોટીન: ૧૧ ગ્રામ' 
    },
    { 
      day: isEn ? 'Friday' : 'શુક્રવાર (Friday)', 
      meal: isEn ? 'Seasoned Poha + Boiled Chana' : 'વઘારેલા પૌંઆ + બાફેલી ચણા ચાટ', 
      cal: '475 kcal', 
      pro: isEn ? 'Protein: 13g' : 'પ્રોટીન: ૧૩ ગ્રામ' 
    },
    { 
      day: isEn ? 'Saturday' : 'શનિવાર (Saturday)', 
      meal: isEn ? 'Dudhpak / Fruit Salad + Handvo' : 'દૂધપાક / ફળ સલાડ + હાંડવો', 
      cal: '530 kcal', 
      pro: isEn ? 'Protein: 14g' : 'પ્રોટીન: ૧૪ ગ્રામ' 
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-[#13653F]" />
            <h3 className="font-bold text-gray-900 text-base">
              {isEn ? 'Daily Food Menu' : 'દૈનિક આહાર મેનુ (Daily Food Menu)'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-[#E2F5E9] p-3 rounded-2xl my-3 text-xs text-emerald-900 flex items-center justify-between">
          <div>
            <div className="font-bold">
              {isEn ? "Today: Saturday" : "આજનો દિવસ: શનિવાર (Saturday)"}
            </div>
            <div className="text-[11px] text-emerald-800">
              {isEn ? "Hot Cooked Meal: Dudhpak + Handvo" : "ગરમ તાજો નાસ્તો: દૂધપાક + હાંડવો"}
            </div>
          </div>
          <span className="bg-[#13653F] text-white px-2 py-1 rounded-lg font-bold text-[10px]">
            {isEn ? "Active Menu" : "સક્રિય મેનુ"}
          </span>
        </div>

        <div className="space-y-2.5 mt-2">
          {days.map((item, idx) => (
            <div key={idx} className="bg-[#F8FAF9] p-3 rounded-xl border border-gray-100 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-gray-800">{item.day}</div>
                <div className="text-gray-600 mt-0.5">{item.meal}</div>
              </div>
              <div className="text-right text-[10px] text-emerald-800 font-semibold">
                <div>{item.cal}</div>
                <div className="text-gray-500 font-normal">{item.pro}</div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full bg-[#13653F] text-white py-2.5 rounded-xl font-bold text-xs shadow-sm"
        >
          {isEn ? 'Close' : 'બંધ કરો (Close)'}
        </button>
      </div>
    </div>
  );
};

// 3. STUDENT ATTENDANCE MODAL
export const AttendanceModal: React.FC<ModalProps> = ({ isOpen, onClose, lang }) => {
  const isEn = lang === 'en';
  const [presentBoys, setPresentBoys] = useState(12);
  const [presentGirls, setPresentGirls] = useState(13);
  const totalStudents = 28;
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const totalPresent = presentBoys + presentGirls;

  const handleSave = () => {
    setIsSaved(true);
    confetti({ particleCount: 35, spread: 45 });
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#13653F]" />
            <h3 className="font-bold text-gray-900 text-base">
              {isEn ? 'Student Attendance' : 'બાળકોની હાજરી (Student Attendance)'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 bg-[#F2F9F3] p-4 rounded-2xl text-center">
          <div className="text-3xl font-extrabold text-[#13653F]">
            {totalPresent} / {totalStudents}
          </div>
          <div className="text-xs font-semibold text-gray-600 mt-1">
            {isEn ? 'Total Children Present Today' : 'કુલ હાજર બાળકો (Total Present Today)'} • {Math.round((totalPresent / totalStudents) * 100)}%
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between bg-white border border-gray-200 p-3 rounded-2xl">
            <div>
              <div className="text-xs font-bold text-gray-800">
                {isEn ? 'Boys' : 'કુમાર (Boys)'}
              </div>
              <div className="text-[11px] text-gray-500">
                {isEn ? 'Total Registered: 14' : 'કુલ નોંધાયેલ: ૧૪'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPresentBoys(Math.max(0, presentBoys - 1))}
                className="w-9 h-9 rounded-xl bg-gray-100 font-bold text-gray-700 active:scale-95"
              >
                −
              </button>
              <span className="w-8 text-center font-bold text-base text-[#13653F]">{presentBoys}</span>
              <button
                onClick={() => setPresentBoys(Math.min(14, presentBoys + 1))}
                className="w-9 h-9 rounded-xl bg-[#E2F5E9] font-bold text-[#13653F] active:scale-95"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between bg-white border border-gray-200 p-3 rounded-2xl">
            <div>
              <div className="text-xs font-bold text-gray-800">
                {isEn ? 'Girls' : 'કન્યા (Girls)'}
              </div>
              <div className="text-[11px] text-gray-500">
                {isEn ? 'Total Registered: 14' : 'કુલ નોંધાયેલ: ૧૪'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPresentGirls(Math.max(0, presentGirls - 1))}
                className="w-9 h-9 rounded-xl bg-gray-100 font-bold text-gray-700 active:scale-95"
              >
                −
              </button>
              <span className="w-8 text-center font-bold text-base text-[#13653F]">{presentGirls}</span>
              <button
                onClick={() => setPresentGirls(Math.min(14, presentGirls + 1))}
                className="w-9 h-9 rounded-xl bg-[#E2F5E9] font-bold text-[#13653F] active:scale-95"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaved}
          className="mt-6 w-full bg-[#13653F] hover:bg-[#0E4E30] text-white py-3 rounded-2xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
        >
          {isSaved ? <Check className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
          <span>
            {isSaved 
              ? (isEn ? 'Attendance Saved!' : 'હાજરી સેવ થઈ ગઈ!') 
              : (isEn ? 'Submit Attendance' : 'હાજરી સબમિટ કરો (Save Attendance)')}
          </span>
        </button>
      </div>
    </div>
  );
};

// 4. MEAL PHOTO UPLOAD MODAL
export const MealPhotoModal: React.FC<ModalProps> = ({ isOpen, onClose, lang }) => {
  const isEn = lang === 'en';
  const [photoCaptured, setPhotoCaptured] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleCapture = () => {
    setPhotoCaptured(true);
  };

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      confetti({ particleCount: 30, spread: 40 });
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#13653F]" />
            <h3 className="font-bold text-gray-900 text-base">
              {isEn ? 'Meal Photo Upload' : 'ભોજન ફોટો અપલોડ (Meal Photo Upload)'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4">
          {!photoCaptured ? (
            <div className="border-2 border-dashed border-emerald-300 bg-[#F2F9F3] rounded-2xl p-6 text-center">
              <Camera className="w-12 h-12 text-[#13653F] mx-auto mb-2" />
              <div className="text-sm font-bold text-gray-800">
                {isEn ? 'Capture Hot Cooked Meal Photo' : 'ગરમ ભોજન પિરસવાનો ફોટો લો'}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {isEn ? 'For Poshan Tracker and Gujarat ICDS compliance' : 'પોષણ ટ્રેકર અને સરકારી ઓડિટ અનુપાલન માટે'}
              </p>
              <button
                type="button"
                onClick={handleCapture}
                className="mt-4 bg-[#13653F] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs active:scale-95"
              >
                {isEn ? 'Take Photo / Select' : 'કૅમેરા શરુ કરો (Take Photo)'}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden bg-emerald-950 h-44 flex flex-col justify-end p-3 text-white">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="relative z-10 text-xs">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                    <MapPin className="w-3.5 h-3.5" /> AWC Kalyan Centre, Vadtal (22.5645° N, 72.9289° E)
                  </div>
                  <div className="text-[10px] text-gray-300">
                    {new Date().toLocaleDateString(isEn ? 'en-IN' : 'gu-IN')} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>

              <div className="text-xs text-emerald-800 bg-[#E2F5E9] p-2.5 rounded-xl font-medium">
                {isEn ? '✓ Geo-tag and timestamp added automatically.' : '✓ જીઓ-ટેગ અને સમય મુદ્રાંકન આપમેળે ઉમેરાયેલ છે.'}
              </div>
            </div>
          )}
        </div>

        {photoCaptured && (
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="mt-5 w-full bg-[#13653F] hover:bg-[#0E4E30] text-white py-3 rounded-2xl font-bold text-sm shadow-md transition"
          >
            {isUploading 
              ? (isEn ? 'Uploading...' : 'અપલોડ થઈ રહ્યું છે...') 
              : (isEn ? 'Confirm & Submit Photo' : 'ફોટો સબમિટ કરો (Confirm Upload)')}
          </button>
        )}
      </div>
    </div>
  );
};

// 5. SMART RATION MODAL
export const SmartRationModal: React.FC<ModalProps> = ({ isOpen, onClose, lang }) => {
  const isEn = lang === 'en';
  const [category, setCategory] = useState<'thr' | 'hcm' | 'mothers'>('thr');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#13653F]" />
            <h3 className="font-bold text-gray-900 text-base">
              {isEn ? 'Smart Ration Calculator' : 'સ્માર્ટ રાશન કેલ્ક્યુલેટર (Smart Ration)'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-1.5 bg-[#F2F9F3] p-1.5 rounded-2xl">
          <button
            onClick={() => setCategory('thr')}
            className={`py-2 rounded-xl text-xs font-bold ${
              category === 'thr' ? 'bg-[#13653F] text-white shadow-xs' : 'text-gray-700'
            }`}
          >
            {isEn ? '6m-3 yrs' : '૬ માસ-૩ વર્ષ'}
          </button>
          <button
            onClick={() => setCategory('hcm')}
            className={`py-2 rounded-xl text-xs font-bold ${
              category === 'hcm' ? 'bg-[#13653F] text-white shadow-xs' : 'text-gray-700'
            }`}
          >
            {isEn ? '3-6 yrs' : '૩ થી ૬ વર્ષ'}
          </button>
          <button
            onClick={() => setCategory('mothers')}
            className={`py-2 rounded-xl text-xs font-bold ${
              category === 'mothers' ? 'bg-[#13653F] text-white shadow-xs' : 'text-gray-700'
            }`}
          >
            {isEn ? 'Mothers' : 'સગર્ભા માતાઓ'}
          </button>
        </div>

        <div className="mt-4 bg-[#F8FAF9] p-4 rounded-2xl border border-gray-100 text-xs space-y-2">
          {category === 'thr' && (
            <>
              <div className="font-bold text-gray-800 text-sm">
                {isEn ? 'Take Home Ration (THR) Quota:' : 'ટેક હોમ રાશન (THR) દર:'}
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {isEn ? 'Balbhog Packet (500g):' : 'બાળભોગ પેકેટ (૫૦૦ ગ્રામ):'}
                </span>
                <span className="font-bold text-[#13653F]">
                  {isEn ? '7 packets / month' : '૭ પેકેટ / માસ'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{isEn ? 'Total Weight:' : 'કુલ વજન:'}</span>
                <span className="font-bold text-gray-800">3.5 kg</span>
              </div>
            </>
          )}

          {category === 'hcm' && (
            <>
              <div className="font-bold text-gray-800 text-sm">
                {isEn ? 'Hot Cooked Meal (HCM) Daily Allowance:' : 'ગરમ તાજો નાસ્તો (HCM) દર:'}
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{isEn ? 'Rice / Wheat daily:' : 'ચોખા / ઘઉં દૈનિક:'}</span>
                <span className="font-bold text-[#13653F]">80g / child</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{isEn ? 'Pulses / Dal daily:' : 'દાળ / કઠોળ દૈનિક:'}</span>
                <span className="font-bold text-[#13653F]">25g / child</span>
              </div>
            </>
          )}

          {category === 'mothers' && (
            <>
              <div className="font-bold text-gray-800 text-sm">
                {isEn ? 'Matrumrut Nutrition Package:' : 'માતૃઅમૃત પોષણ કીટ:'}
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{isEn ? 'Matrumrut Packets (500g):' : 'માતૃઅમૃત પેકેટ:'}</span>
                <span className="font-bold text-[#13653F]">
                  {isEn ? '4 packets / month' : '૪ પેકેટ / માસ'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{isEn ? 'Iron & Folic Acid:' : 'આયર્ન-ફોલિક ફોસ્ફેટ:'}</span>
                <span className="font-bold text-gray-800">100 tablets</span>
              </div>
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full bg-[#13653F] text-white py-2.5 rounded-xl font-bold text-xs shadow-sm"
        >
          {isEn ? 'Got It' : 'સમજાયું (Got It)'}
        </button>
      </div>
    </div>
  );
};

// 6. DOWNLOAD REPORT MODAL
export const DownloadReportModal: React.FC<ModalProps> = ({ isOpen, onClose, lang }) => {
  const isEn = lang === 'en';
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      const csvContent = "data:text/csv;charset=utf-8,Item,Balance,Unit,Village,Status\nBalbhog 500g,245,packets,04 - Vadtal,Normal\nRice,120,kg,04 - Vadtal,Normal\nMatrumrut,85,packets,04 - Vadtal,Normal\n";
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `PoshanSetu_MPR_Report_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      confetti({ particleCount: 30, spread: 45 });
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FileDown className="w-5 h-5 text-[#13653F]" />
            <h3 className="font-bold text-gray-900 text-base">
              {isEn ? 'Download Report' : 'રિપોર્ટ ડાઉનલોડ (Download Report)'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-600 mt-3">
          {isEn
            ? 'Download Gujarat Women & Child Development (WCD) Monthly Progress Report (MPR).'
            : 'ગુજરાત સરકાર મહિલા અને બાળ વિકાસ વિભાગ (WCD) ફોર્મેટમાં માસિક પ્રગતિ અહેવાલ (MPR) ડાઉનલોડ કરો.'}
        </p>

        <div className="mt-4 space-y-2">
          <div className="p-3 bg-[#F2F9F3] rounded-2xl border border-emerald-200 text-xs">
            <div className="font-bold text-gray-900">
              {isEn ? 'Monthly Stock & Usage Report (MPR-101)' : 'માસિક સ્ટોક અને વપરાશ અહેવાલ (MPR-101)'}
            </div>
            <div className="text-gray-500 text-[11px] mt-0.5">
              {isEn ? 'Last Updated: Today • CSV / PDF format' : 'છેલ્લું અપડેટ: આજરોજ • પીડીએફ / એક્સેલ ફોર્મેટ'}
            </div>
          </div>
        </div>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="mt-6 w-full bg-[#13653F] hover:bg-[#0E4E30] text-white py-3 rounded-2xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
        >
          <FileDown className="w-4 h-4" />
          <span>
            {downloading 
              ? (isEn ? 'Downloading...' : 'ડાઉનલોડ થઈ રહ્યું છે...') 
              : (isEn ? 'Export Report CSV' : 'રિપોર્ટ ડાઉનલોડ કરો (Export CSV)')}
          </span>
        </button>
      </div>
    </div>
  );
};

// 7. HELP MODAL
export const HelpModal: React.FC<ModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;
  const isEn = lang === 'en';

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-[#13653F]" />
            <h3 className="font-bold text-gray-900 text-base">
              {isEn ? 'Help & Support' : 'સહાય અને હેલ્પલાઇન (Help & Support)'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3 text-xs">
          <div className="bg-[#F2F9F3] p-3 rounded-2xl border border-emerald-100">
            <div className="font-bold text-emerald-900">
              {isEn ? 'Poshan Helpline (Toll Free)' : 'પોષણ હેલ્પલાઇન (Toll Free)'}
            </div>
            <div className="text-lg font-extrabold text-[#13653F] mt-1">14408 / 1098</div>
            <div className="text-[11px] text-gray-500">
              {isEn ? '24/7 Child and Mother Helpline' : '૨૪ કલાક બાળ અને મહિલા સહાય'}
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-3 rounded-2xl">
            <div className="font-bold text-gray-800">
              {isEn ? 'Supervisor Office' : 'સુપરવાઇઝર કચેરી (Supervisor)'}
            </div>
            <div className="text-gray-700 mt-0.5">Mrs. Rekhaben Patel • +91 98250 XXXXX</div>
            <div className="text-[11px] text-gray-500">
              {isEn ? 'Anand Block-1, Kheda-Anand District' : 'આણંદ ઘટક-૧, ખેડા-આણંદ જિલ્લો'}
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-3 rounded-2xl">
            <div className="font-bold text-gray-800">
              {isEn ? 'Technical Support' : 'તકનીકી સહાય (App Support)'}
            </div>
            <div className="text-gray-700 mt-0.5">support@poshansetu.gujarat.gov.in</div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full bg-[#13653F] text-white py-2.5 rounded-xl font-bold text-xs"
        >
          {isEn ? 'Close' : 'બંધ કરો (Close)'}
        </button>
      </div>
    </div>
  );
};

// 8. CENTRE DETAILS MODAL
export const CentreDetailsModal: React.FC<ModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;
  const isEn = lang === 'en';

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#13653F]" />
            <h3 className="font-bold text-gray-900 text-base">
              {isEn ? 'Centre Details' : 'કેન્દ્ર વિગતો (Centre Details)'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 bg-[#F8FAF9] p-4 rounded-2xl border border-gray-200 text-xs space-y-2.5">
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">{isEn ? 'Centre Name:' : 'કેન્દ્રનું નામ:'}</span>
            <span className="font-bold text-gray-900">{isEn ? 'Kalyan Centre' : 'કલ્યાણ કેન્દ્ર (Kalyan Centre)'}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">{isEn ? 'AWC Code:' : 'AWC કોડ:'}</span>
            <span className="font-mono font-bold text-[#13653F]">AWC-10103</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">{isEn ? 'Village / Ward:' : 'ગામ / વોર્ડ:'}</span>
            <span className="font-bold text-gray-900">{isEn ? '04 - Vadtal' : '૦૪ - વડતાલ (Vadtal)'}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">{isEn ? 'District:' : 'તાલુકો / જિલ્લો:'}</span>
            <span className="font-semibold text-gray-800">{isEn ? 'Anand, Gujarat' : 'આણંદ, ગુજરાત'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{isEn ? 'Worker:' : 'કાર્યકર:'}</span>
            <span className="font-bold text-gray-900">{isEn ? 'Anita Sharma' : 'અનિતા શર્મા (Anita Sharma)'}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full bg-[#13653F] text-white py-2.5 rounded-xl font-bold text-xs"
        >
          {isEn ? 'Close' : 'બંધ કરો (Close)'}
        </button>
      </div>
    </div>
  );
};

// 9. PROFILE MODAL
export const ProfileModal: React.FC<ModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;
  const isEn = lang === 'en';

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#13653F]" />
            <h3 className="font-bold text-gray-900 text-base">
              {isEn ? 'Worker Profile' : 'કાર્યકર પ્રોફાઇલ (Worker Profile)'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full border-4 border-emerald-100 overflow-hidden shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256"
              alt="Anita Sharma"
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="mt-2 text-base font-bold text-gray-900">
            {isEn ? 'Anita Sharma' : 'અનિતા શર્મા (Anita Sharma)'}
          </h4>
          <p className="text-xs text-gray-500">
            {isEn ? 'Anganwadi Worker' : 'આંગણવાડી કાર્યકર • Anganwadi Worker'}
          </p>
          <span className="mt-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
            {isEn ? 'Experience: 8 Years' : 'સેવા વર્ષ: ૮ વર્ષ'}
          </span>
        </div>

        <div className="mt-4 bg-[#F8FAF9] p-3.5 rounded-2xl border border-gray-100 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">AWW ID:</span>
            <span className="font-mono font-bold text-gray-800">GUJ-AWC-7842</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{isEn ? 'Assigned Centre:' : 'સેવા ક્ષેત્ર:'}</span>
            <span className="font-semibold text-gray-800">
              {isEn ? 'Kalyan Centre, Vadtal' : 'કલ્યાણ કેન્દ્ર, વડતાલ'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{isEn ? 'Phone:' : 'મોબાઇલ:'}</span>
            <span className="font-mono text-gray-800">+91 94280 XXXXX</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full bg-[#13653F] text-white py-2.5 rounded-xl font-bold text-xs"
        >
          {isEn ? 'Close' : 'બંધ કરો (Close)'}
        </button>
      </div>
    </div>
  );
};
