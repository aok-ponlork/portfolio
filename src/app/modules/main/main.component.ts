import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AppConfigs } from '../../configs/app-config';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { UserPreferenceService } from '../../core/services/common/user-preference.service';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { LottieCoreComponent } from '../../shared/components/lottie/lottie.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import Aos from 'aos';
import { AosService } from '../../core/services/common/aos.service';
import { FontAwesomeShareModule } from '../../shared/modules/font-awesome.module';
import { filter } from 'rxjs';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterModule,
    NzLayoutModule,
    NzIconModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzToolTipModule,
    CommonModule,
    NzDividerModule,
    NzSwitchModule,
    FormsModule,
    LottieCoreComponent,
    NzPopoverModule,
    FontAwesomeShareModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChild('themeAnimation') lottieComponent!: LottieCoreComponent;
  isMouseMoving: boolean = false;
  isHeaderLayout: boolean = false;
  settingMenuButton: boolean = false;
  mobileMenuOpen: boolean = false;
  currentYear: number = new Date().getFullYear();
  isCollapsed: boolean = true;
  isScrolled: boolean = false;
  private listenersAdded = false;
  readonly AppConfigs = AppConfigs;
  icons = [
    { icon: 'telegram', link: 'https://t.me/aok_ponlork' },
    {
      icon: 'facebook',
      link: 'https://web.facebook.com/1.Rayleigh/',
    },
    { icon: 'github', link: 'https://github.com/aok-ponlork' },
  ];
  menuItems = [
    {
      label: 'About me',
      icon: 'home-user',
      tooltip: 'Home',
      type: 'solid',
      route: 'about-me',
    },
    {
      label: 'Work',
      icon: 'laptop-code',
      tooltip: 'Works',
      type: 'solid',
      route: 'portfolio',
    },
    {
      label: 'Resume',
      icon: 'file-alt',
      tooltip: 'Resume',
      type: 'solid',
      route: 'resume',
    },
    {
      label: 'Write',
      icon: 'newspaper',
      tooltip: 'Write',
      type: 'solid',
      route: 'blogs',
    },
    {
      label: 'Contact',
      icon: 'address-book',
      tooltip: 'Contact',
      type: 'solid',
      route: 'contact',
    },
  ];

  constructor(
    public userPref: UserPreferenceService,
    private renderer: Renderer2,
    private el: ElementRef,
    private aosService: AosService,
    private router: Router,
    private zone: NgZone,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.zone.runOutsideAngular(() => {
          requestAnimationFrame(() => {
            setTimeout(() => {
              const el = document.getElementById('main-container');
              if (el) {
                el.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                console.warn('main-container not found');
              }
            }, 200);
          });
        });
      });
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    // Subscribe to theme changes and update page style accordingly
    this.userPref.theme.subscribe((isDark) => {
      document.documentElement.classList.toggle('dark', isDark);
      // Update Lottie animation based on the theme
      const newAnimation = this.userPref.isDarkTheme.value
        ? 'light.json'
        : 'dark.json';
      if (this.lottieComponent) {
        this.lottieComponent.updateAnimation(newAnimation);
      }
    });

    // Add mouse event listeners only once to avoid multiple subscriptions
    if (!this.listenersAdded) {
      document.addEventListener('mousemove', this.onMouseMove.bind(this));
      document.addEventListener('mouseleave', this.onMouseLeave.bind(this));
      this.listenersAdded = true;
    }

    this.isHeaderLayout = this.userPref.isHeaderView.value;
  }

  toggleMosueGlowingEffect(): void {
    // Toggle mouse glowing effect and reset mouse movement status
    this.userPref.toggleMouseGlowing();
    this.isMouseMoving = false;
  }

  toggleHeader(): void {
    // Toggle header layout and the state of the settings menu button
    this.userPref.toggleLayout();
    this.isHeaderLayout = this.userPref.isHeaderView.value;
    this.settingMenuButton = !this.settingMenuButton;
    this.mobileMenuOpen = false;
  }

  toggleTheme(): void {
    // Toggle between light and dark theme and update settings button state
    this.userPref.toggleTheme();
    this.settingMenuButton = !this.settingMenuButton;
  }

  toggleSidebar() {
    // Toggle sidebar collapse state
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMenu() {
    // Toggle the state of the menu button
    this.settingMenuButton = !this.settingMenuButton;
  }

  toggleMobileMenu(): void {
    // Toggle the state of the mobile menu
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  get themeBackground(): string {
    // Get the background color based on the current theme
    return this.userPref.currentColors.background;
  }

  get themeText(): string {
    // Get the text color based on the current theme
    return this.userPref.currentColors.text;
  }

  get contentBackground(): string {
    // Get the content background color based on the current theme
    return this.userPref.currentColors.contentBackground;
  }

  // Handle scroll event for adding effects when scrolling
  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    // Update the scroll state based on the scroll position
    this.isScrolled = target.scrollTop > 50;
    Aos.refresh(); // Refresh animations triggered by scroll
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (
      !this.userPref.isDarkTheme.value ||
      !this.userPref.isMouseGlowingEffect.value
    ) {
      return;
    }
    if (this.isMouseMoving === false) {
      setTimeout(() => {
        this.isMouseMoving = true;
      }, 10);
    }
    const spotlight = this.el.nativeElement.querySelector('.mouse-spotlight');

    if (spotlight && this.userPref.isMouseGlowingEffect) {
      const x = event.clientX;
      const y = event.clientY;

      // Update position of the spotlight based on mouse movement
      this.renderer.setStyle(spotlight, 'top', `${y}px`);
      this.renderer.setStyle(spotlight, 'left', `${x}px`);
    }
  }

  // Handle mouse click event to create ripple effect if enabled
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (
      this.userPref.isMouseGlowingEffect.value &&
      this.userPref.isDarkTheme.value
    ) {
      const ripple = this.renderer.createElement('span');
      ripple.classList.add('mouse-ripple');

      // Set position of the ripple at mouse location
      const x = event.clientX;
      const y = event.clientY;

      this.renderer.setStyle(ripple, 'top', `${y - 25}px`); // Center the ripple
      this.renderer.setStyle(ripple, 'left', `${x - 25}px`); // Center the ripple

      // Append the ripple element to the container
      this.el.nativeElement.appendChild(ripple);

      // Remove the ripple after the animation ends
      setTimeout(() => {
        this.renderer.removeChild(this.el.nativeElement, ripple);
      }, 600);
    }
  }

  // Handle mouse leave event to reset mouse movement status
  onMouseLeave() {
    this.isMouseMoving = false;
  }

  // Refresh AOS animations when needed
  refreshAos(): void {
    Aos.refresh();
  }

  // Control AOS animations (enable/disable once effect)
  disable: boolean = false;
  playOrPauseAos() {
    this.disable = !this.disable;
    this.aosService.updateAosOptions({ once: !this.disable });
  }
}
