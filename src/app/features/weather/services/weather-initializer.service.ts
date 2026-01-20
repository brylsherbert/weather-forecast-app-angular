import { inject } from '@angular/core';
import { WeatherStore } from './weather-store.service';
import { IpService } from '../../../core/services/ip.service';

export async function weatherInitializer() {
  const weatherStore = inject(WeatherStore);
  const ipService = inject(IpService);
  
  // Get user's IP address and store it in signal
  await ipService.getPublicIPAsync();
  
  // Use IP address if available, otherwise fallback to default location
  const location = ipService.publicIP.asReadonly();
  
  // Load weather data based on location
  return Promise.all([
    weatherStore.loadWeatherAndForecast(location(), 7, {
      current: { aqi: true },
      forecast: { aqi: true, alerts: true }
    }),
    weatherStore.loadAlerts(location())
  ]);
}
