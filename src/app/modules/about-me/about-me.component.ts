import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { UserPreferenceService } from '../../core/services/common/user-preference.service';
import { LottieCoreComponent } from '../../shared/components/lottie/lottie.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { FolderComponent } from '../../shared/components/folder/folder.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import {
  additionalSkills,
  Skill,
  skills,
  techStack,
} from '../../../assets/data/tech.data';
import { NzModalModule } from 'ng-zorro-antd/modal';

interface Paper {
  description: string;
  link: string;
}
@Component({
  standalone: true,
  selector: 'app-about-me',
  imports: [
    LottieCoreComponent,
    NzButtonModule,
    FontAwesomeModule,
    RouterModule,
    CommonModule,
    NzIconModule,
    NzCollapseModule,
    NzTagModule,
    FolderComponent,
    NzToolTipModule,
    NzModalModule,
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
})
export class AboutMeComponent implements OnInit, OnDestroy, AfterViewInit {
  vodModalVisible: boolean = false;
  selectedCategory: string = 'All';
  skillCategories: string[] = [
    'All',
    'Backend',
    'Frontend',
    'DevOps',
    'API',
    'Security',
  ];
  skills = skills;
  techStack = techStack;
  additionalSkills: Skill[] = additionalSkills;
  folder1: Paper[] = [
    {
      description: `
         <span nz-icon  nzType="kubernetes" class=""></span>
        Learning the fundamentals of Kubernetes, container orchestration, and deployment.`,
      link: '',
    },
    {
      description: `
        <span class="icon"><i class="fab fa-jenkins"></i></span>
        Exploring Jenkins for continuous integration and delivery automation.`,
      link: '',
    },
    {
      description: `
        <span class="icon"><i class="fab fa-golang"></i></span>
        Learning GoLang for building efficient and scalable backend systems.`,
      link: '',
    },
  ];

  folder2: Paper[] = [
    {
      description:
        'A comprehensive guide to getting started with Angular development.',
      link: 'https://angular.io/guide/overview',
    },
    {
      description:
        'Deep dive into Angular component design and best practices.',
      link: 'https://angular.io/guide/component-overview',
    },
    {
      description:
        'Exploring state management techniques in Angular applications.',
      link: 'https://ngrx.io/guide/store',
    },
  ];
  folder3: Paper[] = [
    {
      description:
        'A comprehensive guide to getting started with Angular development.',
      link: 'https://angular.io/guide/overview',
    },
    {
      description:
        'Deep dive into Angular component design and best practices.',
      link: 'https://angular.io/guide/component-overview',
    },
    {
      description:
        'Exploring state management techniques in Angular applications.',
      link: 'https://ngrx.io/guide/store',
    },
  ];
  constructor(public userPref: UserPreferenceService) {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}
  //Tech filter
  get filteredSkills(): any[] {
    if (this.selectedCategory === 'All') {
      return this.additionalSkills;
    }
    return this.additionalSkills.filter(
      (skill) => skill.category === this.selectedCategory
    );
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  //folder size
  getSizeBasedOnScreen(): number {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) {
        // small screens
        return 1.6;
      } else if (width < 1024) {
        // medium screens
        return 1.8;
      } else {
        // large screens
        return 2;
      }
    }
    return 2; // default size
  }
  showModal(): void {
    this.vodModalVisible = true;
  }
  handleCancel(): void {
    this.vodModalVisible = false;
  }
}
