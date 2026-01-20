import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherStore } from '../../services/weather-store.service';

@Component({
  selector: 'app-astronomy',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './astronomy.component.html',
  styleUrl: './astronomy.component.css'
})
export class AstronomyComponent {
  private readonly weatherStore = inject(WeatherStore);

  readonly astronomy = this.weatherStore.astronomy.asReadonly();
  readonly loading = this.weatherStore.loading.asReadonly();
  readonly currentLocation = this.weatherStore.currentLocation;

  astronomyDate = signal<string>('');

  loadAstronomy(): void {
    const location = this.currentLocation();
    if (!location) return;
    
    const locationString = `${location.name}, ${location.country}`;
    this.weatherStore.loadAstronomy(locationString, { dt: this.astronomyDate() || undefined });
  }

  formatTime(timeString: string): string {
    // Handle empty strings or null/undefined values
    if (!timeString || timeString.trim() === '') {
      return '—';
    }
    
    // Check if it's already a formatted time string (e.g., "03:29 PM")
    // Time strings from astronomy API are in format "HH:MM AM/PM"
    const trimmed = timeString.trim();
    if (/^\d{1,2}:\d{2}\s?(AM|PM)$/i.test(trimmed)) {
      return trimmed;
    }
    
    // If it's a full date string, parse and format it
    try {
      const date = new Date(timeString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
      }
    } catch (e) {
      // If parsing fails, return the original string
    }
    
    return timeString;
  }
}
