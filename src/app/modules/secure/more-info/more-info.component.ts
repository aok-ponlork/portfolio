// resume.component.ts
import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { UserModel } from '../../../core/models/user.model';
import { TokenService } from '../../../core/services/authentication/token.service';
import { HttpResponse } from '@angular/common/http';
import { UserPreferenceService } from '../../../core/services/common/user-preference.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzImageService } from 'ng-zorro-antd/image';
import { ME } from '../../../../assets/data/me';
@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css'],
  standalone: true,
  providers: [NzImageService],
  imports: [
    FontAwesomeModule,
    CommonModule,
    NzToolTipModule,
    NzModalModule,
    NzInputModule,
    NzButtonModule,
    NzTagModule,
    NzButtonModule,
    NzIconModule,
    NzCarouselModule,
    NzSpinModule,
  ],
})
export class MoreInfoComponent implements OnInit {
  tracker: string =
    'https://tracker.gg/valorant/profile/riot/Red%20Hare%20Rider%2311111/overview?platform=pc&playlist=competitive&season=aef237a0-494d-3a14-a1c8-ec8de84e309c';
  // Certificate carousel settings
  certificationArray = [
    {
      id: 1,
      title: 'Google Professional Cloud Architect',
      issuer: 'Google Cloud',
      date: 'March 2023',
      imageUrl: '/assets/images/dummy.jpg',
    },
    {
      id: 1,
      title: 'Azure Solutions Architect Expert',
      issuer: 'Microsoft',
      date: 'June 2023',
      imageUrl: '/assets/images/dummy.jpg',
    },
  ];
  // Resume data
  me: UserModel = ME;
  isImageLoading: boolean = true;
  constructor(
    private clipboard: Clipboard,
    private message: NzMessageService,
    private tokenService: TokenService,
    public userPref: UserPreferenceService,
    private imagePreview: NzImageService
  ) {}

  ngOnInit(): void {
    this.isImageLoading = true;
    this.tokenService.getImages().subscribe({
      next: (res: HttpResponse<any>) => {
        const images = res.body?.images || [];
        this.certificationArray = this.certificationArray.map((cert, index) => {
          const image = images[index];
          if (!image || image.name === 'me.webp') {
            this.me.image = image.data;
            return cert;
          }
          return { ...cert, imageUrl: image.data };
        });
      },
      error: (err: any) => {
        console.error('Error fetching images:', err);
        this.isImageLoading = false;
      },
      complete: () => {
        this.isImageLoading = false;
      },
    });
  }

  viewCertification(cert: any): void {
    // Open a modal or navigate to a detailed view
    console.log('Viewing certification:', cert);
    // Implement modal view logic here
  }

  onPreviewImage(url: string): void {
    const images = [
      {
        src: url,
        alt: 'Image preview',
      },
    ];
    this.imagePreview.preview(images, {
      nzZoom: 0.8,
      nzRotate: 0,
    });
  }
}
