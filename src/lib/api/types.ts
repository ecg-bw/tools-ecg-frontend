// src/lib/api/types.ts
export interface ShiftAssignment {
  id: number;
  name: string;
  phoneNumber: string;
}

export interface ShiftAssignmentRequest {
  name: string;
  phoneNumber: string;
}

export interface Shift {
  id: number;
  title: string;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  required_slots: number;
  description: string;
  criticalFlag: number;
  shift_assignments: ShiftAssignment[];
}

export interface Day {
  id: number;
  weekday: string;
  dayOfWeek: number;
  date: string; // YYYY-MM-DD
  shifts: Shift[];
}

export interface Weekend {
  days: Day[];
}

export interface StandplanResponse {
  weekends: Weekend[];
}

export interface WaffelnTotalResponse {
  waffelnTotal: number;
}

export interface FileInfo {
  id: number;
  title: string;
  description: string;
  url: string;
}

export interface CreateFilesRequest {
  title: string;
  description: string;
  url: string;
}