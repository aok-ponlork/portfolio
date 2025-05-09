import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LottieCoreComponent } from '../../shared/components/lottie/lottie.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { UserPreferenceService } from '../../core/services/common/user-preference.service';
import { ActionMessageService } from '../../core/services/common/message.service';
import { HttpService } from '../../core/services/http.service';
import { environment } from '../../../environments/env';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { SharedService } from '../../core/services/shared.service';
import { Subscription } from 'rxjs';
import { Platform, platformList, social, sources } from './data/contact.data';
@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [
    LottieCoreComponent,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NzSpinModule,
    NzIconModule,
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    NzSwitchModule,
    NzSelectModule,
    NzToolTipModule,
    ReactiveFormsModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription!: Subscription;
  selectedPlatform: Platform = Platform.Email;
  isReqAccessForm: boolean = false;
  @ViewChild('animationSection') lottieComponent!: LottieCoreComponent;
  @ViewChild('messageInput') messageInput!: ElementRef;
  sources = sources;
  icons = social;
  platform = platformList;
  frmGroup!: UntypedFormGroup;
  isLoading: boolean = false;
  Platform = Platform;
  constructor(
    private fb: FormBuilder,
    public userPref: UserPreferenceService,
    private message: ActionMessageService,
    private http: HttpService,
    private shared_service: SharedService
  ) {}

  ngOnInit(): void {
    this.frmGroup = this.fb.group({
      platform: [Platform.Email, Validators.required],
      email: ['', [Validators.email]],
      telegram: [''],
      name: ['', Validators.required],
      message: [''],
      howKnow: [null],
    });
    this.frmGroup.get('platform')?.setValue(Platform.Email);
    this.onPlatformChange(Platform.Email);
    if (this.isReqAccessForm) {
      this.frmGroup.get('howKnow')?.setValidators([Validators.required]);
    }
  }

  onPlatformChange(value: Platform) {
    this.selectedPlatform = value;
    this.frmGroup.get('platform')?.valueChanges.subscribe((platform) => {
      if (platform === Platform.Telegram) {
        this.frmGroup.get('telegram')?.setValidators([Validators.required]);
        this.frmGroup.get('email')?.clearValidators();
      } else if (platform === Platform.Telegram) {
        this.frmGroup
          .get('email')
          ?.setValidators([Validators.required, Validators.email]);
        this.frmGroup.get('telegram')?.clearValidators();
      }

      this.frmGroup.get('email')?.updateValueAndValidity();
      this.frmGroup.get('telegram')?.updateValueAndValidity();
    });
  }
  ngAfterViewInit(): void {
    // Add a small timeout to push the update to the next change detection cycle
    setTimeout(() => {
      this.shared_service
        .observe('isReqAccessForm', false)
        .subscribe((value) => {
          if (value) {
            this.isReqAccessForm = value;
            this.animationFileChange();
          }
        });
    }, 100);
  }
  onSourceChange(value: string): void {
    this.frmGroup.get('message')?.updateValueAndValidity();
    if (value) {
      if (value == 'Anonymous') {
        this.frmGroup.get('message')?.setValue(`From Anonymous. \n`);
      } else {
        this.frmGroup
          .get('message')
          ?.setValue(`Hey! I heard about you through ${value}.\n`);
      }
      setTimeout(() => {
        this.messageInput?.nativeElement?.focus();
      }, 10);
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    const model = this.frmGroup.value;

    if (this.isReqAccessForm) {
      model.message =
        model.message.trim() + ' Request for more-info page access!';
    }

    const resetForm = () => {
      this.frmGroup.reset();
      this.selectedPlatform = Platform.Email;
      this.frmGroup.get('platform')?.setValue(this.selectedPlatform);
      this.isLoading = false;
    };

    const handleError = () => {
      this.message.handleWarning(
        'Something went wrong! Please try again later.'
      );
      this.isLoading = false;
    };

    if (this.selectedPlatform === Platform.Email) {
      const url = environment.formSpreeUrl;
      this.http.thirdPartySerive = url;

      this.http.post('', model).subscribe({
        next: (res: any) => {
          if (res?.ok) {
            this.message.handleSuccess(
              'Your message has been sent successfully!'
            );
          }
        },
        error: handleError,
        complete: resetForm,
      });
    } else if (this.selectedPlatform === Platform.Telegram) {
      const { telegram, message, name } = this.frmGroup.value;
      const data = { telegram, message, name };
      this.http.post('telegram', data).subscribe({
        next: (res: any) => {
          if (res?.message) {
            this.message.handleSuccess(
              'Your request has been sent successfully!'
            );
          }
        },
        error: handleError,
        complete: resetForm,
      });
    }
  }

  onModelChange(): void {
    this.animationFileChange();
    this.frmGroup.get('message')?.setValue('');
    this.selectedPlatform = Platform.Email;
    this.frmGroup.get('platform')?.setValue(this.selectedPlatform);
  }

  animationFileChange(): void {
    const newAnimation = this.isReqAccessForm
      ? 'message.json'
      : 'floating-labtop.json';
    if (this.lottieComponent) {
      this.lottieComponent.updateAnimation(newAnimation);
    }
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.shared_service.cleanupState('isReqAccessForm');
  }
}
