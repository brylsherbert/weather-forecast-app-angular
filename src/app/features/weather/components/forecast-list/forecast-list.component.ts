import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStore } from '../../services/weather-store.service';

@Component({
  selector: 'app-forecast-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast-list.component.html',
  styleUrl: './forecast-list.component.css'
})
export class ForecastListComponent {
  private readonly weatherStore = inject(WeatherStore);

  readonly forecast = this.weatherStore.forecast;
  readonly loading = this.weatherStore.loading;

  readonly forecastDays = computed(() => {
    const forecastData = this.forecast();
    return forecastData?.forecast.forecastday ?? [];
  });

  getDayName(dateString: string, index: number): string {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (index === 0) {
      if (date.toDateString() === today.toDateString()) {
        return 'Today';
      } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow';
      }
    }
    
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }

  getDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}
