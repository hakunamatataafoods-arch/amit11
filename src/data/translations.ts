export type LanguageMode = 'en' | 'gu' | 'bilingual';

export interface CommodityItem {
  id: string;
  nameGu: string;
  nameEn: string;
  unitGu: string;
  unitEn: string;
  defaultBalance: number;
  iconType: 'balbhog' | 'rice' | 'matrumrut';
}

export const COMMODITIES: CommodityItem[] = [
  {
    id: 'balbhog_500g',
    nameGu: 'બાળભોગ પેકેટ (૫૦૦ ગ્રામ)',
    nameEn: 'Balbhog Packet (500g)',
    unitGu: 'પેકેટ',
    unitEn: 'packets',
    defaultBalance: 245,
    iconType: 'balbhog',
  },
  {
    id: 'rice',
    nameGu: 'ચોખા (સરકારી જથ્થો)',
    nameEn: 'Rice (Govt Stock)',
    unitGu: 'કિલો',
    unitEn: 'kg',
    defaultBalance: 120,
    iconType: 'rice',
  },
  {
    id: 'matrumrut',
    nameGu: 'માતૃઅમૃત (પોષણ કીટ)',
    nameEn: 'Matrumrut (Mother Nutrition)',
    unitGu: 'પેકેટ',
    unitEn: 'packets',
    defaultBalance: 85,
    iconType: 'matrumrut',
  },
];

