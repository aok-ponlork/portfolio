import { Component } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AppConfigs } from '../../configs/app-config';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NzLayoutModule,
    NzIconModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzToolTipModule,
    LottieComponent,
    CommonModule,
    NzDividerModule
    
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  currentYear: number = new Date().getFullYear();
  isCollapsed = false;
  readonly AppConfigs = AppConfigs;
  options: AnimationOptions = {
    path: '/assets/animations/profile-frame.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}
