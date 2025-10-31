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
export const getToken = (key: string): string | undefined => {
	const cookies = get(cookieStore);
	return cookies[key];
};

export function getCookie(name: string): string | undefined {
	// Hanya berjalan di browser
	if (typeof document === 'undefined') return undefined;
	const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
	for (const cookie of cookies) {
		const [key, ...rest] = cookie.split('=');
		if (key === name) {
			try {
				return JSON.parse(decodeURIComponent(rest.join('=')));
			} catch {
				return rest.join('=');
			}
		}
	}
	return undefined;
}
