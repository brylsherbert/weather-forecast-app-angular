import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastDay } from '../../../../models/weather.model';

@Component({
  selector: 'app-forecast-day-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast-day-item.component.html',
  styleUrl: './forecast-day-item.component.css'
})
export class ForecastDayItemComponent {
  readonly day = input.required<ForecastDay>();

  getDayName(dateString: string): string {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  }

  getDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}
