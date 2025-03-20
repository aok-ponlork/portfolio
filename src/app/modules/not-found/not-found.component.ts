import {
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { LottieCoreComponent } from '../../shared/components/lottie/lottie.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-not-found',
    imports: [LottieCoreComponent, RouterModule],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2) {}
  ngOnInit(): void {
    console.log('Not Found Page Loaded');  
    // const layout = document.querySelector('nz-content');
    // if (layout) {
    //   this.renderer.removeClass(layout, 'overflow-y-auto');
    //   this.renderer.addClass(layout, 'overflow-hidden');
    // }
  }
  
  ngOnDestroy(): void {
    console.log('Not Found Page Destroyed');
    // const layout = document.querySelector('nz-content');
    // if (layout) {
    //   this.renderer.removeClass(layout, 'overflow-hidden');
    //   this.renderer.addClass(layout, 'overflow-y-auto');
    // }
  }
  
}
