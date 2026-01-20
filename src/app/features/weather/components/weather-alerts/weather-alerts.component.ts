import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStore } from '../../services/weather-store.service';

@Component({
  selector: 'app-weather-alerts',
  imports: [CommonModule],
  templateUrl: './weather-alerts.component.html',
  styleUrl: './weather-alerts.component.css',
})
export class WeatherAlertsComponent {
  private readonly weatherStore = inject(WeatherStore);

  readonly alerts = this.weatherStore.alerts;
  readonly forecast = this.weatherStore.forecast;
  readonly loading = this.weatherStore.loading;

  readonly alertList = computed(() => {
    const alertsData = this.alerts();
    const forecastData = this.forecast();

    // Get alerts from dedicated alerts API or from forecast
    if (alertsData?.alerts?.alert) {
      return alertsData.alerts.alert;
    } else if (forecastData?.alerts?.alert) {
      return forecastData.alerts.alert;
    }
    return [];
  });

  readonly hasAlerts = computed(() => this.alertList().length > 0);

  getSeverityColor(severity: string): string {
    switch (severity.toLowerCase()) {
      case 'extreme':
        return 'bg-red-600';
      case 'severe':
        return 'bg-red-500';
      case 'moderate':
        return 'bg-orange-500';
      case 'minor':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) {
      return '';
    }

    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
