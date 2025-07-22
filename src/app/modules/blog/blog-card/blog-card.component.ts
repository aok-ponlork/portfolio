import { Component, Input } from '@angular/core';
import { Article } from '../../../core/models/blogs/blog.model';
import { CommonModule } from '@angular/common';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-card',
  imports: [CommonModule, NzTagModule],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css',
})
export class BlogCardComponent {
  constructor(private router: Router) {}
  @Input() article!: Article;

  showFullDescription = false;

  onReadMoreClick(): void {
    this.router.navigate(['app/blogs', this.toSlug(this.article.title)]);
  }

  //Helper
  toSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  getTagColor(index: number): string {
    const colors = [
      'bg-blue-100 text-blue-800 hover:bg-blue-200',
      'bg-green-100 text-green-800 hover:bg-green-200',
      'bg-purple-100 text-purple-800 hover:bg-purple-200',
      'bg-orange-100 text-orange-800 hover:bg-orange-200',
      'bg-pink-100 text-pink-800 hover:bg-pink-200',
      'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
    ];
    return colors[index % colors.length];
  }
}
