import type {
  CreateFilesRequest,
  FileInfo,
  ShiftAssignmentRequest,
  StandplanResponse,
  WaffelnTotalResponse,
} from './types';

export interface StandplanApiOptions {
  baseUrl?: string;
  fetchFn?: typeof fetch;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function normalizeBaseUrl(baseUrl?: string): string {
  const fromViteEnv =
    typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_API_BASE_URL
      ? String(import.meta.env.PUBLIC_API_BASE_URL)
      : '';
  const raw = (baseUrl ?? fromViteEnv ?? '').trim();
  return raw.replace(/\/+$/, '');
}

async function request<T>(
  fetchFn: typeof fetch,
  baseUrl: string,
  path: string,
  init?: RequestInit
): Promise<T> {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${baseUrl}${normalizedPath}`;

  const res = await fetchFn(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, text || `HTTP ${res.status}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}

export function createStandplanApi(options: StandplanApiOptions = {}) {
  const baseUrl = normalizeBaseUrl(options.baseUrl);
  const fetchFn = options.fetchFn ?? fetch;

  return {
    baseUrl,

    getStandplan: () => request<StandplanResponse>(fetchFn, baseUrl, '/standplan'),

    createAssignment: (shiftId: number, payload: ShiftAssignmentRequest) =>
      request<{ id: number }>(fetchFn, baseUrl, `/standplan/shifts/${shiftId}/assignments`, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),

    updateAssignment: (
      shiftId: number,
      assignmentId: number,
      payload: ShiftAssignmentRequest
    ) =>
      request<ShiftAssignmentRequest & { id: number }>(
        fetchFn,
        baseUrl,
        `/standplan/shifts/${shiftId}/assignments/${assignmentId}`,
        {
          method: 'PUT',
          body: JSON.stringify(payload),
        }
      ),

    deleteAssignment: (shiftId: number, assignmentId: number) =>
      request<void>(fetchFn, baseUrl, `/standplan/shifts/${shiftId}/assignments/${assignmentId}`, {
        method: 'DELETE',
      }),

    getWaffelnTotal: () => request<WaffelnTotalResponse>(fetchFn, baseUrl, '/waffeln'),

    incrementWaffeln: () =>
      request<{ id: number }>(fetchFn, baseUrl, '/waffeln', {
        method: 'POST',
        body: JSON.stringify({}),
      }),

    updateWaffeln: () =>
      request<{ id: number }>(fetchFn, baseUrl, '/waffeln', {
        method: 'PUT',
        body: JSON.stringify({}),
      }),

    getFiles: () =>
      request<{ files: FileInfo[] }>(fetchFn, baseUrl, '/standplan/files').then((r) => r.files),

    createFile: (payload: CreateFilesRequest) =>
      request<{ id: number }>(fetchFn, baseUrl, '/standplan/files', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
  };
}