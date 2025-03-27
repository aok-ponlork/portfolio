import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../core/models/user.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { UserPreferenceService } from '../../core/services/common/user-preference.service';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AosService } from '../../core/services/common/aos.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { environment } from '../../../environments/env.development';
import { Clipboard } from '@angular/cdk/clipboard';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-resume',
  imports: [
    FontAwesomeModule,
    CommonModule,
    NzToolTipModule,
    NzModalModule,
    NzInputModule,
    NzButtonModule,
    RouterModule,
  ],
  standalone: true,
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css',
})
export class ResumeComponent implements OnInit {
  url = environment.baseUrl + 'app/resume';
  me: UserModel = {
    aboutMe: `As a recent graduate with a year of hands-on professional experience and a degree sponsored by PSE, I’m enthusiastic about contributing to dynamic teams and further honing my web development skills. With a strong foundation in web development, I’m eager to apply my expertise and passion for technology to deliver impactful, real-world solutions. I’m excited to collaborate on innovative projects that push the boundaries of web development.`,
    name: 'AOK PONLORK',
    email: 'aok4ponlork@gmail.com',
    location: 'Phnom Penh, Cambodia',
    telegram: 'https://t.me/aok_ponlork',
    skills: [
      'Programming Languages: PHP, C#, JavaScript, TypeScript, SQL, Python, Java, Dart',
      'Web Development: Angular, Node.js, HTML, CSS, Tailwind CSS, Laravel, .NET, Flutter',
      'Database Management: MySQL, PostgreSQL, MongoDB, SQL Server, Firebase Firestore, SQLite',
      'Version Control: Git, GitHub',
      'DevOps & CI/CD: Jenkins, Docker, CI/CD Pipelines',
      'Cloud Services: AWS, Azure, Google Cloud (CAP)',
      'API Development: RESTful APIs, GraphQL',
      'Tools & Services: Firebase, FCM',
    ],
    additional: [
      'Mikrotik Router Configuration',
      'Ubuntu Server Setup',
      'Windows Configuration',
      'Microsoft Office Suite',
      'Adobe Tools (Basic Video and Graphic Design Proficiency)',
      'Communication and Problem-Solving Abilities',
    ],
    education: [
      {
        title: 'Management Information Systems (MIS)',
        content: 'SETEC INSTITUTE, 2021 - 2025',
      },
      { title: 'High School', content: 'Phnom Penh Tmey, 2016 - 2020' },
    ],
    certificate: [],
    experiences: [
      {
        title: 'Software Developer - Full-Time',
        content:
          'Currently working as a full-time developer at RTDC for over a year after completing my internship. I focus on building and maintaining web applications using .NET for backend services, Angular for frontend development, and Flutter for cross-platform mobile app development.',
        date: 'May 2024 - Now',
      },
      {
        title: 'Internship - Software Developer',
        content:
          'Completed a 4-month internship at RTDC, where I gained hands-on experience in real-world projects, focusing on .NET for backend development and Angular for frontend development.',
        date: 'Feb 2024 - May 2024',
      },
      {
        title: 'Freelance Developer',
        content: 'Worked as a freelance developer during my academic year.',
        date: '',
      },
    ],
    projects: [
      {
        title: 'Admin Dashboard for Appointment & CRM Management',
        content:
          'Built a feature-rich admin dashboard with Angular, ng-zorro Ant Design, and Tailwind CSS. Integrated Firebase Cloud Messaging (FCM) for push notifications, allowing admins to manage appointments, CRM data, and coupon sales.',
      },
      {
        title: 'Flutter Appointment & CMS App',
        content:
          'Developed a Flutter-based appointment booking and CMS app with real-time push notifications via FCM, enabling seamless communication between users and admins.',
      },
      {
        title: 'Full-Stack Development Across Web & Mobile',
        content:
          'Worked across Angular, .NET APIs, and Flutter to create dynamic applications with real-time notifications (FCM) and integrated ABA Payway for secure transactions.',
      },
      {
        title: 'Online Football Ticket Marketplace',
        content:
          'Developed a secure ticket marketplace with PayPal integration, leveraging Laravel, Bootstrap, and MySQL for the backend and UI.',
      },
      {
        title: 'Phone Product Information Website',
        content:
          'Built an admin platform for managing phone product data using Laravel, streamlining content updates and backend operations.',
      },
      {
        title: 'E-Commerce System (Academic Project)',
        content:
          'Developed an e-commerce platform with Laravel (backend) and Flutter (frontend), integrated PayPal Sandbox for payments, and used Laravel Sanctum for authentication.',
      },
    ],
  };
  shareModalVisible: boolean = false;
  isFullScreen: boolean = false;
  constructor(
    public userPref: UserPreferenceService,
    public aosService: AosService,
    private clipboard: Clipboard,
    private message: NzMessageService
  ) {}
  ngOnInit(): void {
    this.isFullScreen = false;
    this.aosService.updateAosOptions({ once: true });
  }
  toggleFullScreen() {
    const elem = document.getElementById('main-container') as HTMLElement;
    if (!document.fullscreenElement) {
      this.isFullScreen = true;
      // Enter fullscreen
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        // Safari
        (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).mozRequestFullScreen) {
        // Firefox
        (elem as any).mozRequestFullScreen();
      } else if ((elem as any).msRequestFullscreen) {
        // IE/Edge
        (elem as any).msRequestFullscreen();
      }
    } else {
      this.isFullScreen = false;
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        // Safari
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        // Firefox
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        // IE/Edge
        (document as any).msExitFullscreen();
      }
      // Reset overflow after exiting fullscreen
    }
  }
  isDisableAos: boolean = false;
  playOrPauseAos() {
    this.isDisableAos = !this.isDisableAos;
    this.aosService.updateAosOptions({ once: !this.isDisableAos });
  }

  shareResume(platform: string) {
    const resumeUrl = encodeURIComponent('https://your-website.com/resume');
    const description = encodeURIComponent(
      'Here’s my professional resume, take a look!'
    );

    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${resumeUrl}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${resumeUrl}&text=${description}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=My Resume&body=${resumeUrl}`;
        break;
      // Add more cases for other platforms.
      default:
        return;
    }

    // Open the share dialog in a new window
    window.open(shareUrl, '_blank');
  }
  showModal(): void {
    this.shareModalVisible = true;
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.shareModalVisible = false;
  }

  copyToClipboard(text: string): void {
    if (this.clipboard.copy(text)) {
      this.message.success('Text copied to clipboard!');
    } else {
      this.message.error('Failed to copy text.');
    }
  }
}
