import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStore } from '../../services/weather-store.service';
import { ForecastDay } from '../../models/weather.model';

@Component({
  selector: 'app-hourly-forecast',
  imports: [CommonModule],
  templateUrl: './hourly-forecast.component.html',
  styleUrl: './hourly-forecast.component.css'
})
export class HourlyForecastComponent {
  private readonly weatherStore = inject(WeatherStore);

  readonly forecast = this.weatherStore.forecast;
  readonly loading = this.weatherStore.loading;
  readonly selectedDayIndex = signal<number>(0);

  readonly forecastDays = computed(() => {
    const forecastData = this.forecast();
    return forecastData?.forecast.forecastday ?? [];
  });

  readonly selectedDayHours = computed(() => {
    const days = this.forecastDays();
    const index = this.selectedDayIndex();
    if (days.length > 0 && days[index]) {
      return days[index].hour ?? [];
    }
    return [];
  });

  readonly currentHourIndex = computed(() => {
    const now = new Date();
    const hours = this.selectedDayHours();
    return hours.findIndex(hour => {
      const hourDate = new Date(hour.time);
      return hourDate.getHours() === now.getHours() && 
             hourDate.getDate() === now.getDate();
    });
  });

  selectDay(index: number): void {
    this.selectedDayIndex.set(index);
  }

  getHour(timeString: string): string {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  }

  getDateLabel(dateString: string, index: number): string {
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
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }
}
