import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WeatherCardComponent } from '../../components/weather-card/weather-card.component';
import { ForecastListComponent } from '../../components/forecast-list/forecast-list.component';
import { AirQualityComponent } from '../../components/air-quality/air-quality.component';
import { WeatherStore } from '../../services/weather-store.service';
import { HourlyForecastComponent } from '../../components/hourly-forecast/hourly-forecast.component';
import { WeatherAlertsComponent } from '../../components/weather-alerts/weather-alerts.component';
import { LocationSearchComponent } from '../../components/location-search/location-search.component';

@Component({
  selector: 'app-weather-page',
  imports: [
    CommonModule,
    RouterLink,
    LocationSearchComponent,
    WeatherCardComponent,
    ForecastListComponent,
    AirQualityComponent,
    HourlyForecastComponent,
    WeatherAlertsComponent
  ],
  templateUrl: './weather-page.component.html',
  styleUrl: './weather-page.component.css'
})
export class WeatherPageComponent {
  private readonly weatherStore = inject(WeatherStore);

  readonly currentLocation = this.weatherStore.currentLocation;
  
  // Check if there's a selected location
  readonly hasLocation = computed(() => {
    const location = this.currentLocation();
    return location !== null && location !== undefined;
  });
  
  // Get location display string
  readonly locationDisplay = computed(() => {
    const location = this.currentLocation();
    if (!location) return '';
    return `${location.name}, ${location.country}`;
  });

  selectedLocation = signal<string>('');

  clearLocation(): void {
    // Clear the current weather data which will clear the location
    this.weatherStore.reset();
    this.selectedLocation.set('');
  }
}
