import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { LoadingService } from '../../../core/services/common/loading-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading',
  imports: [CommonModule, NzSpinModule],
  standalone: true,
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
})
export class LoadingComponent {
  isLoading$!: Observable<boolean>;
  constructor(private loadingService: LoadingService) {
    this.isLoading$ = this.loadingService.isLoading$;
  }
}
