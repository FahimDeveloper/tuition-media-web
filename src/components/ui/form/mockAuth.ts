import {isCityName, isLocationForCity, type CityName} from './signupLocationData';

export type MockLoginPayload = {
  email: string;
  password: string;
  remember: boolean;
};

export type MockLoginResponse = {
  success: true;
  user: {
    id: string;
    email: string;
    name: string;
  };
  remember: boolean;
};

export type MockSignupPayload = {
  fullName: string;
  phone: string;
  email: string;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  city: CityName;
  location: string;
  password: string;
};

export type MockSignupRecord = Omit<MockSignupPayload, 'password'> & {
  id: string;
  createdAt: string;
};

export type MockSignupResponse = {
  success: true;
  record: MockSignupRecord;
};

export type MockAuthErrorCode =
  | 'EMAIL_EXISTS'
  | 'PHONE_EXISTS'
  | 'INVALID_CREDENTIALS'
  | 'UNKNOWN';

export type MockAuthError = Error & {
  code?: MockAuthErrorCode;
  status?: number;
};

type StoredMockSignupRecord = MockSignupRecord & {
  password?: string;
};

const MOCK_AUTH_STORAGE_KEY = 'tuition-media-mock-signups';
const MOCK_REQUEST_DELAY_MS = 1200;

const DEMO_ACCOUNT = {
  id: 'demo-user',
  email: 'demo@example.com',
  password: 'Demo@123',
  name: 'Demo User',
} as const;

const createMockAuthError = (
  message: string,
  options: {code?: MockAuthErrorCode; status?: number} = {},
): MockAuthError => {
  const error = new Error(message) as MockAuthError;
  error.code = options.code;
  error.status = options.status;
  return error;
};

export const isMockAuthError = (error: unknown): error is MockAuthError =>
  typeof error === 'object' &&
  error !== null &&
  ('code' in error || 'status' in error);

const delayMockRequest = async () => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_REQUEST_DELAY_MS));
};

const isMockSignupGender = (
  value: unknown,
): value is MockSignupPayload['gender'] =>
  value === 'male' ||
  value === 'female' ||
  value === 'other' ||
  value === 'prefer_not_to_say';

const isStoredMockSignupRecord = (
  value: unknown,
): value is StoredMockSignupRecord => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;
  const city = record.city;

  if (!isCityName(city)) {
    return false;
  }

  return (
    typeof record.id === 'string' &&
    typeof record.fullName === 'string' &&
    typeof record.phone === 'string' &&
    typeof record.email === 'string' &&
    isMockSignupGender(record.gender) &&
    isLocationForCity(city, record.location) &&
    typeof record.createdAt === 'string' &&
    (typeof record.password === 'undefined' ||
      typeof record.password === 'string')
  );
};

const readMockSignupRecords = (): StoredMockSignupRecord[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(MOCK_AUTH_STORAGE_KEY);

    if (!rawValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isStoredMockSignupRecord);
  } catch {
    return [];
  }
};

const writeMockSignupRecords = (records: readonly StoredMockSignupRecord[]) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(MOCK_AUTH_STORAGE_KEY, JSON.stringify(records));
};

const createMockSignupId = () =>
  `mock-signup-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const toPublicSignupRecord = (
  record: StoredMockSignupRecord,
): MockSignupRecord => ({
  id: record.id,
  fullName: record.fullName,
  phone: record.phone,
  email: record.email,
  gender: record.gender,
  city: record.city,
  location: record.location,
  createdAt: record.createdAt,
});

export async function signupWithMockAuth(
  payload: MockSignupPayload,
): Promise<MockSignupResponse> {
  await delayMockRequest();

  const storedRecords = readMockSignupRecords();

  if (
    payload.email === DEMO_ACCOUNT.email ||
    storedRecords.some((record) => record.email === payload.email)
  ) {
    throw createMockAuthError('Duplicate email.', {code: 'EMAIL_EXISTS'});
  }

  if (storedRecords.some((record) => record.phone === payload.phone)) {
    throw createMockAuthError('Duplicate phone.', {code: 'PHONE_EXISTS'});
  }

  const storedRecord: StoredMockSignupRecord = {
    id: createMockSignupId(),
    fullName: payload.fullName,
    phone: payload.phone,
    email: payload.email,
    gender: payload.gender,
    city: payload.city,
    location: payload.location,
    password: payload.password,
    createdAt: new Date().toISOString(),
  };

  writeMockSignupRecords([...storedRecords, storedRecord]);

  return {
    success: true,
    record: toPublicSignupRecord(storedRecord),
  };
}

export async function loginWithMockAuth(
  payload: MockLoginPayload,
): Promise<MockLoginResponse> {
  await delayMockRequest();

  if (
    payload.email === DEMO_ACCOUNT.email &&
    payload.password === DEMO_ACCOUNT.password
  ) {
    return {
      success: true,
      user: {
        id: DEMO_ACCOUNT.id,
        email: DEMO_ACCOUNT.email,
        name: DEMO_ACCOUNT.name,
      },
      remember: payload.remember,
    };
  }

  const storedRecord = readMockSignupRecords().find(
    (record) =>
      record.email === payload.email &&
      typeof record.password === 'string' &&
      record.password === payload.password,
  );

  if (!storedRecord) {
    throw createMockAuthError('Invalid credentials.', {
      code: 'INVALID_CREDENTIALS',
      status: 401,
    });
  }

  return {
    success: true,
    user: {
      id: storedRecord.id,
      email: storedRecord.email,
      name: storedRecord.fullName,
    },
    remember: payload.remember,
  };
}
