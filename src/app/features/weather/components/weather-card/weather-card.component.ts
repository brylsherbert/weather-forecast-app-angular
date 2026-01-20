import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStore } from '../../services/weather-store.service';

@Component({
  selector: 'app-weather-card',
  imports: [CommonModule],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.css'
})
export class WeatherCardComponent {
  private readonly weatherStore = inject(WeatherStore);

  readonly currentWeather = this.weatherStore.currentWeather;
  readonly currentData = this.weatherStore.currentData;
  readonly currentLocation = this.weatherStore.currentLocation;
  readonly loading = this.weatherStore.loading;
  readonly error = this.weatherStore.error;

  readonly temperature = computed(() => this.currentData()?.temp_c ?? 0);
  readonly condition = computed(() => this.currentData()?.condition.text ?? '');
  readonly conditionIcon = computed(() => this.currentData()?.condition.icon ?? '');
  readonly feelsLike = computed(() => this.currentData()?.feelslike_c ?? 0);
  readonly humidity = computed(() => this.currentData()?.humidity ?? 0);
  readonly windSpeed = computed(() => this.currentData()?.wind_kph ?? 0);
  readonly pressure = computed(() => this.currentData()?.pressure_mb ?? 0);
  readonly uv = computed(() => this.currentData()?.uv ?? 0);
  readonly visibility = computed(() => this.currentData()?.vis_km ?? 0);
}
