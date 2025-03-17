import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { UserPreferenceService } from '../../core/services/common/user-preference.service';
import { LottieCoreComponent } from '../../shared/components/lottie/lottie.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [
    LottieCoreComponent,
    NzButtonModule,
    FontAwesomeModule,
    RouterModule,
    CommonModule,
    NzIconModule,
    NzCollapseModule,
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
})
export class AboutMeComponent implements OnInit, OnDestroy, AfterViewInit {
  private elements: NodeListOf<HTMLElement> | null = null;
  skills = [
    {
      icon: 'code',
      iconType: 'fas',
      title: '.NET',
      description:
        'I build robust, scalable back-end services using .NET Core with REST API patterns for high-performance applications.',
    },
    {
      icon: 'angular',
      title: 'Angular',
      iconType: 'fab',
      description:
        'I create dynamic, scalable single-page applications with Angular, focusing on performance and modular design.',
    },
    {
      icon: 'flutter',
      iconType: 'fab',
      title: 'Flutter',
      description:
        'I develop cross-platform mobile applications with Flutter, delivering native-like performance on both Android and iOS.',
    },
    {
      icon: 'css3',
      iconType: 'fab',
      title: 'Tailwind CSS',
      description:
        'I use Tailwind CSS to build fast, responsive, and customizable UI components with a utility-first approach.',
    },
    {
      icon: 'ant-design',
      iconType: 'ant-icon',
      title: 'Ant Design',
      description:
        'I leverage Ant Design to create clean, professional-looking UI components with a focus on user experience.',
    },
    {
      icon: 'database',
      iconType: 'ant-icon',
      title: 'Databases',
      description:
        'I design and manage relational and NoSQL databases, including PostgreSQL, MongoDB, and SQL. Additionally, I work with real-time databases like Firebase to ensure scalable and efficient data storage.',
    },
  ];
  additionalSkills = [
    {
      title: 'Laravel',
      description:
        'I build robust and scalable backend applications using the Laravel framework.',
      icon: 'laravel',
      iconType: 'fab', // You can use FontAwesome icons for this
    },
    {
      title: 'Node.js',
      description:
        'I work with Node.js to create fast and efficient server-side applications.',
      icon: 'node',
      iconType: 'fab',
    },
    {
      title: 'Firebase Cloud Messaging',
      description:
        'I implement real-time messaging and push notifications using Firebase Cloud Messaging.',
      icon: 'paper-plane',
      iconType: 'fas',
    },
    {
      title: 'GraphQL',
      description:
        'I use GraphQL to fetch data in a more flexible and efficient way compared to REST.',
      icon: 'plug',
      iconType: 'fas',
    },
    {
      title: 'JWT Authentication',
      description:
        'I implement secure authentication mechanisms using JSON Web Tokens (JWT).',
      icon: 'key',
      iconType: 'fas',
    },
    {
      title: 'Docker',
      description:
        'I use Docker to containerize applications for better portability and consistency across environments.',
      icon: 'docker',
      iconType: 'fab',
    },
    // Add more skills as needed
  ];
  constructor(
    public userPref: UserPreferenceService,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.elements = document.querySelectorAll(
      '#page-container section #skill-section div'
    );
    if (this.elements) {
      this.elements.forEach((element) => {
        // Add event listeners using Renderer2 to ensure it's safe for Angular
        this.renderer.listen(element, 'mouseenter', () =>
          this.onMouseEnter(element)
        );
        this.renderer.listen(element, 'mouseleave', () => this.onMouseLeave());
      });
    }
  }
  ngOnDestroy(): void {
    if (this.elements) {
      this.elements.forEach((element) => {
        this.renderer.listen(element, 'mouseenter', () =>
          this.onMouseEnter(element)
        );
        this.renderer.listen(element, 'mouseleave', () => this.onMouseLeave());
        console.log(element);
      });
    }
  }
  private onMouseEnter(element: HTMLElement): void {
    if (this.elements) {
      this.elements.forEach((otherElement) => {
        if (otherElement !== element) {
          otherElement.classList.add('opacity-50');
        }
      });
    }
    // Keep hovered element at full opacity
    element.classList.remove('opacity-50');
  }

  private onMouseLeave(): void {
    if (this.elements) {
      this.elements.forEach((otherElement) => {
        // Reset opacity
        otherElement.classList.remove('opacity-50');
      });
    }
  }
}
