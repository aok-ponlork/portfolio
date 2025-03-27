import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { CommonModule } from '@angular/common';
import { AnimationItem } from 'lottie-web';

@Component({
  standalone: true,
  selector: 'app-lottie',
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

  // Signal for animation options
  options = signal<AnimationOptions>({
    path: '',
    loop: true,
  });

  constructor() {}

  async ngOnInit() {
    await this.lazyLoadLottie(); // Load Lottie on Init
    this.updateAnimationPath();
  }

  private async lazyLoadLottie() {
    const lottie = await import('lottie-web'); // Lazy load Lottie dynamically
    (window as any).lottie = lottie; // Store in global scope if needed
  }

  private updateAnimationPath(): void {
    this.options.set({
      path:
        this.animationFolder + (this.animationName || this.defaultAnimation),
      loop: this.loop,
    });
  }

  handleAnimation(animation: AnimationItem): void {
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
      this.animationInstance.destroy();
    }
  }
}
