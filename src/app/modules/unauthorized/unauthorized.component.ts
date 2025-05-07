import { Component } from '@angular/core';
import { LottieCoreComponent } from '../../shared/components/lottie/lottie.component';
import { SharedService } from '../../core/services/shared.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  imports: [LottieCoreComponent, RouterLink],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css',
})
export class UnauthorizedComponent {
  constructor(private shared_service: SharedService) {}
  onReqClick(): void {
    this.shared_service.triggerOnce('isReqAccessForm', true);
  }
}
