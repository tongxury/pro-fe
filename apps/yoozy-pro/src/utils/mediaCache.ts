import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface MediaCacheDB extends DBSchema {
    media_assets: {
        key: string;
        value: {
            url: string;
            blob: Blob;
            timestamp: number;
            contentType: string;
        };
    };
}

const DB_NAME = 'media_cache_db';
const STORE_NAME = 'media_assets';
const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

class MediaCacheService {
    private dbPromise: Promise<IDBPDatabase<MediaCacheDB>>;

    constructor() {
        this.dbPromise = openDB<MediaCacheDB>(DB_NAME, 1, {
            upgrade(db) {
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: 'url' });
                }
            },
        });
    }

    async getUrl(url: string): Promise<string> {
        if (!url) return url;

        try {
            const db = await this.dbPromise;
            const cached = await db.get(STORE_NAME, url);
            const now = Date.now();

            if (cached) {
                if (now - cached.timestamp < CACHE_DURATION) {
                    return URL.createObjectURL(cached.blob);
                } else {
                    // Expired, delete and fetch new
                    await db.delete(STORE_NAME, url);
                }
            }

            // Fetch and cache
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${url}`);
            }

            const blob = await response.blob();
            const contentType = response.headers.get('Content-Type') || '';

            await db.put(STORE_NAME, {
                url,
                blob,
                timestamp: now,
                contentType,
            });

            return URL.createObjectURL(blob);
        } catch (error) {
            console.warn(`[MediaCache] Failed to cache resource: ${url}`, error);
            // Fallback to original URL on error
            return url;
        }
    }

    async clearCache() {
        const db = await this.dbPromise;
        await db.clear(STORE_NAME);
    }
}

export const mediaCache = new MediaCacheService();
