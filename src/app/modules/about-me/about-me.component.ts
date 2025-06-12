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
import { Paper } from '../../shared/components/folder/paper.interface';

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
    'Backend & API',
    'Frontend',
    'DevOps',
    'Security',
  ];
  skills = skills;
  techStack = techStack;
  additionalSkills: Skill[] = additionalSkills;
  folder1: Paper[] = [
    {
      description: `
          Currently learning CI/CD with Jenkins to automate builds and deployments.`,
      link: 'https://www.jenkins.io/doc/',
      isExternal: true,
    },
    {
      description: `
        Diving into Kubernetes to master container orchestration and scalable app deployments.`,
      link: 'https://kubernetes.io/docs/home/',
      isExternal: true,
    },
    {
      description: `
        Exploring GraphQL in depth, building flexible APIs and understanding advanced queries, mutations, and schema design.`,
      link: 'https://graphql.org/learn/',
      isExternal: true,
    },
  ];

  //use routerLink redirect to the write content
  folder2: Paper[] = [
    {
      description:
        'Crafting a solution to implement Firebase Cloud Messaging (FCM) with .NET.',
      link: '/app/blogs',
      isExternal: false,
    },
    {
      description:
        'Crafting a Firebase Authentication integration with .NET.',
      link: '/app/blogs',
      isExternal: false,
    },
    {
      description:
        'Crafting a system to receive FCM notifications on both Web and Flutter apps.',
      link: '/app/blogs',
      isExternal: false,
    },
  ];

  folder3: Paper[] = [
    {
      description: 'Integrating Firebase Authentication with a .NET backend.',
      link: '/app/portfolio',
      isExternal: false,
    },
    {
      description:
        'Building responsive web apps with Angular, Tailwind and ng-zorro',
      link: '/app/portfolio',
      isExternal: false,
    },
    {
      description:
        'Developing cross-platform mobile apps using Flutter and Dart.',
      link: 'https://flutter.dev/docs',
      isExternal: true,
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
