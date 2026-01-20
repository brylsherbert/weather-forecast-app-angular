import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherStore } from '../../services/weather-store.service';

@Component({
  selector: 'app-historical-weather',
  imports: [CommonModule, FormsModule],
  templateUrl: './historical-weather.component.html',
  styleUrl: './historical-weather.component.css'
})
export class HistoricalWeatherComponent {
  private readonly weatherStore = inject(WeatherStore);

  readonly history = this.weatherStore.history;
  readonly loading = this.weatherStore.loading;
  readonly currentLocation = this.weatherStore.currentLocation;

  selectedDate = signal<string>('');
  maxDate = new Date().toISOString().split('T')[0];
  minDate = '2010-01-01';

  readonly hasHistory = computed(() => this.history() !== null);
  readonly historyDays = computed(() => {
    const historyData = this.history();
    return historyData?.forecast.forecastday ?? [];
  });

  loadHistory(): void {
    const location = this.currentLocation();
    const date = this.selectedDate();
    
    if (!location || !date) {
      return;
    }

    const locationString = `${location.name}, ${location.country}`;
    this.weatherStore.loadHistory(locationString, date);
  }

  getDateLabel(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getDayName(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }

  getHour(timeString: string): string {
    const date = new Date(timeString);
    const hours = date.getHours();
    return `${hours.toString().padStart(2, '0')}:00`;
  }
}
