import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStore } from '../../services/weather-store.service';

@Component({
  selector: 'app-time-zone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-zone.component.html',
  styleUrl: './time-zone.component.css'
})
export class TimeZoneComponent {
  private readonly weatherStore = inject(WeatherStore);

  readonly timeZone = this.weatherStore.timeZone.asReadonly();
  readonly loading = this.weatherStore.loading.asReadonly();
  readonly currentLocation = this.weatherStore.currentLocation;

  loadTimeZone(): void {
    const location = this.currentLocation();
    if (!location) return;
    
    const locationString = `${location.name}, ${location.country}`;
    this.weatherStore.loadTimeZone(locationString);
  }
}
