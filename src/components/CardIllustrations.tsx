import React from 'react';

export const TruckStockIllustration: React.FC<{ className?: string }> = ({ className = "w-full h-32" }) => (
  <svg viewBox="0 0 160 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="80" cy="112" rx="70" ry="6" fill="#E2EBE5" />
    {/* Truck Body */}
    <rect x="18" y="32" width="82" height="62" rx="8" fill="#DDE4DF" stroke="#8CA094" strokeWidth="2" />
    <path d="M22 36H96V90H22V36Z" fill="#F4F7F5" />
    {/* Inside Sacks */}
    <ellipse cx="44" cy="80" rx="16" ry="7" fill="#C59B63" stroke="#9E743F" strokeWidth="1.5" />
    <ellipse cx="44" cy="67" rx="16" ry="7" fill="#D6AC75" stroke="#9E743F" strokeWidth="1.5" />
    <ellipse cx="44" cy="54" rx="16" ry="7" fill="#E4BE87" stroke="#9E743F" strokeWidth="1.5" />
    <ellipse cx="72" cy="74" rx="16" ry="7" fill="#C59B63" stroke="#9E743F" strokeWidth="1.5" />
    <ellipse cx="72" cy="61" rx="16" ry="7" fill="#D6AC75" stroke="#9E743F" strokeWidth="1.5" />
    {/* Truck Cab */}
    <path d="M18 52H10C7.8 52 6 53.8 6 56V90C6 92.2 7.8 94 10 94H18V52Z" fill="#13653F" />
    <rect x="8" y="58" width="8" height="14" rx="2" fill="#BAE6FD" />
    <circle cx="8" cy="84" r="3" fill="#F59E0B" />
    {/* Wheels */}
    <circle cx="34" cy="95" r="9" fill="#2E3832" />
    <circle cx="34" cy="95" r="4" fill="#9CA3AF" />
    <circle cx="82" cy="95" r="9" fill="#2E3832" />
    <circle cx="82" cy="95" r="4" fill="#9CA3AF" />
    {/* Worker in Cap carrying sack */}
    <circle cx="124" cy="45" r="8" fill="#F5CBA7" />
    {/* Green Cap */}
    <path d="M116 43C116 38 132 38 132 43H138L116 43Z" fill="#13653F" />
    {/* Yellow/Orange Shirt */}
    <path d="M116 53C116 53 120 72 120 78H132V53H116Z" fill="#F97316" />
    {/* Arms holding sack */}
    <path d="M120 56L108 52L106 60L118 64" fill="#F5CBA7" stroke="#C59B63" strokeWidth="1" />
    {/* Green Pants */}
    <rect x="118" y="78" width="6" height="24" fill="#13653F" rx="2" />
    <rect x="126" y="78" width="6" height="24" fill="#0D5230" rx="2" />
    <rect x="116" y="100" width="10" height="4" fill="#2E3832" rx="1" />
    <rect x="126" y="100" width="10" height="4" fill="#2E3832" rx="1" />
    {/* Sack in Worker Hands */}
    <path d="M96 46C92 48 90 56 94 62C98 68 112 66 114 60C116 54 110 46 96 46Z" fill="#D6AC75" stroke="#9E743F" strokeWidth="1.5" />
    <path d="M92 48L90 44M94 49L93 45" stroke="#9E743F" strokeWidth="1.5" />
  </svg>
);

export const StockUsageIllustration: React.FC<{ className?: string }> = ({ className = "w-full h-32" }) => (
  <svg viewBox="0 0 160 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="80" cy="112" rx="65" ry="5" fill="#E2EBE5" />
    {/* Large Rice Grain Sack */}
    <path d="M28 102C24 60 30 45 52 42C74 39 88 55 86 102H28Z" fill="#D6AC75" stroke="#9E743F" strokeWidth="2" />
    <path d="M40 44C44 38 60 38 64 44" fill="#E4BE87" stroke="#9E743F" strokeWidth="1.5" />
    {/* Rice grains piling out */}
    <ellipse cx="52" cy="38" rx="14" ry="7" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1" />
    <circle cx="50" cy="37" r="1.5" fill="#E5E7EB" />
    <circle cx="55" cy="39" r="1.5" fill="#E5E7EB" />
    <circle cx="46" cy="39" r="1.5" fill="#E5E7EB" />
    {/* Wheat Stalks on Right */}
    <path d="M100 102C106 80 115 50 128 35" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
    <ellipse cx="124" cy="40" rx="4" ry="8" transform="rotate(30 124 40)" fill="#F59E0B" />
    <ellipse cx="120" cy="50" rx="4" ry="8" transform="rotate(-30 120 50)" fill="#F59E0B" />
    <ellipse cx="116" cy="62" rx="4" ry="8" transform="rotate(25 116 62)" fill="#F59E0B" />
    <ellipse cx="112" cy="74" rx="4" ry="8" transform="rotate(-25 112 74)" fill="#F59E0B" />
    {/* Blue Bowl of Rice with Wooden Spoon */}
    <ellipse cx="90" cy="86" rx="28" ry="12" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2" />
    <ellipse cx="90" cy="83" rx="25" ry="9" fill="#FFFFFF" />
    <circle cx="86" cy="82" r="1.5" fill="#D1D5DB" />
    <circle cx="94" cy="84" r="1.5" fill="#D1D5DB" />
    <circle cx="91" cy="80" r="1.5" fill="#D1D5DB" />
    {/* Wooden Scoop Spoon */}
    <path d="M105 82L125 96C127 97 128 100 126 102C124 104 121 103 120 101L102 85" stroke="#92400E" strokeWidth="4" strokeLinecap="round" />
    <ellipse cx="102" cy="84" rx="6" ry="4" fill="#B45309" transform="rotate(-20 102 84)" />
  </svg>
);

