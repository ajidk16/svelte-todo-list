export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, wait = 400) {
	let t: ReturnType<typeof setTimeout>;
	return (...args: Parameters<T>) => {
		clearTimeout(t);
		t = setTimeout(() => fn(...args), wait);
	};
}
