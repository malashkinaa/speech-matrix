import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { routes } from './app.routes';
import { ApiInterceptor } from './services/api-inteceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    //provideHttpClient(withFetch(), withInterceptors([ApiInterceptor]))
  ],
};

export const env = {
  signalRServiceURL: 'https://s2t-broadcast.azurewebsites.net/api',
  s2tServiceURL: 'https://speech2text-web.azurewebsites.net',
  processingFunctionURL: 'https://speech2text-processing.azurewebsites.net/api',
};
