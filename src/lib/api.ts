

export class Api {
	private baseUrl = 'https://api.dev.myjs.org/v1';

	constructor() {
		console.log('Api class initialized.');
	}

	async getShifts(fetcher: typeof fetch = fetch) {
		console.log('Fetching standplan...');
		const response = await fetcher(`${this.baseUrl}/standplan`, {
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

	async addShiftAssignment(shiftId: string, name: string, phoneNumber: string){
		console.log("Post new shift assignments")
		const response = await fetch(`${this.baseUrl}/standplan/shifts/${shiftId}/assignments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, phoneNumber }),
		});
		if (!response.ok) {
			throw new Error(`Error posting shift assignments: ${response.statusText}`);
		}
		const data = await response.json();
		console.log('Shift assignments response:', data);

		return data;
	}
}