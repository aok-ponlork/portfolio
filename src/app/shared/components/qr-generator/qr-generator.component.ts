import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UserPreferenceService } from '../../../core/services/common/user-preference.service';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import QRCode from 'qrcode';
import { FontAwesomeShareModule } from '../../modules/font-awesome.module';
import { environment } from '../../../../environments/env';
import QRCodeStyling from 'qr-code-styling';
import type { DotType } from 'qr-code-styling';
interface QRStyle {
  label: string;
  value: string;
}
@Component({
  selector: 'app-qr-generator',
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzUploadModule,
    NzIconModule,
    NzCardModule,
    NzDividerModule,
    NzSpinModule,
    NzToolTipModule,
    FontAwesomeShareModule,
  ],
  templateUrl: './qr-generator.component.html',
  styleUrl: './qr-generator.component.css',
})
export class QrGeneratorComponent implements OnInit, AfterViewInit {
  @ViewChild('qrCanvas', { static: false })
  qrCanvas!: ElementRef<HTMLDivElement>;

  selectedQRStyle: DotType = 'square';
  qrCode!: QRCodeStyling;

  // Form data
  inputText = '';
  foregroundColor = '#000000';
  backgroundColor = '#ffffff';
  uploadedLogo: string | null = null;

  // QR Code data
  generatedQRDataUrl = '';
  isGenerating = false;

  // Style options
  qrStyles: { label: string; value: DotType }[] = [
    { label: 'Square', value: 'square' },
    { label: 'Dot', value: 'dots' },
    { label: 'Round', value: 'rounded' },
    { label: 'Classy', value: 'classy' },
    { label: 'Classy Rounded', value: 'classy-rounded' },
    { label: 'Extra Rounded', value: 'extra-rounded' },
  ];

  constructor(public userPref: UserPreferenceService) {}

  ngOnInit() {
    this.inputText = environment.baseUrl;
  }

  ngAfterViewInit(): void {
    this.generateQR();
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.uploadedLogo = e.target.result;
      this.generateQR();
    };
    reader.readAsDataURL(file as any);
    return false;
  };

  removeLogo() {
    this.uploadedLogo = null;
    this.generateQR();
  }

  async generateQR() {
    if (!this.inputText.trim()) return;

    this.isGenerating = true;

    try {
      const canvasContainer = this.qrCanvas.nativeElement;
      canvasContainer.innerHTML = ''; // clear any previous canvas

      this.qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        data: this.inputText,
        dotsOptions: {
          type: this.selectedQRStyle, // ← dynamic style here
          color: this.foregroundColor,
        },
        backgroundOptions: {
          color: this.backgroundColor,
        },
        image: this.uploadedLogo || undefined,
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 5,
          imageSize: 0.2,
        },
      });

      this.qrCode.append(canvasContainer);
      const blob = await this.qrCode.getRawData('png');
      if (blob instanceof Blob) {
        this.generatedQRDataUrl = URL.createObjectURL(blob);
      } else {
        console.error(
          'QR Code generation failed: blob is null or invalid type.'
        );
      }
    } catch (error) {
      console.error('Error generating styled QR:', error);
    } finally {
      this.isGenerating = false;
    }
  }

  downloadQR() {
    if (!this.generatedQRDataUrl) return;

    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = this.generatedQRDataUrl;
    link.click();
  }

  onInputChange() {
    this.generateQR();
  }

  onColorChange() {
    this.generateQR();
  }

  onStyleChange() {
    this.generateQR();
  }
}
