/* eslint-disable svelte/no-navigation-without-resolve */
import { goto } from '$app/navigation';

export function goPrev(page: number, limit: number) {
	return goto(`/todo?page=${page - 1}&limit=${limit}`, { noScroll: true });
}
export function goNext(page: number, limit: number) {
	return goto(`/todo?page=${page + 1}&limit=${limit}`, { noScroll: true });
}
export function goWithParams(params: {
	page?: number;
	limit?: number;
	dateFilter?: string;
	search?: string;
}) {
	const q = new URLSearchParams();
	if (params.page) q.set('page', String(params.page));
	if (params.limit) q.set('limit', String(params.limit));
	if (params.dateFilter !== undefined) q.set('date-filter', params.dateFilter ?? '');
	if (params.search !== undefined) q.set('search', params.search ?? '');
	return goto(`/todo?${q.toString()}`, { noScroll: true });
}
