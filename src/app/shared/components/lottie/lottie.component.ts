import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lottie',
  standalone: true,
  imports: [LottieComponent, CommonModule],
  templateUrl: './lottie.component.html',
  styleUrls: ['./lottie.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LottieCoreComponent implements OnInit, OnDestroy {
  private readonly animationFolder = '/assets/animations/';
  private defaultAnimation: string = 'not-found.json';

  @Input() animationName?: string;
  @Input() width: string = '200px';
  @Input() height: string = '200px';
  @Input() loop: number | boolean = true;
  @Input() loadTimes: number = 1;
  @Input() loopDelay: number = 500;

  private loadCount = 0;
  private animationInstance?: AnimationItem;
  shouldLoad = true;

  // WritableSignal for options
  options = signal<AnimationOptions>({
    path: '',
    loop: true,
  });

  constructor() {}

  ngOnInit() {
    this.updateAnimationPath();
  }

  private updateAnimationPath(): void {
    // Update the signal's value directly
    this.options.set({
      path:
        this.animationFolder + (this.animationName || this.defaultAnimation),
      loop: this.loop,
    });
  }

  // Store animation instance and remove event listeners on destroy
  handleAnimation(animation: AnimationItem): void {
    //console.log('Animation created', animation);
    this.animationInstance = animation;

    const onLoopComplete = () => {
      this.loadCount++;
      if (this.loadCount >= this.loadTimes && this.loadTimes !== 1) {
        animation.stop();
      }
      if (this.loop === true) {
        animation.pause();
        setTimeout(() => {
          animation.play();
        }, this.loopDelay);
      }
    };

    animation.addEventListener('loopComplete', onLoopComplete);
    animation.addEventListener('error', (error: any) =>
      console.debug('Lottie Animation Error:', error)
    );
  }

  updateAnimation(newAnimationName: string): void {
    if (this.animationName !== newAnimationName) {
      this.animationName = newAnimationName;
      this.updateAnimationPath();
    }
  }

  ngOnDestroy(): void {
    if (this.animationInstance) {
      this.animationInstance.destroy(); // Properly destroy the animation instance
    }
  }
}
