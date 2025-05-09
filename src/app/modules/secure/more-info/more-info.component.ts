// resume.component.ts
import { Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
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
  modalVisible: boolean = false;
  tracker: string =
    'https://tracker.gg/valorant/profile/riot/Red%20Hare%20Rider%2311111/overview?platform=pc&playlist=competitive&season=aef237a0-494d-3a14-a1c8-ec8de84e309c';
  // Certificate carousel settings
  certificationArray = [
    {
      id: 1,
      title: 'Certificate of MIS',
      issuer: 'SETEC INSTITUTE',
      date: 'March 250',
      imageUrl: '',
    },
    {
      id: 2,
      title: 'Transacritp',
      issuer: 'SETEC INSTITUTE',
      date: 'March 250',
      imageUrl: '',
    },
  ];
  // Resume data
  me: UserModel = ME;
  isImageLoading: boolean = true;
  constructor(
    private tokenService: TokenService,
    public userPref: UserPreferenceService,
    private imagePreview: NzImageService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.isImageLoading = true;
    this.tokenService.getImages().subscribe({
      next: (res: HttpResponse<any>) => {
        const images = res.body?.images || [];
        const filteredImages = images.filter((image: any) => {
          if (image.name === 'me.webp') {
            this.me.image = image.data;
            return false;
          }
          // Keep others image
          return true;
        });
        this.certificationArray = this.certificationArray.map((cert, index) => {
          const image = filteredImages[index];
          return { ...cert, imageUrl: image?.data || null };
        });
      },
      error: (err: any) => {
        console.error('Error fetching images:', err);
        this.isImageLoading = false;
      },
      complete: () => {
        this.isImageLoading = false;
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      },
    });
  }

  viewCertification(cert: any): void {
    this.modalService.create({
      nzTitle: 'Certificate Details',
      nzContent: `
        <div class="flex flex-col p-4">
          <h2 class="text-xl font-bold text-gray-800 mb-4">${cert.title}</h2>
          
          <div class="mb-4 flex justify-center">
            <div class="w-full h-48 bg-gray-100 rounded flex items-center justify-center">
              ${
                cert.imageUrl
                  ? `<img src="${cert.imageUrl}" alt="${cert.title}" class="max-h-full max-w-full object-contain" />`
                  : `<span class="text-gray-400">No image available</span>`
              }
            </div>
          </div>
          
          <!-- Certificate Details -->
          <div class="space-y-3">
            <div class="flex">
              <span class="font-medium w-24 text-gray-600">Issuer:</span>
              <span>${cert.issuer}</span>
            </div>
            <div class="flex">
              <span class="font-medium w-24 text-gray-600">Issue Date:</span>
              <span>${cert.date}</span>
            </div>
            
          </div>
        </div>
      `,
      nzFooter: [
        {
          label: 'Close',
          type: 'default',
          onClick: () => this.modalService.closeAll(),
        },
      ],
      nzWidth: '500px',
      nzCentered: true,
      nzClassName: 'certificate-modal',
      nzMaskClosable: true,
    });
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
