import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeShareModule } from '../../shared/modules/font-awesome.module';
import { LottieCoreComponent } from '../../shared/components/lottie/lottie.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { UserPreferenceService } from '../../core/services/common/user-preference.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeShareModule,
    LottieCoreComponent,
    NzToolTipModule,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent implements OnInit {
  constructor(public userPref: UserPreferenceService) {}
  ngOnInit(): void {}
}
