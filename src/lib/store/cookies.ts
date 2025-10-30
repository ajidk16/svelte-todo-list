// cookieStore.ts
import { writable, get } from 'svelte/store';

// Store untuk menyimpan cookie key-value
export const cookieStore = writable<{ [key: string]: string }>({});

// Fungsi untuk set cookie di store
export const setCookie = (key: string, value: string) => {
    cookieStore.update((cookies) => {
        cookies[key] = value;
        return cookies;
    });
};

// Fungsi untuk delete cookie dari store
export const deleteCookie = (key: string) => {
    cookieStore.update((cookies) => {
        delete cookies[key];
        return cookies;
    });
};

// Fungsi untuk clear seluruh cookie di store
export const clearCookies = () => {
    cookieStore.set({});
};

// Fungsi sinkron untuk ambil nilai cookie dari store
export const getCookie = (key: string): string | undefined => {
    const cookies = get(cookieStore);
    return cookies[key];
};
