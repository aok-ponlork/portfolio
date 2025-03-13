import {
  Component,
  ElementRef,
  HostListener,
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
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faTelegram,
  faFacebookMessenger,
  faGithub,
  faFacebook
} from '@fortawesome/free-brands-svg-icons';
import {
  faLaptopCode,
  faCogs,
  faFileAlt,
  faAddressBook,
  faNewspaper,
  faUser,
  faHomeUser,
  faTimes,
  faBars,
  faEnvelope,
  faComputerMouse,
  faExpand,
  faPrint,
  faCompress,
  faPlay,
  faPause,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { LottieCoreComponent } from '../../shared/components/lottie/lottie.component';
import { RouterModule } from '@angular/router';
import Aos from 'aos';
import { AosService } from '../../core/services/common/aos.service';
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
    FontAwesomeModule,
    LottieCoreComponent,
    NzPopoverModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  @ViewChild('themeAnimation') lottieComponent!: LottieCoreComponent;
  isMouseMoving: boolean = false;
  isHeaderLayout: boolean = false;
  settingMenuButton: boolean = false;
  mobileMenuOpen: boolean = false;
  currentYear: number = new Date().getFullYear();
  isCollapsed: boolean = false;
  isScrolled: boolean = false;
  private listenersAdded = false;
  readonly AppConfigs = AppConfigs;
  icons = ['telegram', 'facebook-messenger', 'github'];
  menuItems = [
    {
      label: 'About me',
      icon: 'home-user',
      tooltip: 'Home',
      type: 'solid',
      route: 'about-me',
    },
    {
      label: 'Portfolio',
      icon: 'laptop-code',
      tooltip: 'Portfolio',
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
      label: 'Blogs',
      icon: 'newspaper',
      tooltip: 'Blogs',
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
    public library: FaIconLibrary,
    private renderer: Renderer2,
    private el: ElementRef,
    private aosService: AosService
  ) {
    this.registerIcon();
    this.isHeaderLayout = userPref.isHeaderView.value;
  }
  ngOnInit() {
    this.userPref.theme.subscribe((isDark) => {
      document.documentElement.classList.toggle('dark', isDark);
      //Change animatiion on theme switch
      const newAnimation = this.userPref.isDarkTheme.value
        ? 'light.json'
        : 'dark.json';
      if (this.lottieComponent) {
        this.lottieComponent.updateAnimation(newAnimation);
      }
    });
    if (!this.listenersAdded) {
      document.addEventListener('mousemove', this.onMouseMove.bind(this));
      document.addEventListener('mouseleave', this.onMouseLeave.bind(this));
      this.listenersAdded = true;
    }
  }
  toggleMosueGlowingEffect(): void {
    this.userPref.toggleMouseGlowing();
    this.isMouseMoving = false;
  }
  toggleHeader(): void {
    this.userPref.toggleLayout();
    this.isHeaderLayout = this.userPref.isHeaderView.value;
    this.settingMenuButton = !this.settingMenuButton;
    this.mobileMenuOpen = false;
  }
  toggleTheme(): void {
    this.userPref.toggleTheme();
    this.settingMenuButton = !this.settingMenuButton;
  }
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  toggleMenu() {
    this.settingMenuButton = !this.settingMenuButton;
  }
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  get themeBackground(): string {
    return this.userPref.currentColors.background;
  }
  get themeText(): string {
    return this.userPref.currentColors.text;
  }
  get contentBackground(): string {
    return this.userPref.currentColors.contentBackground;
  }
  private registerIcon(): void {
    this.library.addIcons(
      faTelegram,
      faFacebookMessenger,
      faCogs,
      faLaptopCode,
      faFileAlt,
      faAddressBook,
      faNewspaper,
      faUser,
      faHomeUser,
      faGithub,
      faTimes,
      faBars,
      faEnvelope,
      faComputerMouse,
      faExpand,
      faPrint,
      faCompress,
      faPlay,
      faPause,
      faShare,
      faFacebook
    );
  }
  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    this.isScrolled = target.scrollTop > 50;
    Aos.refresh();
  }
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isMouseMoving === false) {
      setTimeout(() => {
        this.isMouseMoving = true;
      }, 10);
    }
    const spotlight = this.el.nativeElement.querySelector('.mouse-spotlight');
    if (spotlight && this.userPref.isMouseGlowingEffect) {
      const x = event.clientX;
      const y = event.clientY;
      this.renderer.setStyle(spotlight, 'top', `${y}px`);
      this.renderer.setStyle(spotlight, 'left', `${x}px`);
    }
  }
  onMouseLeave() {
    this.isMouseMoving = false;
  }
  refreshAos(): void {
    Aos.refresh();
  }
}