export const I18N = {
  // Common
  appName: {
    en: 'Poshan Setu',
    gu: 'પોષણ સેતુ',
    bilingual: 'Poshan Setu',
  },
  motto: {
    en: 'Healthy Children, Empowered India',
    gu: 'સુસંત બાળકો, સશક્ત ભારત',
    bilingual: 'સુસંત બાળકો, સશક્ત ભારત',
  },
  workerName: {
    en: 'Smt. Bhavanaben Patel',
    gu: 'શ્રીમતી ભાવનાબેન પટેલ',
    bilingual: 'Smt. Bhavanaben Patel (શ્રીમતી ભાવનાબેન પટેલ)',
  },
  workerRole: {
    en: 'Anganwadi Worker',
    gu: 'આંગણવાડી કાર્યકર',
    bilingual: 'Anganwadi Worker (કાર્યકર)',
  },
  centreName: {
    en: '04 - Vadtal (Anand)',
    gu: '૦૪ - વડતાલ (આણંદ)',
    bilingual: '04 - Vadtal (Anand)',
  },
  online: {
    en: 'Online',
    gu: 'ઓનલાઇન',
    bilingual: 'Online',
  },
  offline: {
    en: 'Offline',
    gu: 'ઓફલાઇન',
    bilingual: 'Offline',
  },
  activeStockBanner: {
    en: 'Current Active Stock:',
    gu: 'હાલનો સક્રિય સ્ટોક:',
    bilingual: 'હાલનો સક્રિય સ્ટોક:',
  },
  details: {
    en: 'Details',
    gu: 'વિગત',
    bilingual: 'Details / વિગત',
  },
  close: {
    en: 'Close',
    gu: 'બંધ કરો',
    bilingual: 'Close (બંધ કરો)',
  },
  back: {
    en: 'Back',
    gu: 'પાછા જાઓ',
    bilingual: 'Back',
  },

  // 9 Dashboard Cards
  card1Title: {
    en: 'Stock Received',
    gu: 'સ્ટોક આવક',
    bilingual: 'Stock Received',
  },
  card1Sub: {
    en: '+ Inward Entry',
    gu: '+ સ્ટોક આવક',
    bilingual: '+ સ્ટોક આવક',
  },
  card2Title: {
    en: 'Stock Usage',
    gu: 'દૈનિક વિતરણ',
    bilingual: 'Stock Usage',
  },
  card2Sub: {
    en: '- Daily Distribution',
    gu: '- દૈનિક વિતરણ',
    bilingual: '- દૈનિક વિતરણ',
  },
  card3Title: {
    en: 'Balance Remaining',
    gu: 'બાકી જથ્થો',
    bilingual: 'Balance Remaining',
  },
  card3Sub: {
    en: '(Item-wise)',
    gu: '(વસ્તુવાર વિગત)',
    bilingual: '(Item-wise)',
  },
  card4Title: {
    en: 'Setu Share',
    gu: 'સેતુ શેર',
    bilingual: 'Setu Share',
  },
  card4Sub: {
    en: 'Exchange',
    gu: 'આપ-લે',
    bilingual: 'Exchange',
  },
  card5Title: {
    en: 'Daily Food',
    gu: 'દૈનિક આહાર',
    bilingual: 'Daily Food',
  },
  card5Sub: {
    en: 'Menu',
    gu: 'મેનુ',
    bilingual: 'Menu',
  },
  card6Title: {
    en: 'Student',
    gu: 'બાળકોની',
    bilingual: 'Student',
  },
  card6Sub: {
    en: 'Attendance',
    gu: 'હાજરી',
    bilingual: 'Attendance',
  },
  card7Title: {
    en: 'Meal Photo',
    gu: 'ભોજન ફોટો',
    bilingual: 'Meal Photo',
  },
  card7Sub: {
    en: 'Upload',
    gu: 'અપલોડ',
    bilingual: 'Upload',
  },
  card8Title: {
    en: 'Smart',
    gu: 'સ્માર્ટ',
    bilingual: 'Smart',
  },
  card8Sub: {
    en: 'Ration',
    gu: 'રાશન',
    bilingual: 'Ration',
  },
  card9Title: {
    en: 'Download',
    gu: 'રિપોર્ટ',
    bilingual: 'Download',
  },
  card9Sub: {
    en: 'Report',
    gu: 'ડાઉનલોડ',
    bilingual: 'Report',
  },

  // Floating Action buttons
  quickInward: {
    en: '+ Record Stock Inward',
    gu: '+ સ્ટોક આવક નોંધો',
    bilingual: '+ સ્ટોક આવક નોંધો',
  },
  quickUsage: {
    en: '- Daily Distribution',
    gu: '- દૈનિક વિતરણ',
    bilingual: '- દૈનિક વિતરણ',
  },

  // Bottom Navigation
  navHome: {
    en: 'Home',
    gu: 'મુખ્ય પૃષ્ઠ',
    bilingual: 'Home',
  },
  navHelp: {
    en: 'Help',
    gu: 'મદદ',
    bilingual: 'Help',
  },
  navCentre: {
    en: 'Centre Details',
    gu: 'કેન્દ્ર વિગત',
    bilingual: 'Centre Details',
  },
  navProfile: {
    en: 'Profile',
    gu: 'પ્રોફાઇલ',
    bilingual: 'Profile',
  },

  // Stock Inward Form
  inwardTitle: {
    en: 'Stock Inward Entry',
    gu: 'નવો જથ્થો નોંધો',
    bilingual: 'નવો જથ્થો નોંધો (Stock Inward Entry)',
  },
  selectCommodity: {
    en: 'Select Commodity',
    gu: 'વસ્તુ પસંદ કરો',
    bilingual: 'વસ્તુ પસંદ કરો (Select Commodity)',
  },
  batchAndChallan: {
    en: 'Batch & Challan',
    gu: 'બેચ અને ચલણ વિગત',
    bilingual: 'Batch & Challan',
  },
  challanNo: {
    en: 'Challan No.',
    gu: 'ચલણ નં.',
    bilingual: 'ચલણ નં. (Challan No.)',
  },
  enterChallan: {
    en: 'Enter challan no.',
    gu: 'ચલણ નંબર દાખલ કરો',
    bilingual: 'Enter challan no.',
  },
  expiryDate: {
    en: 'Expiry Date',
    gu: 'એક્સપાયરી તારીખ',
    bilingual: 'એક્સપાયરી તારીખ (Expiry Date)',
  },
  receivedQty: {
    en: 'Received Quantity',
    gu: 'મળેલ જથ્થો',
    bilingual: 'મળેલ જથ્થો (Received Quantity)',
  },
  currentStockLabel: {
    en: 'Current Stock:',
    gu: 'હાલનો સ્ટોક:',
    bilingual: 'હાલનો સ્ટોક:',
  },
  oldBatchNotice: {
    en: 'Ensure older batches are used first',
    gu: 'જૂની બેચનો ઉપયોગ પહેલા કરવાની ખાતરી કરો',
    bilingual: 'Ensure older batches are used first (જૂની બેચનો ઉપયોગ પહેલા કરો)',
  },
  inwardProjected: {
    en: 'New stock balance after inward will be:',
    gu: 'આવક બાદ નવો સ્ટોક થશે:',
    bilingual: 'આવક બાદ નવો સ્ટોક થશે:',
  },
  confirmInwardBtn: {
    en: 'Confirm & Save Inward',
    gu: 'સ્ટોકમાં જમા કરો',
    bilingual: 'સ્ટોકમાં જમા કરો (Confirm & Save Inward)',
  },
  saving: {
    en: 'Saving...',
    gu: 'જમા થઈ રહ્યું છે...',
    bilingual: 'Saving...',
  },
  toastInwardSuccess: {
    en: 'Stock inward recorded successfully!',
    gu: 'સ્ટોક સફળતાપૂર્વક જમા થયો!',
    bilingual: 'સ્ટોક સફળતાપૂર્વક જમા થયો!',
  },
  toastInwardSub: {
    en: 'Active stock updated in Firebase',
    gu: 'ફાયરબેઝમાં સક્રિય સ્ટોક અપડેટ થયો',
    bilingual: 'Active stock updated in Firebase',
  },

  // Stock Usage Form
  usageTitle: {
    en: 'Stock Usage Entry',
    gu: 'દૈનિક વિતરણ નોંધો',
    bilingual: 'દૈનિક વિતરણ નોંધો (Stock Usage Entry)',
  },
  usageSubtitle: {
    en: 'AWC-10103 Kalyan Centre • Daily Distribution Register',
    gu: 'AWC-10103 કલ્યાણ કેન્દ્ર • દૈનિક વપરાશ રજિસ્ટર',
    bilingual: 'AWC-10103 Kalyan Centre • દૈનિક વપરાશ રજિસ્ટર',
  },
  beneficiaryGroup: {
    en: 'Beneficiary Group',
    gu: 'લાભાર્થી વર્ગ',
    bilingual: 'લાભાર્થી વર્ગ (Beneficiary Group)',
  },
  distributedQty: {
    en: 'Distributed Quantity',
    gu: 'વિતરણ જથ્થો',
    bilingual: 'વિતરણ જથ્થો (Distributed Quantity)',
  },
  usageNotice: {
    en: 'Verify biometric / attendance count per Poshan Tracker',
    gu: 'પોષણ ટ્રેકર હાજરી મુજબ જથ્થો નોંધવાની ખાતરી કરો',
    bilingual: 'Verify biometric / register count (પોષણ ટ્રેકર હાજરી મુજબ ખાતરી કરો)',
  },
  usageProjected: {
    en: 'Remaining balance after distribution:',
    gu: 'વિતરણ બાદ બાકી સ્ટોક રહેશે:',
    bilingual: 'વિતરણ બાદ બાકી સ્ટોક રહેશે:',
  },
  confirmUsageBtn: {
    en: 'Confirm & Deduct Distribution',
    gu: 'સ્ટોકમાંથી વિતરણ કરો',
    bilingual: 'સ્ટોકમાંથી વિતરણ કરો (Confirm & Deduct)',
  },
  toastUsageSuccess: {
    en: 'Daily distribution recorded successfully!',
    gu: 'દૈનિક વિતરણ સફળતાપૂર્વક નોંધાયું!',
    bilingual: 'દૈનિક વિતરણ સફળતાપૂર્વક નોંધાયું!',
  },
  toastUsageSub: {
    en: 'Active stock deducted in Firebase',
    gu: 'ફાયરબેઝમાં સ્ટોક બાદ કરવામાં આવ્યો',
    bilingual: 'Active stock deducted in Firebase',
  },

  // Balance Remaining View
  balanceTitle: {
    en: 'Item-wise Stock Balance',
    gu: 'વસ્તુવાર બાકી જથ્થો',
    bilingual: 'વસ્તુવાર બાકી જથ્થો (Stock Balance)',
  },
  liveSync: {
    en: 'Live Sync',
    gu: 'લાઇવ સિંક',
    bilingual: 'લાઇવ સિંક',
  },
  qualityVerified: {
    en: 'Quality Standards Verified',
    gu: 'ગુણવત્તા માનક પ્રમાણિત',
    bilingual: 'ગુણવત્તા માનક પ્રમાણિત',
  },
  sufficientStock: {
    en: 'Sufficient Stock',
    gu: 'પર્યાપ્ત સ્ટોક',
    bilingual: 'પર્યાપ્ત સ્ટોક (Sufficient)',
  },
  lowStock: {
    en: 'Low Stock Alert',
    gu: 'ઓછો સ્ટોક',
    bilingual: 'ઓછો સ્ટોક (Low Stock)',
  },
  txHistoryTitle: {
    en: 'Transaction History',
    gu: 'વ્યવહાર ઇતિહાસ',
    bilingual: 'વ્યવહાર ઇતિહાસ (Transaction History)',
  },
  records: {
    en: 'records',
    gu: 'રેકોર્ડ્સ',
    bilingual: 'records',
  },
  noRecords: {
    en: 'No transactions yet. Tap "+ Stock Received" or "- Stock Usage".',
    gu: 'હજી સુધી કોઈ રેકોર્ડ નથી. "+ સ્ટોક આવક" અથવા "- દૈનિક વિતરણ" પર ક્લિક કરો.',
    bilingual: 'હજી સુધી કોઈ રેકોર્ડ નથી.',
  },
  balanceWord: {
    en: 'Balance:',
    gu: 'બેલેન્સ:',
    bilingual: 'બેલેન્સ:',
  },
};

export function t(key: keyof typeof I18N, lang: LanguageMode): string {
  const item = I18N[key];
  if (!item) return '';
  return item[lang] || item['en'] || '';
}

export function getCommodityName(item: CommodityItem, lang: LanguageMode): string {
  if (lang === 'gu') return item.nameGu;
  if (lang === 'en') return item.nameEn;
  return item.nameGu;
}

export function getCommodityUnit(item: CommodityItem, lang: LanguageMode): string {
  if (lang === 'gu') return item.unitGu;
  if (lang === 'en') return item.unitEn;
  return `${item.unitGu} (${item.unitEn})`;
}
