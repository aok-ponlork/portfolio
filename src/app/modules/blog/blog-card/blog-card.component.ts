import { Component, Input } from '@angular/core';
import { Article } from '../../../core/models/blogs/blog.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-card',
  imports: [CommonModule],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css',
})
export class BlogCardComponent {
  @Input() article!: Article;
  showFullDescription = false;
  onReadMoreClick(article: Article): void {
    console.log(article);
  }
}
