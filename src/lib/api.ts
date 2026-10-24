

export class Api {
	private baseUrl = 'https://api.dev.myjs.org/v1';

	constructor() {
		console.log('Api class initialized.');
	}

	async getStandplan() {
		console.log('Fetching standplan...');
		const response = await fetch(`${this.baseUrl}/standplan`, {
			method: 'GET',
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
}