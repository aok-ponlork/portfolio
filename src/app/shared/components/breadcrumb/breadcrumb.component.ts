import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  NzBreadCrumbItemComponent,
  NzBreadCrumbModule,
} from 'ng-zorro-antd/breadcrumb';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    NzBreadCrumbModule,
    NzIconModule,
    RouterLink,
    NzBreadCrumbItemComponent,
    CommonModule,
    NzDividerModule
  ],
  templateUrl: 'breadcrumb.component.html',
  styleUrls: ['breadcrumb.component.css'],
})
export class BreadcrumbComponent{
  @Input() breadcrumbItems: {
    routerLink?: string;
    icon?: string;
    label: string;
  }[] = [];
}
