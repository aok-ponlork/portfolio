import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Colors } from '../../../shared/color';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  public isDarkTheme = new BehaviorSubject<boolean>(this.getStoredTheme());

  get theme() {
    return this.isDarkTheme.asObservable();
  }

  get currentColors() {
    return this.isDarkTheme.value ? Colors.dark : Colors.light;
  }

  toggleTheme() {
    const newTheme = !this.isDarkTheme.value;
    this.isDarkTheme.next(newTheme);
    this.setTheme(newTheme);
  }

  private getStoredTheme(): boolean {
    return localStorage.getItem('theme') === 'dark';
  }

  private setTheme(isDark: boolean) {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
    // Update the root color based on the theme
    // const selectionColor = isDark ? '#ff8c42' : '#8A2BE2';
    // document.documentElement.style.setProperty('--selection-bg', selectionColor);
  }
}
