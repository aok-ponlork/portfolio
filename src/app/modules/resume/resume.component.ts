import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../core/models/user.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { UserPreferenceService } from '../../core/services/common/user-preference.service';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AosService } from '../../core/services/common/aos.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { environment } from '../../../environments/env';
import { Clipboard } from '@angular/cdk/clipboard';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ME } from '../../../assets/data/me';
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
    NzTagModule,
    NzButtonModule,
    NzIconModule,
  ],
  standalone: true,
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css',
})
export class ResumeComponent implements OnInit {
  url = environment.baseUrl + '/app/resume';
  me: UserModel = ME;
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
    // const elem = document.getElementById('element-name') as HTMLElement;
    // elem.classList.add('overflow-y-auto');
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
    const resumeUrl = encodeURIComponent(`${environment.baseUrl}/app/resume`);
    const description = encodeURIComponent(
      'Here’s my personal resume, take a look!'
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
        shareUrl = `mailto:?subject=Aok Ponlork's Resume&body=${resumeUrl}`;
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
