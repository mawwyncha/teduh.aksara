const DB_NAME = 'TeduhAksaraDB';
const DB_VERSION = 3;
const STORES = {
  DRAFT: 'draft',
  HISTORY: 'history',
  SETTINGS: 'settings',
  CACHE: 'cache',
  TTS_CACHE: 'tts_cache'
};

let dbCache: IDBDatabase | null = null;
let isIndexedDBSupported = true;

// Fallback storage menggunakan memory
const memoryStorage: Map<string, Map<string, any>> = new Map();

const getMemoryStore = (storeName: string): Map<string, any> => {
  if (!memoryStorage.has(storeName)) {
    memoryStorage.set(storeName, new Map());
  }
  return memoryStorage.get(storeName)!;
};

export const initDB = (): Promise<IDBDatabase> => {
  if (dbCache) return Promise.resolve(dbCache);

  return new Promise((resolve, reject) => {
    // Check if IndexedDB is supported
    if (!window.indexedDB) {
      console.warn('IndexedDB not supported, using memory storage');
      isIndexedDBSupported = false;
      reject(new Error('IndexedDB not supported'));
      return;
    }

    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        Object.values(STORES).forEach(store => {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store);
          }
        });
      };

      request.onsuccess = () => {
        dbCache = request.result;
        isIndexedDBSupported = true;
        resolve(dbCache);
      };

      request.onerror = () => {
        console.error('IndexedDB error:', request.error);
        isIndexedDBSupported = false;
        reject(request.error);
      };

      request.onblocked = () => {
        console.warn('IndexedDB blocked');
        isIndexedDBSupported = false;
        reject(new Error('IndexedDB blocked'));
      };
    } catch (error) {
      console.error('IndexedDB initialization failed:', error);
      isIndexedDBSupported = false;
      reject(error);
    }
  });
};

export const saveData = async (storeName: string, key: string, value: any): Promise<void> => {
  // Try IndexedDB first
  if (isIndexedDBSupported) {
    try {
      const db = await initDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(value, key);
        request.onsuccess = () => resolve();
        request.onerror = () => {
          console.error('Save error, falling back to memory:', request.error);
          // Fallback to memory
          getMemoryStore(storeName).set(key, value);
          resolve();
        };
      });
    } catch (error) {
      console.warn('IndexedDB save failed, using memory storage:', error);
      isIndexedDBSupported = false;
    }
  }

  // Fallback to memory storage
  getMemoryStore(storeName).set(key, value);
  return Promise.resolve();
};

export const getData = async (storeName: string, key: string): Promise<any> => {
  // Try IndexedDB first
  if (isIndexedDBSupported) {
    try {
      const db = await initDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => {
          console.error('Get error, falling back to memory:', request.error);
          // Fallback to memory
          resolve(getMemoryStore(storeName).get(key));
        };
      });
    } catch (error) {
      console.warn('IndexedDB get failed, using memory storage:', error);
      isIndexedDBSupported = false;
    }
  }

  // Fallback to memory storage
  return Promise.resolve(getMemoryStore(storeName).get(key));
};

export const clearStore = async (storeName: string): Promise<void> => {
  // Try IndexedDB first
  if (isIndexedDBSupported) {
    try {
      const db = await initDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => {
          console.error('Clear error, falling back to memory:', request.error);
          // Fallback to memory
          getMemoryStore(storeName).clear();
          resolve();
        };
      });
    } catch (error) {
      console.warn('IndexedDB clear failed, using memory storage:', error);
      isIndexedDBSupported = false;
    }
  }

  // Fallback to memory storage
  getMemoryStore(storeName).clear();
  return Promise.resolve();
};

export { STORES };