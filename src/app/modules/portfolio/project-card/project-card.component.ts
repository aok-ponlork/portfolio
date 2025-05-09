import { Component, Input } from '@angular/core';
import {
  Project,
  ProjectImage,
} from '../../../core/models/projects/project.model';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { UserPreferenceService } from '../../../core/services/common/user-preference.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  standalone: true,
  selector: 'app-project-card',
  imports: [CommonModule, NzIconModule, NgOptimizedImage, NzModalModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
  providers: [NzImageService],
})
export class ProjectCardComponent {
  @Input() project!: Project;
  vodModalVisible: boolean = false;
  constructor(
    public userPref: UserPreferenceService,
    private imagePreview: NzImageService
  ) {}
  currentImageIndex = 0;
  showFullDescription = false;

  get currentImage(): ProjectImage {
    return this.project.images[this.currentImageIndex];
  }

  get hasMultipleImages(): boolean {
    return this.project.images.length > 1;
  }

  ngOnInit(): void {
    // Validate that project has at least an empty images array
    if (!this.project.images) {
      this.project.images = [];
    }
  }

  nextImage(e: Event): void {
    if (this.hasMultipleImages) {
      e.stopPropagation();
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.project.images.length;
    }
  }

  prevImage(e: Event): void {
    if (this.hasMultipleImages) {
      e.stopPropagation();
      this.currentImageIndex =
        this.currentImageIndex === 0
          ? this.project.images.length - 1
          : this.currentImageIndex - 1;
    }
  }

  selectImage(index: number, e: Event): void {
    e.stopPropagation();
    this.currentImageIndex = index;
  }

  toggleDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }

  onPreviewImage(url: string): void {
    if (this.currentImage.isVod) {
      this.vodModalVisible = true;
    } else {
      const images = [
        {
          src: url,
          alt: 'Image preview',
        },
      ];
      this.imagePreview.preview(images, {
        nzZoom: 0.8,
        nzRotate: 0,
      });
    }
  }
  handleCancel(): void {
    this.vodModalVisible = false;
  }
}
