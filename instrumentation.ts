export async function register() {
	// Node 25+ exposes a broken global localStorage unless --localstorage-file is set.
	// Guard SSR so next-themes / client libs don't crash during render.
	if (
		typeof globalThis.localStorage !== 'undefined' &&
		typeof globalThis.localStorage.getItem !== 'function'
	) {
		const store = new Map<string, string>();
		const memoryStorage: Storage = {
			get length() {
				return store.size;
			},
			clear() {
				store.clear();
			},
			getItem(key: string) {
				return store.has(key) ? store.get(key)! : null;
			},
			key(index: number) {
				return [...store.keys()][index] ?? null;
			},
			removeItem(key: string) {
				store.delete(key);
			},
			setItem(key: string, value: string) {
				store.set(key, String(value));
			},
		};
		Object.defineProperty(globalThis, 'localStorage', {
			value: memoryStorage,
			configurable: true,
			writable: true,
		});
	}
}
