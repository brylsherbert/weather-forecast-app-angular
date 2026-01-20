import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStore } from '../../services/weather-store.service';

@Component({
  selector: 'app-air-quality',
  imports: [CommonModule],
  templateUrl: './air-quality.component.html',
  styleUrl: './air-quality.component.css'
})
export class AirQualityComponent {
  private readonly weatherStore = inject(WeatherStore);

  readonly currentData = this.weatherStore.currentData;

  readonly airQuality = computed(() => this.currentData()?.air_quality ?? null);
  readonly hasAirQuality = computed(() => this.airQuality() !== null);

  getAQILevel(epaIndex: number): { level: string; color: string; bgColor: string } {
    if (epaIndex <= 1) {
      return { level: 'Good', color: 'text-green-700', bgColor: 'bg-green-100' };
    } else if (epaIndex <= 2) {
      return { level: 'Moderate', color: 'text-yellow-700', bgColor: 'bg-yellow-100' };
    } else if (epaIndex <= 3) {
      return { level: 'Unhealthy for Sensitive Groups', color: 'text-orange-700', bgColor: 'bg-orange-100' };
    } else if (epaIndex <= 4) {
      return { level: 'Unhealthy', color: 'text-red-700', bgColor: 'bg-red-100' };
    } else if (epaIndex <= 5) {
      return { level: 'Very Unhealthy', color: 'text-purple-700', bgColor: 'bg-purple-100' };
    } else {
      return { level: 'Hazardous', color: 'text-red-900', bgColor: 'bg-red-200' };
    }
  }

  getPollutantLevel(value: number, type: string): { level: string; color: string } {
    // Simplified levels based on common thresholds
    let threshold: number;
    switch (type) {
      case 'co':
        threshold = 9; // ppm
        break;
      case 'no2':
        threshold = 100; // ppb
        break;
      case 'o3':
        threshold = 100; // ppb
        break;
      case 'so2':
        threshold = 75; // ppb
        break;
      case 'pm2_5':
        threshold = 35; // μg/m³
        break;
      case 'pm10':
        threshold = 55; // μg/m³
        break;
      default:
        threshold = 50;
    }

    if (value <= threshold * 0.5) {
      return { level: 'Good', color: 'text-green-600' };
    } else if (value <= threshold) {
      return { level: 'Moderate', color: 'text-yellow-600' };
    } else if (value <= threshold * 1.5) {
      return { level: 'Unhealthy', color: 'text-orange-600' };
    } else {
      return { level: 'Very Unhealthy', color: 'text-red-600' };
    }
  }
}
