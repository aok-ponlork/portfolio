import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import player from 'lottie-web';
import { provideLottieOptions } from 'ngx-lottie';
import 'aos/dist/aos.css';
import { provideMarkdown } from 'ngx-markdown';
import { CustomTitleStrategy } from './core/services/title.service';
registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideMarkdown(),
    provideLottieOptions({
      player: () => player,
    }),
    { provide: TitleStrategy, useClass: CustomTitleStrategy },
  ],
};
