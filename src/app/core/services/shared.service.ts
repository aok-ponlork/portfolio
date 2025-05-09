import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedService {
  private states = new Map<string, BehaviorSubject<any>>();

  // Initialize or get existing subject
  private getState<T>(key: string, defaultValue: T): BehaviorSubject<T> {
    if (!this.states.has(key)) {
      this.states.set(key, new BehaviorSubject<T>(defaultValue));
    }
    return this.states.get(key) as BehaviorSubject<T>;
  }

  // Subscribe to state changes
  observe<T>(key: string, defaultValue: T): Observable<T> {
    return this.getState<T>(key, defaultValue).asObservable();
  }

  // Update state
  set<T>(key: string, value: T): void {
    this.getState<T>(key, value).next(value);
  }

  // Get current value directly (optional)
  getValue<T>(key: string, defaultValue: T): T {
    return this.getState<T>(key, defaultValue).value;
  }

  // One-time flag: Trigger action once and then reset
  triggerOnce<T>(key: string, triggerValue: T, resetValue: T): void {
    const subject = this.getState<T>(key, resetValue);
    subject.next(triggerValue);
    // Reset after it's been triggered once
    setTimeout(() => subject.next(resetValue), 0);
  }

  // Clean up specific state
  cleanupState(key: string): void {
    if (this.states.has(key)) {
      const subject = this.states.get(key);
      if (subject) {
        subject.complete();
      }
      this.states.delete(key);
    }
  }

  // Clean up all states
  cleanupAllStates(): void {
    this.states.forEach((subject) => subject.complete());
    this.states.clear();
  }
}