export const BalanceShelfIllustration: React.FC<{ className?: string }> = ({ className = "w-full h-32" }) => (
  <svg viewBox="0 0 160 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="80" cy="112" rx="65" ry="5" fill="#E2EBE5" />
    {/* Metal / Wood Rack */}
    <rect x="22" y="24" width="8" height="86" rx="2" fill="#4B6358" />
    <rect x="130" y="24" width="8" height="86" rx="2" fill="#4B6358" />
    {/* Shelves */}
    <rect x="20" y="44" width="120" height="6" rx="2" fill="#718F83" />
    <rect x="20" y="76" width="120" height="6" rx="2" fill="#718F83" />
    <rect x="20" y="106" width="120" height="6" rx="2" fill="#718F83" />
    {/* Top Shelf Items: Sacks & Ghee/Oil Jar */}
    <rect x="36" y="28" width="18" height="16" rx="4" fill="#D6AC75" stroke="#9E743F" strokeWidth="1" />
    <rect x="60" y="28" width="18" height="16" rx="4" fill="#D6AC75" stroke="#9E743F" strokeWidth="1" />
    <rect x="84" y="28" width="18" height="16" rx="4" fill="#D6AC75" stroke="#9E743F" strokeWidth="1" />
    {/* Jar on top shelf */}
    <rect x="110" y="30" width="14" height="14" rx="3" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
    <rect x="109" y="28" width="16" height="3" rx="1" fill="#DC2626" />
    {/* Middle Shelf: More Sacks and Big Jar */}
    <rect x="36" y="58" width="22" height="18" rx="4" fill="#C59B63" stroke="#9E743F" strokeWidth="1" />
    <rect x="64" y="58" width="22" height="18" rx="4" fill="#C59B63" stroke="#9E743F" strokeWidth="1" />
    <rect x="92" y="58" width="22" height="18" rx="4" fill="#C59B63" stroke="#9E743F" strokeWidth="1" />
    {/* Big Yellow Jar */}
    <rect x="120" y="60" width="14" height="16" rx="3" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1" />
    <rect x="119" y="58" width="16" height="3" rx="1" fill="#EA580C" />
    {/* Bottom Shelf Sacks */}
    <rect x="34" y="90" width="26" height="16" rx="3" fill="#D6AC75" stroke="#9E743F" strokeWidth="1" />
    <rect x="66" y="90" width="26" height="16" rx="3" fill="#D6AC75" stroke="#9E743F" strokeWidth="1" />
    <rect x="98" y="90" width="26" height="16" rx="3" fill="#D6AC75" stroke="#9E743F" strokeWidth="1" />
  </svg>
);

export const SetuShareIllustration: React.FC<{ className?: string }> = ({ className = "w-full h-32" }) => (
  <svg viewBox="0 0 160 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="80" cy="112" rx="60" ry="5" fill="#E2EBE5" />
    {/* Left Anganwadi Worker (Magenta Saree) */}
    <circle cx="50" cy="38" r="14" fill="#F5CBA7" />
    <path d="M38 34C38 24 62 24 62 34C62 38 60 42 56 42H44C40 42 38 38 38 34Z" fill="#1F2937" />
    <circle cx="50" cy="34" r="1.5" fill="#BE123C" /> {/* Bindi */}
    <path d="M30 62C30 50 70 50 70 62V105H30V62Z" fill="#BE185D" />
    {/* Orange Saree Pallu drape */}
    <path d="M40 54L68 86L60 92L34 58Z" fill="#F97316" />
    <rect x="64" y="60" width="14" height="24" rx="3" fill="#1E293B" />
    <rect x="66" y="63" width="10" height="18" rx="1" fill="#38BDF8" />
    
    {/* Right Anganwadi Worker (Green/Yellow Saree) */}
    <circle cx="110" cy="38" r="14" fill="#F5CBA7" />
    <path d="M98 34C98 24 122 24 122 34C122 38 120 42 116 42H104C100 42 98 38 98 34Z" fill="#1F2937" />
    <circle cx="110" cy="34" r="1.5" fill="#BE123C" /> {/* Bindi */}
    <path d="M90 62C90 50 130 50 130 62V105H90V62Z" fill="#13653F" />
    {/* Yellow Pallu */}
    <path d="M120 54L92 86L100 92L126 58Z" fill="#FACC15" />
    
    {/* Share Connection Icon between them */}
    <circle cx="80" cy="62" r="12" fill="#E0F2FE" />
    <path d="M74 62L82 56M74 62L82 68" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="74" cy="62" r="3" fill="#0284C7" />
    <circle cx="84" cy="56" r="3" fill="#0284C7" />
    <circle cx="84" cy="68" r="3" fill="#0284C7" />
  </svg>
);

