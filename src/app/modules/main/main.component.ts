import { Component, ViewChild } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AppConfigs } from '../../configs/app-config';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ColorService } from '../../core/services/common/color.service';
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
} from '@fortawesome/free-brands-svg-icons';
import {
  faLaptopCode,
  faCogs,
  faFileAlt,
  faAddressBook,
  faNewspaper,
  faUser,
  faHomeUser,
} from '@fortawesome/free-solid-svg-icons';
import { LottieCoreComponent } from '../../shared/components/lottie/lottie.component';
import { RouterModule } from '@angular/router';
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
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  @ViewChild(LottieCoreComponent) lottieComponent!: LottieCoreComponent;
  currentYear: number = new Date().getFullYear();
  isCollapsed = false;
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

  constructor(public colorService: ColorService, library: FaIconLibrary) {
    library.addIcons(
      faTelegram,
      faFacebookMessenger,
      faCogs,
      faLaptopCode,
      faFileAlt,
      faAddressBook,
      faNewspaper,
      faUser,
      faHomeUser,
      faGithub
    );
  }

  ngOnInit() {
    this.colorService.theme.subscribe((isDark) => {
      document.documentElement.classList.toggle('dark', isDark);

      //Change animatiion on theme switch
      const newAnimation = this.colorService.isDarkTheme.value
        ? 'dark.json'
        : 'light.json';
      if (this.lottieComponent) {
        this.lottieComponent.updateAnimation(newAnimation);
      }
    });
  }

  toggleTheme(): void {
    this.colorService.toggleTheme();
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  get themeBackground(): string {
    return this.colorService.currentColors.background;
  }

  get themeText(): string {
    return this.colorService.currentColors.text;
  }

  get contentBackground(): string {
    return this.colorService.currentColors.contentBackground;
  }
}
