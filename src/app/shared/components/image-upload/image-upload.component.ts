import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from 'app/environments/environment';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule, NzImageService } from 'ng-zorro-antd/image';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  NzUploadChangeParam,
  NzUploadComponent,
  NzUploadFile,
} from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [
    NzUploadComponent,
    NzButtonModule,
    NzImageModule,
    CommonModule,
    NzIconModule,
  ],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css',
})
export class ImageUploadComponent {
  constructor(
    private msg: NzMessageService,
    private imageService: NzImageService
  ) {}

  @Input() uploadType: 'single' | 'multiple' = 'single';
  @Input() disabled: boolean = false;
  @Input() previewImage: string = '';
  @Input() fileType: string = 'image/png,image/jpeg,image/';
  @Output() filesChanged = new EventEmitter<NzUploadFile[] | NzUploadFile>();

  baseUrl: string = environment.authenticateUrl;
  fileList: NzUploadFile[] = [];
  image: NzUploadFile | null = null;

  beforeUpload = (file: NzUploadFile): boolean => {
    // Validate file type
    const allowedFileTypes = this.fileType.split(',');
    const isValidType = allowedFileTypes.some((type) =>
      file.type?.startsWith(type)
    );
    if (!isValidType) {
      this.msg.error('ឯកសារដែលបានជ្រើសមិនត្រឹមត្រូវទេ!');
      return false;
    }
    
    // Handle single or multiple file upload logic
    if (this.uploadType === 'single') {
      this.image = file;
      this.fileList = [file];
    } else {
      this.fileList = [...this.fileList, file];
    }

    this.emitFiles();
    return false;
  };

  emitFiles(): void {
    if (this.uploadType === 'single') {
      this.filesChanged.emit(this.image!);
    } else {
      this.filesChanged.emit(this.fileList);
    }
  }

  handleChange(info: NzUploadChangeParam): void {
    const { file } = info;

    if (file.status === 'removed') {
      this.fileList = this.fileList.filter((f) => f.uid !== file.uid);
      if (this.uploadType === 'single') {
        this.image = null;
      }
    } else {
      this.fileList = info.fileList;
    }

    this.emitFiles();
  }

  onPreviewImage(): void {
    const url = this.previewImage ? `${this.baseUrl}/${this.previewImage}` : '';
    this.showImagePreview(url);
  }

  private showImagePreview(url: string): void {
    const images = [
      {
        src: url,
        alt: 'Image preview',
      },
    ];
    this.imageService.preview(images, {
      nzZoom: 0.8,
      nzRotate: 0,
    });
  }
}