export const DailyMenuIllustration: React.FC<{ className?: string }> = ({ className = "w-full h-32" }) => (
  <svg viewBox="0 0 160 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="80" cy="112" rx="65" ry="5" fill="#E2EBE5" />
    {/* Stainless Steel Thali */}
    <ellipse cx="80" cy="74" rx="58" ry="34" fill="#94A3B8" />
    <ellipse cx="80" cy="72" rx="54" ry="31" fill="#E2E8F0" />
    <ellipse cx="80" cy="70" rx="50" ry="28" fill="#F8FAFC" />
    {/* Central Rice Portion */}
    <ellipse cx="78" cy="75" rx="26" ry="15" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
    <circle cx="72" cy="74" r="1.5" fill="#CBD5E1" />
    <circle cx="82" cy="76" r="1.5" fill="#CBD5E1" />
    <circle cx="77" cy="72" r="1.5" fill="#CBD5E1" />
    <circle cx="84" cy="71" r="1.5" fill="#CBD5E1" />
    {/* Dal Katori Top Right */}
    <ellipse cx="106" cy="58" rx="16" ry="10" fill="#94A3B8" />
    <ellipse cx="106" cy="57" rx="14" ry="8" fill="#F59E0B" />
    <ellipse cx="106" cy="56" rx="11" ry="6" fill="#D97706" />
    <circle cx="106" cy="55" r="2" fill="#15803D" /> {/* Coriander garnish */}
    {/* Veggies & Salad Katori Left */}
    <ellipse cx="50" cy="62" rx="16" ry="10" fill="#94A3B8" />
    <ellipse cx="50" cy="61" rx="14" ry="8" fill="#16A34A" />
    <circle cx="46" cy="60" r="3" fill="#EA580C" /> {/* Carrot cubes */}
    <circle cx="53" cy="62" r="2.5" fill="#22C55E" /> {/* Peas */}
    <circle cx="51" cy="58" r="3" fill="#F97316" />
    {/* Sukhadi / Sweet slice on corner */}
    <path d="M42 80L54 84L48 92Z" fill="#B45309" stroke="#78350F" strokeWidth="1" />
  </svg>
);

