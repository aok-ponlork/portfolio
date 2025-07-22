import { CommonModule, Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadFileService } from '../../../core/services/load-file.service';
import { UserPreferenceService } from '../../../core/services/common/user-preference.service';
import { FontAwesomeShareModule } from '../../../shared/modules/font-awesome.module';
import { MarkdownModule } from 'ngx-markdown';
import { CustomTitleStrategy } from '../../../core/services/title.service';
import { LoadingSkeletonComponent } from '../../../shared/components/loading-skeleton/loading-skeleton.component';
@Component({
  selector: 'app-blog-detail',
  imports: [
    CommonModule,
    FontAwesomeShareModule,
    MarkdownModule,
    LoadingSkeletonComponent,
  ],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css',
  standalone: true,
})
export class BlogDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private loadFile = inject(LoadFileService);
  private location = inject(Location);
  private titleService = inject(CustomTitleStrategy);
  public userPref = inject(UserPreferenceService);
  htmlContent: string = '';
  loading: boolean = true;
  error: string = '';

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadMarkdownFile(slug);
    } else {
      this.error = 'No blog post specified';
      this.loading = false;
    }
  }

  async loadMarkdownFile(slug: string) {
    try {
      this.loading = true;
      const filePath = `assets/articles/${slug}.html`;
      this.htmlContent = await this.loadFile.loadMarkdownFileAsync(filePath);
      const title = this.fromSlug(slug);
      this.titleService.setTitle(title);
    } catch (error) {
      this.error = 'Failed to load blog post';
      console.error('Error loading markdown file:', error);
    } finally {
      this.loading = false;
    }
  }

  goBack(): void {
    this.location.back();
  }

  fromSlug(slug: string): string {
    return slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Cap first letter of each word
  }
}
