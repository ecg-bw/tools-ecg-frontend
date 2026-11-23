// src/lib/features/standplan/state.svelte.ts
import { createStandplanApi, ApiError } from '#lib/api/client.js';
import type {
  CreateFilesRequest,
  Day,
  FileInfo,
  Shift,
  ShiftAssignment,
  ShiftAssignmentRequest,
  StandplanResponse,
} from '#lib/api/types.js';

export class StandplanStore {
  data = $state<StandplanResponse>({ weekends: [] });
  waffelnTotal = $state<number>(0);
  files = $state<FileInfo[]>([]);

  selectedWeekendIndex = $state<number>(0);
  selectedDayId = $state<number | null>(null);
  loading = $state<boolean>(false);
  error = $state<string | null>(null);

  private api = createStandplanApi({ baseUrl: "/api/v1" });

  constructor(initial: {
    standplan: StandplanResponse;
    waffelnTotal: number;
    files: FileInfo[];
  }) {
    this.data = initial.standplan;  
    this.waffelnTotal = initial.waffelnTotal;
    this.files = initial.files;
    this.selectedDayId =
      initial.standplan.weekends[0]?.days[0]?.id ?? null;
  }

  currentWeekend = $derived(
    this.data.weekends[this.selectedWeekendIndex] ?? this.data.weekends[0]
  );

  currentDay = $derived<Day | undefined>(
    this.currentWeekend?.days.find((d) => d.id === this.selectedDayId) ??
    this.currentWeekend?.days[0]
  );

  selectWeekend(index: number) {
    this.selectedWeekendIndex = index;
    const firstDay = this.data.weekends[index]?.days[0];
    this.selectedDayId = firstDay?.id ?? null;
  }

  async refreshStandplan() {
    this.loading = true;
    this.error = null;
    try {
      this.data = await this.api.getStandplan();
    } catch (err) {
      this.error =
        err instanceof ApiError
          ? `Standplan konnte nicht geladen werden (${err.status})`
          : 'Netzwerkfehler beim Laden des Standplans';
    } finally {
      this.loading = false;
    }
  }

  async addAssignment(shiftId: number, payload: ShiftAssignmentRequest) {
    this.error = null;
    try {
      await this.api.createAssignment(shiftId, payload);
      await this.refreshStandplan();
    } catch (err) {
      if (err instanceof ApiError && err.status === 400) {
        throw new Error('Schicht ist bereits voll oder Eingaben sind ungültig.');
      }
      throw new Error('Zuweisung konnte nicht gespeichert werden.');
    }
  }

  async editAssignment(
    shiftId: number,
    assignmentId: number,
    payload: ShiftAssignmentRequest
  ) {
    this.error = null;
    await this.api.updateAssignment(shiftId, assignmentId, payload);
    await this.refreshStandplan();
  }

  async removeAssignment(shiftId: number, assignmentId: number) {
    this.error = null;
    await this.api.deleteAssignment(shiftId, assignmentId);
    await this.refreshStandplan();
  }

  async incrementWaffeln() {
    await this.api.incrementWaffeln();
    const res = await this.api.getWaffelnTotal();
    this.waffelnTotal = res.waffelnTotal;
  }

  getFreeSlots(shift: Shift): number {
    return Math.max(0, shift.required_slots - shift.shift_assignments.length);
  }

  isAssignment(item: ShiftAssignment | null): item is ShiftAssignment {
    return item !== null;
  }

  async refreshWaffeln() {
    const res = await this.api.getWaffelnTotal();
    this.waffelnTotal = res.waffelnTotal;
  }

  async refreshFiles() {
    this.files = await this.api.getFiles();
  }

  async addFile(payload: CreateFilesRequest) {
    await this.api.createFile(payload);
    await this.refreshFiles();
  }
}