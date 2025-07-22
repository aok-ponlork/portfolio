import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-skeleton',
  imports: [CommonModule],
  templateUrl: './loading-skeleton.component.html',
  styleUrl: './loading-skeleton.component.css',
})
export class LoadingSkeletonComponent {
  @Input() show = true;
  @Input() themeBackground = 'bg-gray-200';
  @Input() contentBackground = 'bg-white';
}
