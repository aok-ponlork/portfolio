import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Input,
  HostListener,
  OnInit,
  inject,
} from '@angular/core';
import { UserPreferenceService } from '../../../../core/services/common/user-preference.service';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css'],
})
export class SquaresComponent implements AfterViewInit, OnDestroy {
  userPref = inject(UserPreferenceService);
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  isDark: boolean = false;
  @Input() direction: 'right' | 'left' | 'up' | 'down' | 'diagonal' = 'right';
  @Input() speed: number = 1;
  @Input() borderColor: string = '#999';
  @Input() squareSize: number = 40;
  @Input() hoverFillColor: string = '#222';

  private ctx!: CanvasRenderingContext2D | null;
  private requestId: number = 0;
  private gridOffset = { x: 0, y: 0 };
  private hoveredSquare: { x: number; y: number } | null = null;
  ngOnInit() {}

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.resizeCanvas();
    this.userPref.isDarkTheme.subscribe((val) => {
      this.isDark = val;
      this.draw();
    });
    this.draw();
    this.updateAnimation();

    canvas.addEventListener('mousemove', this.handleMouseMove);
    canvas.addEventListener('mouseleave', this.handleMouseLeave);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.requestId);
    const canvas = this.canvasRef.nativeElement;
    canvas.removeEventListener('mousemove', this.handleMouseMove);
    canvas.removeEventListener('mouseleave', this.handleMouseLeave);
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeCanvas();
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  private draw() {
    const canvas = this.canvasRef.nativeElement;
    if (!this.ctx) return;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const squareSize = this.squareSize;
    const startX = Math.floor(this.gridOffset.x / squareSize) * squareSize;
    const startY = Math.floor(this.gridOffset.y / squareSize) * squareSize;

    const isDark = this.userPref.isDarkTheme.value;

    // Dynamic colors
    const borderColor = isDark ? '#334155' : '#e5e7eb'; // slate-700 / gray-200
    const hoverFillColor = isDark ? '#1e293b' : '#cbd5e1'; // slate-800 / slate-200

    for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
      for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
        const squareX = x - (this.gridOffset.x % squareSize);
        const squareY = y - (this.gridOffset.y % squareSize);

        const col = Math.floor((x - startX) / squareSize);
        const row = Math.floor((y - startY) / squareSize);

        if (
          this.hoveredSquare &&
          this.hoveredSquare.x === col &&
          this.hoveredSquare.y === row
        ) {
          ctx.fillStyle = hoverFillColor;
          ctx.fillRect(squareX, squareY, squareSize, squareSize);
        }

        ctx.strokeStyle = borderColor;
        ctx.strokeRect(squareX, squareY, squareSize, squareSize);
      }
    }

    const gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
    );

    if (isDark) {
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.1)'); 
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.2)');
    } else {
      gradient.addColorStop(0, 'rgba(226, 232, 240, 0.1)'); 
      gradient.addColorStop(1, 'rgba(248, 250, 252, 0.3)'); 
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  private updateAnimation = () => {
    const effectiveSpeed = Math.max(this.speed, 0.1);
    const squareSize = this.squareSize;

    switch (this.direction) {
      case 'right':
        this.gridOffset.x =
          (this.gridOffset.x - effectiveSpeed + squareSize) % squareSize;
        break;
      case 'left':
        this.gridOffset.x =
          (this.gridOffset.x + effectiveSpeed + squareSize) % squareSize;
        break;
      case 'up':
        this.gridOffset.y =
          (this.gridOffset.y + effectiveSpeed + squareSize) % squareSize;
        break;
      case 'down':
        this.gridOffset.y =
          (this.gridOffset.y - effectiveSpeed + squareSize) % squareSize;
        break;
      case 'diagonal':
        this.gridOffset.x =
          (this.gridOffset.x - effectiveSpeed + squareSize) % squareSize;
        this.gridOffset.y =
          (this.gridOffset.y - effectiveSpeed + squareSize) % squareSize;
        break;
    }

    this.draw();
    this.requestId = requestAnimationFrame(this.updateAnimation);
  };

  private handleMouseMove = (event: MouseEvent) => {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const squareSize = this.squareSize;
    const startX = Math.floor(this.gridOffset.x / squareSize) * squareSize;
    const startY = Math.floor(this.gridOffset.y / squareSize) * squareSize;

    const hoveredSquareX = Math.floor(
      (mouseX + this.gridOffset.x - startX) / squareSize
    );
    const hoveredSquareY = Math.floor(
      (mouseY + this.gridOffset.y - startY) / squareSize
    );

    if (
      !this.hoveredSquare ||
      this.hoveredSquare.x !== hoveredSquareX ||
      this.hoveredSquare.y !== hoveredSquareY
    ) {
      this.hoveredSquare = { x: hoveredSquareX, y: hoveredSquareY };
    }
  };

  private handleMouseLeave = () => {
    this.hoveredSquare = null;
  };
}
