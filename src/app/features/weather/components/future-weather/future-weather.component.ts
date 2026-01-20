import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherStore } from '../../services/weather-store.service';

@Component({
  selector: 'app-future-weather',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './future-weather.component.html',
  styleUrl: './future-weather.component.css'
})
export class FutureWeatherComponent {
  private readonly weatherStore = inject(WeatherStore);

  readonly future = this.weatherStore.future.asReadonly();
  readonly loading = this.weatherStore.loading.asReadonly();
  readonly currentLocation = this.weatherStore.currentLocation;

  futureDate = signal<string>('');

  readonly minFutureDate = this.formatDateForAPI(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000));
  readonly maxFutureDate = this.formatDateForAPI(new Date(Date.now() + 300 * 24 * 60 * 60 * 1000));

  loadFuture(): void {
    if (!this.futureDate()) return;
    
    const location = this.currentLocation();
    if (!location) return;
    
    const locationString = `${location.name}, ${location.country}`;
    // Ensure date is in yyyy-MM-dd format
    const formattedDate = this.formatDateForAPI(new Date(this.futureDate()));
    this.weatherStore.loadFuture(locationString, formattedDate);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate());
    return `${year}/${month}/${day}`;
  }

  /**
   * Format date to yyyy-MM-dd format for API
   */
  formatDateForAPI(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
