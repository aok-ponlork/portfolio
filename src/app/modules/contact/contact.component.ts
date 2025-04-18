import { Component, OnInit } from '@angular/core';
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
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
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
    private http: HttpService
  ) {}

  ngOnInit(): void {
    this.frmGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    const model = this.frmGroup.value;
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
}
