const API_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/v1`;

export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export async function login(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
}

export async function register(
  email: string,
  password: string,
  name?: string,
): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }

  return response.json();
}

export function getGoogleLoginUrl(): string {
  return `${API_URL}/v1/auth/google`;
}

export async function getProfile(token: string): Promise<User> {
  const response = await fetch(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get profile');
  }

  return response.json();
}

export function saveAuth(authResponse: AuthResponse): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', authResponse.accessToken);
    localStorage.setItem('user', JSON.stringify(authResponse.user));
  }
}

export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

export function getUser(): User | null {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
}

export function clearAuth(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

export function getUserId(): string | null {
  const user = getUser();
  return user?.id || null;
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
