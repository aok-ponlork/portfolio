import { Injectable } from '@angular/core';
import AOS from 'aos';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AosService {
  private aosEnabled = new BehaviorSubject<boolean>(true); // Default: enabled
  aosEnabled$ = this.aosEnabled.asObservable();

  private aosOptions = new BehaviorSubject<any>({
    once: false,
  });
  aosOptions$ = this.aosOptions.asObservable();

  constructor() {
    this.initAOS();
  }

  // Initialize AOS
  initAOS() {
    if (this.aosEnabled.value) {
      AOS.init(this.aosOptions.value);
    }
  }

  // Update AOS options (like once = true/false)
  updateAosOptions(newOptions: any) {
    this.aosOptions.next({ ...this.aosOptions.value, ...newOptions });
    AOS.init(this.aosOptions.value); // Reinitialize AOS with new settings
  }
}
