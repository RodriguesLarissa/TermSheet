import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'authenticated';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.getStoredAuthState(),
  );

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  login(username: string, password: string): boolean {
    const isValid = username === 'admin' && password === 'password';

    if (isValid) {
      this.setStoredAuthState(true);
      this.isAuthenticatedSubject.next(true);
    }

    return isValid;
  }

  logout(): void {
    this.setStoredAuthState(false);
    this.isAuthenticatedSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  private getStoredAuthState(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    return localStorage.getItem(this.STORAGE_KEY) === 'true';
  }

  private setStoredAuthState(value: boolean): void {
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.setItem(this.STORAGE_KEY, String(value));
  }
}
