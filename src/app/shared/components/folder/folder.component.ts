import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface Paper {
  description: string;
  link: string;
}
@Component({
  selector: 'app-folder',
  standalone: true,
  imports: [CommonModule, RouterModule, NzIconModule],
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.css',
})
export class FolderComponent {
  @Input() color = '#00d8ff';
  @Input() size = 1;
  @Input() items: Paper[] = [];
  @Input() className = '';
  @Input() itemCount: number = 3;

  maxItems = 0;
  open = false;
  papers: (Paper | null)[] = [];
  paperOffsets: { x: number; y: number }[] = [];

  ngOnInit() {
    this.maxItems = this.itemCount;
    // Prepare papers array
    this.papers = this.items.slice(0, this.maxItems);
    while (this.papers.length < this.maxItems) {
      this.papers.push(null);
    }

    // Initialize paper offsets
    this.paperOffsets = Array.from({ length: this.maxItems }, () => ({
      x: 0,
      y: 0,
    }));
  }

  darkenColor(hex: string, percent: number): string {
    let color = hex.startsWith('#') ? hex.slice(1) : hex;

    if (color.length === 3) {
      color = color
        .split('')
        .map((c) => c + c)
        .join('');
    }

    const num = parseInt(color, 16);
    let r = (num >> 16) & 0xff;
    let g = (num >> 8) & 0xff;
    let b = num & 0xff;

    r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
    g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
    b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));

    return (
      '#' +
      ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
    );
  }

  get folderBackColor(): string {
    return this.darkenColor(this.color, 0.08);
  }

  get paper1(): string {
    return this.darkenColor('#ffffff', 0.1);
  }

  get paper2(): string {
    return this.darkenColor('#ffffff', 0.05);
  }

  get paper3(): string {
    return '#ffffff';
  }

  toggleFolder(): void {
    this.open = !this.open;

    if (!this.open) {
      this.paperOffsets = Array.from({ length: this.maxItems }, () => ({
        x: 0,
        y: 0,
      }));
    }
  }

  onPaperMouseMove(event: MouseEvent, index: number): void {
    if (!this.open) return;

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = (event.clientX - centerX) * 0.15;
    const offsetY = (event.clientY - centerY) * 0.15;

    this.paperOffsets[index] = { x: offsetX, y: offsetY };
  }

  onPaperMouseLeave(index: number): void {
    this.paperOffsets[index] = { x: 0, y: 0 };
  }

  getCssVariables() {
    return {
      '--folder-color': this.color,
      '--folder-back-color': this.folderBackColor,
      '--paper-1': this.paper1,
      '--paper-2': this.paper2,
      '--paper-3': this.paper3,
    };
  }

  getPaperStyle(index: number) {
    if (this.open) {
      return {
        '--magnet-x': `${this.paperOffsets[index]?.x || 0}px`,
        '--magnet-y': `${this.paperOffsets[index]?.y || 0}px`,
      };
    }
    return {};
  }
}
