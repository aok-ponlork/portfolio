import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeShareModule } from '../../shared/modules/font-awesome.module';
import { LottieCoreComponent } from '../../shared/components/lottie/lottie.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { UserPreferenceService } from '../../core/services/common/user-preference.service';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { Article } from '../../core/models/blogs/blog.model';
import { ARTICLES } from '../../../assets/data/blog.data';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeShareModule,
    NzToolTipModule,
    LottieCoreComponent,
    BlogCardComponent,
    NzCardModule,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent implements OnInit {
  cards = ['A', 'B', 'C'];
  articles: Article[] = [];
  filteredArticles: Article[] = [];
  activeFilter: string = 'All';
  constructor(public userPref: UserPreferenceService) {}
  ngOnInit(): void {
    this.articles = ARTICLES;
    this.filteredArticles = this.articles;
  }
  get articleFilters(): string[] {
    const allTech = this.articles.flatMap((item) => item.type);
    return ['All', ...new Set(allTech)];
  }
  filterArticle(type: string): void {
    this.activeFilter = type;

    if (type === 'All') {
      this.filteredArticles = this.articles;
    } else {
      this.filteredArticles = this.articles.filter((item) =>
        item.type.includes(type)
      );
    }
  }
}
