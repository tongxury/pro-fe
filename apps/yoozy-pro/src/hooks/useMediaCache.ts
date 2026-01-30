import { useState, useEffect, useRef } from 'react';
import { mediaCache } from '../utils/mediaCache';


export const useMediaCacheFn = () => {
    const [cacheMap, setCacheMap] = useState<Record<string, string>>({});
    const queueRef = useRef<Set<string>>(new Set());
    // pendingRef tracks URLs that are currently being fetched or have been queued to avoid repetitive queueing
    const pendingRef = useRef<Set<string>>(new Set());

    useEffect(() => {
        const processQueue = async () => {
            const urls = Array.from(queueRef.current);
            queueRef.current.clear();

            if (urls.length === 0) return;

            const newCache: Record<string, string> = {};

            await Promise.all(urls.map(async (url) => {
                // If it's a data URL or blob URL already, don't cache, and remove from pending
                if (!url || url.startsWith('data:') || url.startsWith('blob:')) {
                    pendingRef.current.delete(url);
                    return;
                }
                try {
                    const cached = await mediaCache.getUrl(url);
                    if (cached) {
                        newCache[url] = cached;
                    }
                } catch (e) {
                    console.error('Failed to cache', url, e);
                    // If failed, fallback to original URL to stop retrying and allow browser to handle it
                    newCache[url] = url;
                } finally {
                    // Remove from pending regardless of success or failure, as the attempt is complete
                    pendingRef.current.delete(url);
                }
            }));

            if (Object.keys(newCache).length > 0) {
                setCacheMap(prev => ({ ...prev, ...newCache }));
            }
        };

        processQueue();
    }); // Run on every render to check queue from that render

    const cached = (url?: string) => {
        if (!url) return undefined;
        if (url.startsWith('data:') || url.startsWith('blob:')) return url;

        if (cacheMap[url]) return cacheMap[url];

        // If not mapped and not pending, queue it
        if (!pendingRef.current.has(url)) {
            pendingRef.current.add(url);
            queueRef.current.add(url);
        }

        // Return undefined while loading to prevent browser from fetching original URL
        return undefined;
    };

    return cached;
};
