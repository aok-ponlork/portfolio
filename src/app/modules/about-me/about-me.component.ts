import { Component, OnInit } from '@angular/core';
import { UserPreferenceService } from '../../core/services/common/user-preference.service';
import { LottieCoreComponent } from '../../shared/components/lottie/lottie.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [
    LottieCoreComponent,
    NzButtonModule,
    FontAwesomeModule,
    RouterModule,
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
})
export class AboutMeComponent implements OnInit {
  constructor(public userPref: UserPreferenceService) {}
  ngOnInit(): void {}
}
