import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStore } from '../../services/weather-store.service';

@Component({
  selector: 'app-marine-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marine-weather.component.html',
  styleUrl: './marine-weather.component.css'
})
export class MarineWeatherComponent {
  private readonly weatherStore = inject(WeatherStore);

  readonly marine = this.weatherStore.marine.asReadonly();
  readonly loading = this.weatherStore.loading.asReadonly();
  readonly currentLocation = this.weatherStore.currentLocation;

  loadMarine(): void {
    const location = this.currentLocation();
    if (!location) return;
    
    const locationString = `${location.name}, ${location.country}`;
    this.weatherStore.loadMarine(locationString, { days: 3 });
  }
}
