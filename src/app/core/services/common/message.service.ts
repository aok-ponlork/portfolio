import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class ActionMessageService {
  constructor(private msg: NzMessageService) {}
  
  // Generalized success handling method with a default message
  public handleSuccess(message?: string): void {
    const successMessage = message || 'សកម្មភាពត្រូវបានបញ្ចប់ដោយជោគជ័យ។';
    this.msg.success(successMessage);
  }

  // Warning handling method
  public handleWarning(message?: string): void {
    const warningMessage = message || 'សូមពិនិត្យម្តងទៀត!';
    this.msg.warning(warningMessage);
  }
}
