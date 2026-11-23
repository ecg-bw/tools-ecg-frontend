import { browser } from '$app/env';

const AUTH_STORAGE_KEY = 'isLoggedIn';
const AUTH_USER_KEY = 'user';

export class AuthStore {
  isAuthenticated = $state<boolean>(false);
  isAdmin = $state<boolean>(false);
  ready = $state<boolean>(false);
  loading = $state<boolean>(false);
  error = $state<string | null>(null);

  constructor() {
    if (browser) {
      this.isAuthenticated = localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
      this.isAdmin = localStorage.getItem(AUTH_USER_KEY) === 'admin';
      this.ready = true;
    }
  }

  async login(password: string): Promise<boolean> {
    this.loading = true;
    this.error = null;

    try {
      // Variante A: Einfaches Zugangspasswort (z. B. über PUBLIC_STANDPLAN_PASSWORD)
      const expected = import.meta.env.PUBLIC_STANDPLAN_PASSWORD ?? 'm48';
      const expectedAdmin = 'admin';

      if (password.trim() !== expected && password.trim() !== expectedAdmin) {
        this.error = 'Falsches Passwort. Bitte versuche es erneut.';
        return false;
      }

      if (password.trim() === expectedAdmin) {
        this.isAdmin = true;
      }

      // Variante B (sobald dein Go-Backend /auth/login hat):
      // const res = await fetch(`${baseUrl}/auth/login`, { method: 'POST', ... });

      this.isAuthenticated = true;
      if (browser) {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        if (this.isAdmin) {
          localStorage.setItem(AUTH_USER_KEY, 'admin');
        } else {
          localStorage.setItem(AUTH_USER_KEY, 'user');
        }
      }
      return true;
    } catch {
      this.error = 'Anmeldung derzeit nicht möglich.';
      return false;
    } finally {
      this.loading = false;
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.isAdmin = false;
    if (browser) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    }
  }
}