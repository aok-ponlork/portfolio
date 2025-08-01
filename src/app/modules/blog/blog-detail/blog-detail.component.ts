import { CommonModule, Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadFileService } from '../../../core/services/load-file.service';
import { UserPreferenceService } from '../../../core/services/common/user-preference.service';
import { FontAwesomeShareModule } from '../../../shared/modules/font-awesome.module';
import { CustomTitleStrategy } from '../../../core/services/title.service';
import { LoadingSkeletonComponent } from '../../../shared/components/loading-skeleton/loading-skeleton.component';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';
import 'prismjs/themes/prism-tomorrow.css';
import { SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-blog-detail',
  imports: [CommonModule, FontAwesomeShareModule, LoadingSkeletonComponent],
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
  htmlContent: SafeHtml | null = null;
  loading: boolean = true;
  error: string = '';

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadContent(slug);
    } else {
      this.error = 'No blog post specified';
      this.loading = false;
    }
  }
  async loadContent(slug: string) {
    try {
      this.loading = true;
      const filePath = `assets/articles/${slug}.html`;
      this.htmlContent = await this.loadFile.loadFileAsync(filePath);
      setTimeout(() => {
        if (typeof Prism !== 'undefined' && Prism.highlightAll) {
          Prism.highlightAll();
        }
      }, 0);

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
