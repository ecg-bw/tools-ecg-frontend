import { Api } from '#lib/api.js';

export type Shift = {
	id: string;
	title: string;
	startTime: string;
	endTime: string;
	required_slots: number;
	shift_assignments?: { id: number; name: string; phoneNumber: string }[] | null;
};

export type Shifts = {
	weekends: {
		days: {
			date: string;
			dayOfWeek: number;
			shifts: (Shift | null)[];
		}[];
	}[];
};

export const shiftsStore = $state<{ data: Shifts | null; error: string | null }>({
	data: null,
	error: null
});

export async function loadShifts() {
	try {
		shiftsStore.data = await new Api().getShifts();
		shiftsStore.error = null;
	} catch (error) {
		shiftsStore.error =
			error instanceof Error ? error.message : 'Der Standplan konnte nicht geladen werden.';
	}
}
