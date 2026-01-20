import { Injectable, inject, signal, computed } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { WeatherApiService } from './weather-api.service';
import {
  CurrentWeatherResponse,
  ForecastResponse,
  SearchResponse,
  HistoryResponse,
  AlertsResponse,
  AstronomyResponse,
  MarineResponse,
  SportsResponse,
  TimeZoneResponse,
  FutureResponse,
  IPLookupResponse,
  SearchLocationItem,
  CurrentWeatherOptions,
  ForecastOptions,
  HistoryOptions,
  AlertsOptions,
  AstronomyOptions,
  MarineOptions,
  SportsOptions,
  TimeZoneOptions,
  FutureOptions
} from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherStore {
  private readonly api = inject(WeatherApiService);

  // State signals
  readonly currentWeather = signal<CurrentWeatherResponse | null>(null);
  readonly forecast = signal<ForecastResponse | null>(null);
  readonly searchResults = signal<SearchLocationItem[]>([]);
  readonly history = signal<HistoryResponse | null>(null);
  readonly alerts = signal<AlertsResponse | null>(null);
  readonly astronomy = signal<AstronomyResponse | null>(null);
  readonly marine = signal<MarineResponse | null>(null);
  readonly sports = signal<SportsResponse | null>(null);
  readonly timeZone = signal<TimeZoneResponse | null>(null);
  readonly future = signal<FutureResponse | null>(null);
  readonly ipLookup = signal<IPLookupResponse | null>(null);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  // Computed signals for easier access
  readonly currentLocation = computed(() => this.currentWeather()?.location ?? null);
  readonly currentData = computed(() => this.currentWeather()?.current ?? null);

  /**
   * Load current weather for a location
   * @param q Location query (city name, lat/lon, postcode, IP, etc.)
   * @param options Optional parameters (aqi, lang)
   */
  async loadCurrentWeather(q: string, options?: CurrentWeatherOptions): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await lastValueFrom(this.api.getCurrentWeather(q, options));
      this.currentWeather.set(response);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load current weather';
      this.error.set(errorMessage);
      this.currentWeather.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Load weather forecast for a location
   * @param q Location query (city name, lat/lon, postcode, IP, etc.)
   * @param days Number of days (1-14)
   * @param options Optional parameters (aqi, alerts, lang)
   */
  async loadForecast(q: string, days: number = 3, options?: ForecastOptions): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await lastValueFrom(this.api.getForecast(q, days, options));
      this.forecast.set(response);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load forecast';
      this.error.set(errorMessage);
      this.forecast.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Search for locations (autocomplete)
   * @param q Location query string
   */
  async searchLocations(q: string): Promise<void> {
    if (!q || q.trim().length === 0) {
      this.searchResults.set([]);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await lastValueFrom(this.api.searchLocations(q));
      this.searchResults.set(response);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search locations';
      this.error.set(errorMessage);
      this.searchResults.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Load historical weather data
   * @param q Location query (city name, lat/lon, postcode, IP, etc.)
   * @param dt Date in YYYY-MM-DD format (must be >= 2010-01-01)
   * @param options Optional parameters (end_dt, lang)
   */
  async loadHistory(q: string, dt: string, options?: HistoryOptions): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await lastValueFrom(this.api.getHistory(q, dt, options));
      this.history.set(response);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load historical data';
      this.error.set(errorMessage);
      this.history.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Load weather alerts for a location
   * @param q Location query (city name, lat/lon, postcode, IP, etc.)
   * @param options Optional parameters (lang)
   */
  async loadAlerts(q: string, options?: AlertsOptions): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await lastValueFrom(this.api.getAlerts(q, options));
      this.alerts.set(response);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load alerts';
      this.error.set(errorMessage);
      this.alerts.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Load both current weather and forecast in parallel
   * @param q Location query (city name, lat/lon, postcode, IP, etc.)
   * @param days Number of forecast days (1-14)
   * @param options Optional parameters
   */
  async loadWeatherAndForecast(
    q: string,
    days: number = 3,
    options?: { current?: CurrentWeatherOptions; forecast?: ForecastOptions }
  ): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      await Promise.all([
        this.loadCurrentWeather(q, options?.current),
        this.loadForecast(q, days, options?.forecast)
      ]);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load weather data';
      this.error.set(errorMessage);
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Clear error state
   */
  clearError(): void {
    this.error.set(null);
  }

  /**
   * Load astronomy data for a location
   * @param q Location query (city name, lat/lon, postcode, IP, etc.)
   * @param options Optional parameters (dt, lang)
   */
  async loadAstronomy(q: string, options?: AstronomyOptions): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await lastValueFrom(this.api.getAstronomy(q, options));
      this.astronomy.set(response);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load astronomy data';
      this.error.set(errorMessage);
      this.astronomy.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Load marine weather data for a location
   * @param q Location query (city name, lat/lon, postcode, IP, etc.)
   * @param options Optional parameters (days, lang)
   */
  async loadMarine(q: string, options?: MarineOptions): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await lastValueFrom(this.api.getMarine(q, options));
      this.marine.set(response);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load marine weather';
      this.error.set(errorMessage);
      this.marine.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Load sports weather data for a location
   * @param q Location query (city name, lat/lon, postcode, IP, etc.)
   * @param options Optional parameters (lang)
   */
  async loadSports(q: string, options?: SportsOptions): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await lastValueFrom(this.api.getSports(q, options));
      console.log("🚀 ~ WeatherStore ~ loadSports ~ response:", response)
      this.sports.set(response);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load sports weather';
      this.error.set(errorMessage);
      this.sports.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Load time zone information for a location
   * @param q Location query (city name, lat/lon, postcode, IP, etc.)
   * @param options Optional parameters (lang)
   */
  async loadTimeZone(q: string, options?: TimeZoneOptions): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await lastValueFrom(this.api.getTimeZone(q, options));
      this.timeZone.set(response);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load time zone data';
      this.error.set(errorMessage);
      this.timeZone.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Load future weather data for a location
   * @param q Location query (city name, lat/lon, postcode, IP, etc.)
   * @param dt Date in YYYY-MM-DD format (future date)
   * @param options Optional parameters (lang)
   */
  async loadFuture(q: string, dt: string, options?: FutureOptions): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await lastValueFrom(this.api.getFuture(q, dt, options));
      this.future.set(response);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load future weather';
      this.error.set(errorMessage);
      this.future.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Load location from IP address
   * @param ip IP address (optional, if not provided uses request IP)
   */
  async loadIPLookup(ip?: string): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await lastValueFrom(this.api.getIPLookup(ip));
      this.ipLookup.set(response);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load IP lookup data';
      this.error.set(errorMessage);
      this.ipLookup.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Reset all state
   */
  reset(): void {
    this.currentWeather.set(null);
    this.forecast.set(null);
    this.searchResults.set([]);
    this.history.set(null);
    this.alerts.set(null);
    this.astronomy.set(null);
    this.marine.set(null);
    this.sports.set(null);
    this.timeZone.set(null);
    this.future.set(null);
    this.ipLookup.set(null);
    this.loading.set(false);
    this.error.set(null);
  }
}
