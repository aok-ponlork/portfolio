import { Component } from '@angular/core';
import { Project } from '../../core/models/projects/project.model';
import { PROJECTS } from '../../../assets/data/project.data';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from './project-card/project-card.component';
import { UserPreferenceService } from '../../core/services/common/user-preference.service';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent {
  constructor(public userPref: UserPreferenceService) {}
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  activeFilter: string = 'All';

  // Collect all unique tech stack items across projects
  get techFilters(): string[] {
    const allTech = this.projects.flatMap((project) => project.techStack);
    return ['All', ...new Set(allTech)];
  }

  ngOnInit(): void {
    this.projects = PROJECTS;
    this.filteredProjects = this.projects;
  }

  filterProjects(tech: string): void {
    this.activeFilter = tech;

    if (tech === 'All') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter((project) =>
        project.techStack.includes(tech)
      );
    }
  }
}
