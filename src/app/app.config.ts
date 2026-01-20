import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { weatherInitializer } from './features/weather/services/weather-initializer.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideAppInitializer(weatherInitializer)
  ]
};
