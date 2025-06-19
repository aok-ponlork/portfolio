import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Artist } from './interface/playlist.interface';
import { UserPreferenceService } from '../../../core/services/common/user-preference.service';
import { favArtists } from './interface/playlist.data';
import { AosService } from '../../../core/services/common/aos.service';
import { FontAwesomeShareModule } from '../../../shared/modules/font-awesome.module';
import { SquaresComponent } from './background/background.component';
import { LottieCoreComponent } from '../../../shared/components/lottie/lottie.component';
@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    NzButtonModule,
    NzTableModule,
    CommonModule,
    FormsModule,
    NzCardModule,
    NzIconModule,
    NzQRCodeModule,
    NzTagModule,
    NzToolTipModule,
    FontAwesomeShareModule,
    SquaresComponent,
    LottieCoreComponent,
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css',
  animations: [
    trigger('artistChange', [
      state('show', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('* => show', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('500ms ease-out'),
      ]),
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
  ],
})
export class PlaylistComponent implements OnInit, AfterViewInit, OnDestroy {
  artists: Artist[] = favArtists;
  selectedArtist: Artist | null = null;
  loadingStates: { [id: number]: boolean } = {};
  currentAudio: HTMLAudioElement | null = null;
  currentView: 'grid' | 'list' = 'grid';
  animationState: string = '';
  isMobile: boolean = false;
  constructor(
    private cdr: ChangeDetectorRef,
    public userPref: UserPreferenceService,
    private aos: AosService
  ) {}

  ngOnInit() {
    this.artists.forEach((a) => (this.loadingStates[a.id] = true));
  }
  ngAfterViewInit(): void {
    this.checkMobile();
    window.addEventListener('resize', () => this.checkMobile());
  }
  ngOnDestroy(): void {}

  selectArtist(artist: any) {
    const isSameArtist = this.selectedArtist?.id === artist.id;

    // If same artist is clicked again, toggle play/pause
    if (isSameArtist && this.currentAudio) {
      if (this.currentAudio.paused) {
        this.currentAudio.play().catch((err) => {
          console.error('Audio resume failed:', err);
        });
      } else {
        this.currentAudio.pause();
      }
      return;
    }

    // Set new selected artist
    this.selectedArtist = artist;

    // Stop previous audio
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }

    // Reset animation
    this.animationState = 'void';
    setTimeout(() => {
      this.animationState = 'show';
      this.cdr.detectChanges();
    }, 10);

    // Play new audio
    if (artist?.audioUrl) {
      this.currentAudio = new Audio(artist.audioUrl);
      this.currentAudio.play().catch((err) => {
        console.error('Audio playback failed:', err);
      });

      this.currentAudio.onended = () => {
        this.cdr.detectChanges();
      };
    }
  }

  PlayOrPauseMusic(): void {
    if (!this.currentAudio) return;

    if (this.currentAudio.paused) {
      this.currentAudio.play().catch((err) => {
        console.error('Failed to resume audio:', err);
      });
    } else {
      this.currentAudio.pause();
    }
  }

  trackByArtistId(_: number, item: Artist) {
    return item.id;
  }

  onImageLoad(id: number) {
    this.loadingStates[id] = false;
  }

  onImageError(id: number) {
    this.loadingStates[id] = false;
  }

  switchView(view: any) {
    this.currentView = view;
  }

  checkMobile() {
    this.isMobile = window.innerWidth < 1024;
  }

  goBackToArtists() {
    this.PlayOrPauseMusic();
    this.selectedArtist = null;
  }
}
