import { Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ResumeComponent } from './resume/resume.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MoreInfoComponent } from './secure/more-info/more-info.component';
import { TokenGuard } from '../core/guards/token.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { PlaylistComponent } from './secure/playlist/playlist.component';
import { QrGeneratorComponent } from '../shared/components/qr-generator/qr-generator.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';

export const MODULE_ROUTES: Routes = [
  { path: 'about-me', component: AboutMeComponent, title: 'Home' },
  { path: 'portfolio', component: PortfolioComponent, title: 'Work' },
  { path: 'resume', component: ResumeComponent, title: 'Resume' },
  {
    path: 'blogs',
    component: BlogComponent,
    pathMatch: 'full',
    title: 'Write',
  },
  { path: 'blogs/:slug', component: BlogDetailComponent },
  { path: 'contact', component: ContactComponent, title: 'Contact' },
  {
    path: 'more-info',
    component: MoreInfoComponent,
    canActivate: [TokenGuard],
    title: 'More',
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    title: 'Unauthorized',
  },
  {
    path: 'favorite-artist',
    component: PlaylistComponent,
    title: 'Favorite Artist',
  },
  { path: 'generate-qr', component: QrGeneratorComponent, title: 'QR' },
  { path: '**', component: NotFoundComponent, title: 'Not found' },
];
