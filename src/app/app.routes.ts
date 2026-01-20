import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/weather/pages/weather-page/weather-page.component').then(
        (m) => m.WeatherPageComponent
      )
  },
  {
    path: 'extended',
    loadComponent: () =>
      import('./features/weather/pages/extended-weather-page/extended-weather-page.component').then(
        (m) => m.ExtendedWeatherPageComponent
      )
  }
];
