import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch())
  ]
};

export const env = {
  signalRServiceURL: 'https://s2t-broadcast.azurewebsites.net/api',
  s2tServiceURL: 'https://speech2text-web.azurewebsites.net',
};