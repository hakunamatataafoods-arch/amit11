import React, { useEffect, useState } from 'react';
import { 
  ChevronLeft, 
  Database, 
  RefreshCw, 
  Clock, 
  Layers, 
  ShieldCheck, 
  AlertCircle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { 
  COMMODITIES, 
  LanguageMode, 
  t, 
  getCommodityName, 
  getCommodityUnit 
} from '../data/translations';
import { 
  fetchActiveStockRest, 
  fetchTransactionsRest, 
  ActiveStockRecord, 
  TransactionRecord, 
  DEFAULT_VILLAGE,
  getFirebaseDb
} from '../services/firebase';

interface BalanceRemainingViewProps {
  onBack: () => void;
  lang: LanguageMode;
  currentBalances: Record<string, number>;
  onNavigateInward: () => void;
  onNavigateUsage: () => void;
}

export const BalanceRemainingView: React.FC<BalanceRemainingViewProps> = ({
  onBack,
  lang,
  currentBalances,
  onNavigateInward,
  onNavigateUsage,
}) => {
  const [activeStock, setActiveStock] = useState<ActiveStockRecord | null>(null);
  const [history, setHistory] = useState<TransactionRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const active = await fetchActiveStockRest();
      if (active) setActiveStock(active);

      const txs = await fetchTransactionsRest();
      if (txs && txs.length > 0) {
        setHistory(txs);
      } else {
        const local = localStorage.getItem('poshan_setu_history');
        if (local) setHistory(JSON.parse(local));
      }
    } catch (e) {
      console.warn("Could not fetch remote Firebase state:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const db = getFirebaseDb();
    if (db) {
      const activeRef = db.ref('active_stock');
      const histRef = db.ref('transaction_history');

      const onActiveChange = (snap: any) => {
        const val = snap.val();
        if (val) setActiveStock(val);
      };

      const onHistChange = (snap: any) => {
        const val = snap.val();
        if (val) {
          const list = Object.entries(val).map(([id, item]: [string, any]) => ({
            id,
            ...item,
          })).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
          setHistory(list);
        }
      };

      activeRef.on('value', onActiveChange);
      histRef.on('value', onHistChange);

      return () => {
        activeRef.off('value', onActiveChange);
        histRef.off('value', onHistChange);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F9F3] text-gray-900 pb-28 pt-3 px-4 max-w-md mx-auto relative animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between pt-2 pb-3">
        <button
          onClick={onBack}
          aria-label={t('back', lang)}
          className="w-11 h-11 rounded-full bg-emerald-100/70 hover:bg-emerald-200 text-[#13653F] flex items-center justify-center transition active:scale-95 shadow-sm"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>

        <div className="text-center">
          <h1 className="text-lg font-bold text-gray-900">
            {t('balanceTitle', lang)}
          </h1>
          <p className="text-xs text-gray-500 font-medium">AWC-10103 • {DEFAULT_VILLAGE}</p>
        </div>

        <button
          onClick={loadData}
          disabled={isLoading}
          aria-label="Refresh Data"
          className="w-11 h-11 rounded-full bg-emerald-100/70 hover:bg-emerald-200 text-[#13653F] flex items-center justify-center transition active:scale-95 shadow-sm"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Firebase Status Badge */}
      <div className="bg-white rounded-2xl p-3 shadow-xs border border-emerald-100 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#13653F]"></span>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#13653F]" />
              Firebase Realtime Database
            </div>
            <div className="text-[10px] text-gray-500 truncate max-w-[210px]">
              poshan-setu-default-rtdb.firebaseio.com
            </div>
          </div>
        </div>
        <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          {t('liveSync', lang)}
        </div>
      </div>

      {/* Commodity Balance Cards */}
      <div className="space-y-3 mb-5">
        {COMMODITIES.map((c) => {
          const bal = currentBalances[c.id] ?? c.defaultBalance;
          const isLow = bal < 30;

          return (
            <div
              key={c.id}
              className="bg-white rounded-3xl p-4 shadow-sm border border-emerald-50 hover:border-emerald-200 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm sm:text-base font-bold text-gray-900">
                    {getCommodityName(c, lang)}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {c.nameEn}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#13653F]">
                    {bal}
                  </div>
                  <div className="text-xs font-semibold text-gray-600">
                    {getCommodityUnit(c, lang)}
                  </div>
                </div>
              </div>

              {/* Status and info pill */}
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t('qualityVerified', lang)}</span>
                </div>
                {isLow ? (
                  <span className="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {t('lowStock', lang)}
                  </span>
                ) : (
                  <span className="text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                    {t('sufficientStock', lang)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Stock JSON Node inspector */}
      {activeStock && (
        <div className="bg-[#E2F5E9]/60 rounded-3xl p-4 border border-emerald-200 mb-5">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#13653F]">
            <Layers className="w-4 h-4" />
            <span>Firebase /active_stock {lang === 'en' ? 'Node' : 'નોડ'}</span>
          </div>
          <div className="bg-white/80 rounded-2xl p-3 text-xs space-y-1 text-gray-800 font-mono">
            <div className="flex justify-between">
              <span className="text-gray-500">balance:</span>
              <span className="font-bold text-[#13653F]">{activeStock.balance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">lastAction:</span>
              <span className="font-semibold text-gray-700">{activeStock.lastAction}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">change:</span>
              <span className={`font-bold ${activeStock.change > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                {activeStock.change > 0 ? `+${activeStock.change}` : activeStock.change}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">village:</span>
              <span className="font-semibold text-gray-900">{activeStock.village}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">timestamp:</span>
              <span className="text-[11px] text-gray-600">
                {new Date(activeStock.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <button
          onClick={onNavigateInward}
          className="bg-[#13653F] hover:bg-[#0E4E30] text-white py-3 px-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition"
        >
          <TrendingUp className="w-4 h-4" />
          <span>{t('card1Sub', lang)}</span>
        </button>

        <button
          onClick={onNavigateUsage}
          className="bg-[#0284C7] hover:bg-[#0369A1] text-white py-3 px-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition"
        >
          <TrendingDown className="w-4 h-4" />
          <span>{t('card2Sub', lang)}</span>
        </button>
      </div>

      {/* Transaction History Feed */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-emerald-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-700" />
            <h3 className="text-sm sm:text-base font-bold text-gray-900">
              {t('txHistoryTitle', lang)}
            </h3>
          </div>
          <span className="text-xs text-gray-500">{history.length} {t('records', lang)}</span>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-6 text-xs text-gray-400">
            {t('noRecords', lang)}
          </div>
        ) : (
          <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto pr-1">
            {history.map((tx, idx) => (
              <div key={tx.id || idx} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-gray-800 flex items-center gap-1">
                    <span>{tx.lastAction}</span>
                    <span className="text-gray-400 font-normal">• {tx.commodity?.split(' ')[0] || 'Stock'}</span>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">
                    {new Date(tx.timestamp).toLocaleDateString(lang === 'gu' ? 'gu-IN' : 'en-IN', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    • {tx.village}
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`font-extrabold text-sm ${
                      (tx.change || 0) >= 0 ? 'text-[#13653F]' : 'text-rose-600'
                    }`}
                  >
                    {(tx.change || 0) >= 0 ? `+${tx.change}` : tx.change}
                  </span>
                  <div className="text-[10px] text-gray-400">
                    {t('balanceWord', lang)} {tx.balance}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