export const AttendanceIllustration: React.FC<{ className?: string }> = ({ className = "w-full h-32" }) => (
  <svg viewBox="0 0 160 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="80" cy="112" rx="60" ry="5" fill="#E2EBE5" />
    {/* School Child with Hair Pigtails */}
    <circle cx="80" cy="46" r="16" fill="#F5CBA7" />
    <path d="M66 40C66 28 94 28 94 40C94 44 90 48 86 48H74C70 48 66 44 66 40Z" fill="#1F2937" />
    {/* Pigtails */}
    <ellipse cx="64" cy="50" rx="5" ry="8" fill="#1F2937" />
    <ellipse cx="96" cy="50" rx="5" ry="8" fill="#1F2937" />
    {/* Friendly Face */}
    <circle cx="75" cy="44" r="2" fill="#1F2937" />
    <circle cx="85" cy="44" r="2" fill="#1F2937" />
    <path d="M76 52C78 55 82 55 84 52" stroke="#BE123C" strokeWidth="2" strokeLinecap="round" />
    {/* School Uniform (Blue Pinafore & White Collar) */}
    <path d="M66 65C66 65 72 62 80 62C88 62 94 65 94 65L98 105H62L66 65Z" fill="#2563EB" />
    <path d="M74 63L80 72L86 63Z" fill="#FFFFFF" />
    {/* Waving Hand Up on Left */}
    <path d="M66 70L50 50" stroke="#F5CBA7" strokeWidth="6" strokeLinecap="round" />
    <circle cx="48" cy="48" r="5" fill="#F5CBA7" />
    {/* Green Attendance Check Badge */}
    <circle cx="118" cy="50" r="14" fill="#22C55E" />
    <path d="M112 50L116 54L125 45" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MealPhotoIllustration: React.FC<{ className?: string }> = ({ className = "w-full h-32" }) => (
  <svg viewBox="0 0 160 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="80" cy="112" rx="60" ry="5" fill="#E2EBE5" />
    {/* Big Digital Camera */}
    <rect x="25" y="44" width="75" height="55" rx="8" fill="#374151" stroke="#1F2937" strokeWidth="2" />
    <rect x="42" y="36" width="28" height="8" rx="2" fill="#4B5563" />
    <circle cx="85" cy="52" r="4" fill="#F59E0B" /> {/* Flash */}
    {/* Flash burst lines */}
    <path d="M92 46L102 38M94 54L105 52M88 42L95 32" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    {/* Lens */}
    <circle cx="62" cy="72" r="18" fill="#1F2937" stroke="#6B7280" strokeWidth="2" />
    <circle cx="62" cy="72" r="12" fill="#111827" />
    <circle cx="60" cy="70" r="4" fill="#60A5FA" />
    {/* Printed Photo Card in foreground */}
    <g transform="rotate(8 110 75)">
      <rect x="80" y="50" width="54" height="46" rx="4" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="2" />
      {/* Miniature Thali inside photo */}
      <circle cx="107" cy="72" r="16" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1" />
      <circle cx="107" cy="72" r="8" fill="#FFFFFF" />
      <circle cx="115" cy="68" r="4" fill="#F59E0B" />
      <circle cx="100" cy="70" r="4" fill="#16A34A" />
    </g>
  </svg>
);

export const SmartRationIllustration: React.FC<{ className?: string }> = ({ className = "w-full h-32" }) => (
  <svg viewBox="0 0 160 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="80" cy="112" rx="60" ry="5" fill="#E2EBE5" />
    {/* Ration Sack */}
    <path d="M30 105C26 68 32 54 52 50C72 46 84 60 84 105H30Z" fill="#D6AC75" stroke="#9E743F" strokeWidth="2" />
    <text x="57" y="76" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#78350F" letterSpacing="0.5">RATION</text>
    {/* Green Leaf Logo on sack */}
    <path d="M57 82C62 82 66 86 64 92C58 92 54 88 57 82Z" fill="#16A34A" />
    <path d="M57 92L55 95" stroke="#15803D" strokeWidth="1.5" />
    {/* Clipboard Register with Checklist */}
    <rect x="82" y="38" width="54" height="70" rx="4" fill="#13653F" />
    <rect x="85" y="44" width="48" height="61" rx="2" fill="#FFFFFF" />
    {/* Metal clip */}
    <rect x="98" y="34" width="22" height="8" rx="2" fill="#9CA3AF" stroke="#6B7280" strokeWidth="1" />
    {/* Checklist items */}
    <circle cx="94" cy="54" r="4" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1" />
    <path d="M92 54L94 56L97 52" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="102" y="52" width="24" height="3" rx="1.5" fill="#94A3B8" />
    
    <circle cx="94" cy="68" r="4" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1" />
    <path d="M92 68L94 70L97 66" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="102" y="66" width="24" height="3" rx="1.5" fill="#94A3B8" />

    <circle cx="94" cy="82" r="4" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1" />
    <path d="M92 82L94 84L97 80" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="102" y="80" width="24" height="3" rx="1.5" fill="#94A3B8" />
  </svg>
);

export const DownloadReportIllustration: React.FC<{ className?: string }> = ({ className = "w-full h-32" }) => (
  <svg viewBox="0 0 160 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="80" cy="112" rx="60" ry="5" fill="#E2EBE5" />
    {/* Report Document Sheet */}
    <rect x="42" y="24" width="70" height="86" rx="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
    <path d="M92 24L112 44H96C93.8 44 92 42.2 92 40V24Z" fill="#E2E8F0" />
    {/* Text lines */}
    <rect x="52" y="34" width="30" height="4" rx="2" fill="#94A3B8" />
    <rect x="52" y="42" width="24" height="3" rx="1.5" fill="#CBD5E1" />
    {/* Bar Chart inside Document */}
    <rect x="54" y="80" width="8" height="16" rx="2" fill="#FBBF24" />
    <rect x="66" y="68" width="8" height="28" rx="2" fill="#F97316" />
    <rect x="78" y="56" width="8" height="40" rx="2" fill="#22C55E" />
    {/* Floating Green Download Circle with Arrow */}
    <circle cx="106" cy="84" r="16" fill="#16A34A" />
    <circle cx="106" cy="84" r="14" fill="#13653F" />
    <path d="M106 76V88M106 88L101 83M106 88L111 83" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M99 92H113" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
