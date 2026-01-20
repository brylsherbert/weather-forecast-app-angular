import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'theme-preference';

  readonly isDarkMode = signal<boolean>(this.getInitialTheme());

  constructor() {
    // Apply theme on initialization
    this.applyTheme(this.isDarkMode());

    // Watch for changes and apply theme
    effect(() => {
      this.applyTheme(this.isDarkMode());
      this.saveTheme(this.isDarkMode());
    });
  }

  toggleTheme(): void {
    this.isDarkMode.update((mode) => !mode);
  }

  setDarkMode(isDark: boolean): void {
    this.isDarkMode.set(isDark);
  }

  private getInitialTheme(): boolean {
    // Check localStorage first
    const saved = localStorage.getItem(this.THEME_KEY);
    if (saved !== null) {
      return saved === 'dark';
    }

    // Check system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    return false;
  }

  private applyTheme(isDark: boolean): void {
    if (typeof document === 'undefined') return;

    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }

  private saveTheme(isDark: boolean): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');
  }
}
