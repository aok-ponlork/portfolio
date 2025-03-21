import { Component, Input } from '@angular/core';
import {
  Project,
  ProjectImage,
} from '../../../core/models/projects/project.model';
import { CommonModule } from '@angular/common';
import { UserPreferenceService } from '../../../core/services/common/user-preference.service';

@Component({
  selector: 'app-project-card',
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
})
export class ProjectCardComponent {
  @Input() project!: Project;
  constructor(public userPref: UserPreferenceService) {}
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

  nextImage(): void {
    if (this.hasMultipleImages) {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.project.images.length;
    }
  }

  prevImage(): void {
    if (this.hasMultipleImages) {
      this.currentImageIndex =
        this.currentImageIndex === 0
          ? this.project.images.length - 1
          : this.currentImageIndex - 1;
    }
  }

  selectImage(index: number): void {
    this.currentImageIndex = index;
  }

  toggleDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }
}
