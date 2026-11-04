export interface StandplanFile {
	id: number;
	title: string;
	description: string;
	url: string;
}

export class Api {
	private baseUrl = '/api/v1';

	constructor() {
		console.log('Api class initialized.');
	}

	async getShifts(fetcher: typeof fetch = fetch) {
		console.log('Fetching standplan...');
		const response = await fetcher(`${this.baseUrl}/standplan`, {
			method: 'GET',
			cache: 'no-store',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			throw new Error(`Error fetching standplan: ${response.statusText}`);
		}
		const data = await response.json();
		console.log('Standplan data:', data);

		return data;
	}

	async addShiftAssignment(shiftId: string, name: string, phoneNumber: string) {
		if (typeof navigator !== 'undefined' && !navigator.onLine) {
			throw new Error('OFFLINE');
		}

		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 8000);

		try {
			const response = await fetch(`${this.baseUrl}/standplan/shifts/${shiftId}/assignments`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, phoneNumber }),
				signal: controller.signal,
			});
			if (!response.ok) {
				throw new Error(`Error posting shift assignments: ${response.statusText}`);
			}
			const data = await response.json();
			console.log('Shift assignments response:', data);

			return data;
		} catch (error) {
			if (error instanceof DOMException && error.name === 'AbortError') {
				throw new Error('TIMEOUT');
			}
			throw error;
		} finally {
			clearTimeout(timeout);
		}
	}

	async getFiles(fetcher: typeof fetch = fetch): Promise<StandplanFile[]> {
		const response = await fetcher(`${this.baseUrl}/standplan/files`, {
			method: 'GET',
			cache: 'no-store',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			throw new Error(`Error fetching files: ${response.statusText}`);
		}
		const data = await response.json();

		return data.files;
	}

	async getWafflCount(){
		// console.log('Fetching waffl count...');
		const response = await fetch(`${this.baseUrl}/waffeln`, {
			method: 'GET',
			cache: 'no-store',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			throw new Error(`Error fetching waffl count: ${response.statusText}`);
		}
		const data = await response.json();
		// console.log('Waffl count data:', data);

		return data.waffelnTotal;
	}
}