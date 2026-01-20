import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherStore } from '../../services/weather-store.service';
import { SearchLocationItem } from '../../models/weather.model';

@Component({
  selector: 'app-location-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './location-search.component.html',
  styleUrl: './location-search.component.css'
})
export class LocationSearchComponent {
  private readonly weatherStore = inject(WeatherStore);

  searchQuery = signal('');
  showResults = signal(false);
  selectedCity = signal<string>('Cebu, Philippines');

  readonly searchResults = this.weatherStore.searchResults;
  readonly loading = this.weatherStore.loading;

  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  private isSelecting = false;

  constructor() {
    // Debounce search
    effect(() => {
      const query = this.searchQuery();
      const selected = this.selectedCity();
      
      // Don't trigger search if we're in the process of selecting a location
      if (this.isSelecting) {
        return;
      }
      
      // Don't show results if the query matches the selected city
      if (query === selected) {
        this.showResults.set(false);
        return;
      }
      
      // Clear previous timeout
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      
      if (query && query.length >= 2) {
        this.timeoutId = setTimeout(() => {
          this.weatherStore.searchLocations(query);
          this.showResults.set(true);
        }, 300);
      } else {
        this.showResults.set(false);
      }
    });
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  selectLocation(location: SearchLocationItem): void {
    const locationString = `${location.name}, ${location.country}`;
    this.selectedCity.set(locationString);
    
    // Set flag to prevent effect from triggering search
    this.isSelecting = true;
    
    // Hide results immediately
    this.showResults.set(false);
    
    // Set the search query to the selected location
    this.searchQuery.set(locationString);
    
    // Reset flag after a brief delay to allow the query to be set without triggering search
    setTimeout(() => {
      this.isSelecting = false;
    }, 100);
    
    // Load weather for selected location
    this.weatherStore.loadWeatherAndForecast(locationString, 7, {
      current: { aqi: true },
      forecast: { aqi: true, alerts: true }
    });
    
    // Also load alerts separately
    this.weatherStore.loadAlerts(locationString);
  }

  onFocus(): void {
    if (this.searchResults().length > 0) {
      this.showResults.set(true);
    }
  }

  onBlur(): void {
    // Delay to allow click event on results
    setTimeout(() => {
      this.showResults.set(false);
    }, 200);
  }
}
