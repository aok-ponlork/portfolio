import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Colors } from '../../../shared/color';

@Injectable({
  providedIn: 'root',
})
export class UserPreferenceService {
  public isDarkTheme = new BehaviorSubject<boolean>(this.getStoredTheme());
  public isHeaderView = new BehaviorSubject<boolean>(this.getStoredLayout());

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
    return this.currentColors.secondaryBackground;
  }
  get inputColor(): string {
    return this.currentColors.inputBackground;
  }
  get buttonColor(): string {
    return this.currentColors.buttonBackground;
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
    console.log(this.isHeaderView);
  }
  private getStoredTheme(): boolean {
    return localStorage.getItem('theme') === 'dark';
  }
  private getStoredLayout(): boolean {
    return localStorage.getItem('isHeaderView') === 'true';
  }
  private setTheme(isDark: boolean) {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
    // Update the root color based on the theme
    // const selectionColor = isDark ? '#ff8c42' : '#8A2BE2';
    // document.documentElement.style.setProperty('--selection-bg', selectionColor);
    document.body.classList.toggle('dark-mode', isDark);
  }
}
