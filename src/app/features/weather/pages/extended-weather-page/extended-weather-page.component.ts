import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WeatherStore } from '../../services/weather-store.service';
import { LocationSearchComponent } from '../../components/location-search/location-search.component';
import { HistoricalWeatherComponent } from '../../components/historical-weather/historical-weather.component';
import { AstronomyComponent } from '../../components/astronomy/astronomy.component';
import { TimeZoneComponent } from '../../components/time-zone/time-zone.component';
import { MarineWeatherComponent } from '../../components/marine-weather/marine-weather.component';
import { FutureWeatherComponent } from '../../components/future-weather/future-weather.component';
import { IpLookupComponent } from '../../components/ip-lookup/ip-lookup.component';

@Component({
  selector: 'app-extended-weather-page',
  imports: [
    CommonModule,
    RouterLink,
    LocationSearchComponent,
    HistoricalWeatherComponent,
    AstronomyComponent,
    TimeZoneComponent,
    MarineWeatherComponent,
    FutureWeatherComponent,
    IpLookupComponent
  ],
  templateUrl: './extended-weather-page.component.html',
  styleUrl: './extended-weather-page.component.css'
})
export class ExtendedWeatherPageComponent {
  private readonly weatherStore = inject(WeatherStore);

  readonly error = this.weatherStore.error.asReadonly();
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

  clearLocation(): void {
    // Clear the current weather data which will clear the location
    this.weatherStore.reset();
  }
}
