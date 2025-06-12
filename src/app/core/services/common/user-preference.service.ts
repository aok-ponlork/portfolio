import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Colors } from '../../../shared/color';

@Injectable({
  providedIn: 'root',
})
export class UserPreferenceService {
  public isDarkTheme = new BehaviorSubject<boolean>(this.getStoredTheme());
  public isHeaderView = new BehaviorSubject<boolean>(this.getStoredLayout());
  public isMouseGlowingEffect = new BehaviorSubject<boolean>(
    this.getStoreMouseGlowing()
  );

  constructor() {}

  get theme() {
    return this.isDarkTheme.asObservable();
  }
  get currentColors() {
    return this.isDarkTheme.value ? Colors.dark : Colors.light;
  }
  get themeBackground(): string {
    return this.currentColors.background;
  }
  get themeText(): string {
    return this.currentColors.text;
  }
  get contentBackground(): string {
    return this.currentColors.contentBackground;
  }
  get secondaryBackground(): string {
    return this.currentColors.secondaryBackground;
  }
  get inputColor(): string {
    return this.currentColors.inputBackground;
  }

  get buttonColor(): string {
    return this.currentColors.buttonBackground;
  }

  get cardBackground(): string {
    return this.isDarkTheme.value ? 'bg-gray-800' : 'bg-white';
  }
  get textPrimary(): string {
    return this.isDarkTheme.value ? 'text-white' : 'text-gray-900';
  }

  get textSecondary(): string {
    return this.isDarkTheme.value ? 'text-gray-300' : 'text-gray-600';
  }

  get borderColor(): string {
    return this.isDarkTheme.value ? 'border-gray-700' : 'border-gray-200';
  }
  toggleTheme() {
    const newTheme = !this.isDarkTheme.value;
    this.isDarkTheme.next(newTheme);
    this.setTheme(newTheme);
  }
  toggleLayout() {
    const newLayout = !this.isHeaderView.value;
    this.isHeaderView.next(newLayout);
    localStorage.setItem('isHeaderView', newLayout ? 'true' : 'false');
  }
  toggleMouseGlowing() {
    const value = !this.isMouseGlowingEffect.value;
    this.isMouseGlowingEffect.next(value);
    localStorage.setItem('isMouseGlowingEffect', value ? 'true' : 'false');
  }

  private getStoredTheme(): boolean {
    const storedValue = localStorage.getItem('theme');
    if (storedValue === null) {
      localStorage.setItem('theme', 'dark'); // Set default to dark
      return true;
    }
    return storedValue === 'dark';
  }

  private getStoredLayout(): boolean {
    const storedValue = localStorage.getItem('isHeaderView');
    if (storedValue === null) {
      localStorage.setItem('isHeaderView', 'true'); // Set default to true
      return true;
    }
    return storedValue === 'true';
  }

  private getStoreMouseGlowing(): boolean {
    const storedValue = localStorage.getItem('isMouseGlowingEffect');
    if (storedValue === null) {
      localStorage.setItem('isMouseGlowingEffect', 'true'); // Set default to true
      return true;
    }
    return storedValue === 'true';
  }

  private setTheme(isDark: boolean) {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
    document.body.classList.toggle('dark-mode', isDark);
  }
}
