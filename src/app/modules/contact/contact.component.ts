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
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription!: Subscription;
  isReqAccessForm: boolean = false;
  @ViewChild('animationSection') lottieComponent!: LottieCoreComponent;
  @ViewChild('messageInput') messageInput!: ElementRef;
  sources = ['Game', 'Friend', 'Recruiter', 'Anonymous'];
  frmGroup!: UntypedFormGroup;
  isLoading: boolean = false;
  icons = [
    { icon: 'telegram', link: 'https://t.me/aok_ponlork' },
    {
      icon: 'facebook',
      link: 'https://web.facebook.com/1.Rayleigh/',
    },
    { icon: 'github', link: 'https://github.com/aok-ponlork' },
  ];
  constructor(
    private fb: FormBuilder,
    public userPref: UserPreferenceService,
    private message: ActionMessageService,
    private http: HttpService,
    private shared_service: SharedService
  ) {}

  ngOnInit(): void {
    this.frmGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      message: [''],
      howKnow: [null, this.isReqAccessForm ? [Validators.required] : []],
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
    });
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
    var model = this.frmGroup.value;
    if (this.isReqAccessForm) {
      model.message += ' Request for more-info page access!';
    }
    const url = environment.formSpreeUrl;
    this.http.thirdPartySerive = url;
    this.http.post('', model).subscribe({
      next: (rs: any) => {
        if (rs.ok) {
          this.message.handleSuccess(
            'Your message has been sent successfully!'
          );
          this.frmGroup.reset();
        }
      },
      error: (_error: any) => {
        this.message.handleWarning(
          'Something went wrong! please try again letter.'
        );
        this.isLoading = false;
      },
      complete: () => {
        this.frmGroup.reset();
        this.isLoading = false;
      },
    });
  }
  onModelChange(): void {
    this.animationFileChange();
    this.frmGroup.get('message')?.setValue('');
    this.frmGroup.reset();
  }

  animationFileChange(): void {
    const newAnimation = this.isReqAccessForm
      ? 'message.json'
      : 'floating-labtop.json';
    if (this.lottieComponent) {
      console.log(newAnimation);
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
