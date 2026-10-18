/**
 * Firebase Realtime Database Client for PoshanSetu
 * Connects to: https://poshan-setu-default-rtdb.firebaseio.com/
 */

export interface ActiveStockRecord {
  balance: number;
  lastAction: string;
  change: number;
  timestamp: number | string;
  village: string;
  commodity?: string;
  challanNo?: string;
  expiryDate?: string;
}

export interface TransactionRecord {
  id?: string;
  balance: number;
  lastAction: string;
  change: number;
  timestamp: number;
  village: string;
  commodity: string;
  challanNo?: string;
  expiryDate?: string;
  workerName?: string;
  centerName?: string;
  notes?: string;
}

declare global {
  interface Window {
    firebase?: any;
  }
}

const FIREBASE_DB_URL = "https://poshan-setu-default-rtdb.firebaseio.com";
export const DEFAULT_VILLAGE = "૦૪ - વડતાલ";

let isInitialized = false;

export function getFirebaseDb() {
  if (typeof window === 'undefined') return null;

  if (window.firebase) {
    try {
      if (!window.firebase.apps || window.firebase.apps.length === 0) {
        window.firebase.initializeApp({
          databaseURL: FIREBASE_DB_URL,
        });
      }
      isInitialized = true;
      return window.firebase.database();
    } catch (e) {
      console.warn("Firebase SDK init notice:", e);
    }
  }
  return null;
}

// REST fallback in case CDN script is slow to mount or offline queueing
async function writeActiveStockRest(data: ActiveStockRecord): Promise<boolean> {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/active_stock.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (err) {
    console.warn("REST write error for active_stock:", err);
    return false;
  }
}

async function pushTransactionRest(data: TransactionRecord): Promise<string | null> {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/transaction_history.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const json = await res.json();
      return json.name || null;
    }
    return null;
  } catch (err) {
    console.warn("REST write error for transaction_history:", err);
    return null;
  }
}

export async function fetchActiveStockRest(): Promise<ActiveStockRecord | null> {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/active_stock.json`);
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object') {
        return data as ActiveStockRecord;
      }
    }
  } catch (e) {
    console.warn("Could not fetch active_stock via REST:", e);
  }
  return null;
}

export async function fetchTransactionsRest(): Promise<TransactionRecord[]> {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/transaction_history.json?orderBy="$key"&limitToLast=20`);
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object') {
        return Object.entries(data).map(([id, val]: [string, any]) => ({
          id,
          ...val,
        })).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      }
    }
  } catch (e) {
    console.warn("Could not fetch transactions via REST:", e);
  }
  return [];
}

/**
 * Save Stock Inward or Distribution
 * 1. Writes active_stock object: { balance, lastAction, change, timestamp, village: "૦૪ - વડતાલ" }
 * 2. Pushes to transaction_history
 */
export async function recordStockAction(params: {
  newBalance: number;
  lastAction: string;
  change: number;
  commodity: string;
  challanNo?: string;
  expiryDate?: string;
  village?: string;
  workerName?: string;
  centerName?: string;
}): Promise<{ success: boolean; isOnline: boolean }> {
  const timestamp = Date.now();
  const village = params.village || DEFAULT_VILLAGE;

  const activeStockData: ActiveStockRecord = {
    balance: params.newBalance,
    lastAction: params.lastAction,
    change: params.change,
    timestamp: timestamp,
    village: village,
    commodity: params.commodity,
    challanNo: params.challanNo,
    expiryDate: params.expiryDate,
  };

  const transactionData: TransactionRecord = {
    balance: params.newBalance,
    lastAction: params.lastAction,
    change: params.change,
    timestamp: timestamp,
    village: village,
    commodity: params.commodity,
    challanNo: params.challanNo,
    expiryDate: params.expiryDate,
    workerName: params.workerName || "Anita Sharma",
    centerName: params.centerName || "AWC-10103 Kalyan Centre",
  };

  // Always save locally for offline-first support
  try {
    localStorage.setItem('poshan_setu_active_stock', JSON.stringify(activeStockData));
    const cachedHistory = JSON.parse(localStorage.getItem('poshan_setu_history') || '[]');
    cachedHistory.unshift({ ...transactionData, id: 'local_' + timestamp });
    localStorage.setItem('poshan_setu_history', JSON.stringify(cachedHistory.slice(0, 50)));
  } catch (e) {
    console.warn("Local storage write error:", e);
  }

  // Attempt write via Firebase SDK first
  const db = getFirebaseDb();
  let sdkSuccess = false;

  if (db) {
    try {
      const activeStockRef = db.ref('active_stock');
      const historyRef = db.ref('transaction_history');

      await activeStockRef.set(activeStockData);
      await historyRef.push(transactionData);
      sdkSuccess = true;
      return { success: true, isOnline: true };
    } catch (err) {
      console.warn("Firebase SDK write failed, falling back to REST:", err);
    }
  }

  // Fallback to REST API
  if (!sdkSuccess) {
    const r1 = await writeActiveStockRest(activeStockData);
    const r2 = await pushTransactionRest(transactionData);
    if (r1 || r2) {
      return { success: true, isOnline: true };
    }
  }

  // If both failed (offline device), return success: true with isOnline: false (optimistic offline write)
  return { success: true, isOnline: navigator.onLine };
}

/**
 * Listen for live updates from Firebase Realtime Database
 */
export function subscribeToActiveStock(callback: (data: ActiveStockRecord) => void): () => void {
  const db = getFirebaseDb();
  if (db) {
    const activeRef = db.ref('active_stock');
    const onValueChange = (snapshot: any) => {
      const val = snapshot.val();
      if (val) {
        callback(val);
      }
    };
    activeRef.on('value', onValueChange);
    return () => activeRef.off('value', onValueChange);
  }

  // Periodic polling fallback if SDK not yet attached
  const interval = setInterval(async () => {
    const data = await fetchActiveStockRest();
    if (data) callback(data);
  }, 10000);

  return () => clearInterval(interval);
}
