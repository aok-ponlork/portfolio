import {
  Component,
  OnInit,
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
import { environment } from '../../../environments/env.development';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    LottieCoreComponent,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NzSpinModule,
    NzIconModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  frmGroup!: UntypedFormGroup;
  isLoading: boolean = false;

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
    this.http.post(url, model).subscribe({
      next: (rs: any) => {
        if (rs.ok) {
          this.message.handleSuccess(
            'Your message has been sent successfully!'
          );
          this.frmGroup.reset();
        }
      },
      error: (error: any) => {
        console.log(error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
