'use client';

import { useEffect, useState } from 'react';

export function useApiData<T>(url: string, fallback: T) {
	const [data, setData] = useState<T>(fallback);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let active = true;

		async function load() {
			try {
				const res = await fetch(url, { cache: 'no-store' });
				if (!res.ok) throw new Error('Failed to load');
				const json = await res.json();
				if (active && json) setData(json as T);
			} catch (err) {
				if (active) setError(err instanceof Error ? err.message : 'Error');
			} finally {
				if (active) setLoading(false);
			}
		}

		load();
		return () => {
			active = false;
		};
	}, [url]);

	const refresh = async () => {
		setLoading(true);
		try {
			const res = await fetch(url, { cache: 'no-store' });
			if (!res.ok) throw new Error('Failed to load');
			const json = await res.json();
			setData(json as T);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Error');
		} finally {
			setLoading(false);
		}
	};

	return { data, loading, error, setData, refresh };
}
