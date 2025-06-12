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

export const MODULE_ROUTES: Routes = [
  { path: 'about-me', component: AboutMeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'blogs', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'more-info',
    component: MoreInfoComponent,
    canActivate: [TokenGuard],
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'favorite-artist', component: PlaylistComponent },
  { path: '**', component: NotFoundComponent },
];
