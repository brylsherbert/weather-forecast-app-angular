import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
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
export class WeatherApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/v1`;

  /**
   * Get current weather for a location
   * @param q Location query (city name, lat/lon, postcode, IP, etc.)
   * @param options Optional parameters (aqi, lang)
   */
  getCurrentWeather(
    q: string,
    options?: CurrentWeatherOptions
  ): Observable<CurrentWeatherResponse> {
    let params = new HttpParams()
      .set('key', environment.weatherApiKey)
      .set('q', q);

    if (options?.aqi !== undefined) {
      params = params.set('aqi', options.aqi ? 'yes' : 'no');
    }

    if (options?.lang) {
      params = params.set('lang', options.lang);
    }

    return this.http.get<CurrentWeatherResponse>(`${this.baseUrl}/current.json`, { params });
  }

  /**
   * Get weather forecast for a location
   * @param q Location query (city name, lat/lon, postcode, IP, etc.)
   * @param days Number of days (1-14)
   * @param options Optional parameters (aqi, alerts, lang)
   */
  getForecast(
    q: string,
    days: number = 3,
    options?: ForecastOptions
  ): Observable<ForecastResponse> {
    let params = new HttpParams()
      .set('key', environment.weatherApiKey)
      .set('q', q)
      .set('days', days.toString());

    if (options?.aqi !== undefined) {
      params = params.set('aqi', options.aqi ? 'yes' : 'no');
    }

    if (options?.alerts !== undefined) {
      params = params.set('alerts', options.alerts ? 'yes' : 'no');
    }

    if (options?.lang) {
      params = params.set('lang', options.lang);
    }

    return this.http.get<ForecastResponse>(`${this.baseUrl}/forecast.json`, { params });
  }

  /**
   * Search for locations (autocomplete)
   * @param q Location query string
   */
  searchLocations(q: string): Observable<SearchResponse> {
    const params = new HttpParams()
      .set('key', environment.weatherApiKey)
      .set('q', q);

    return this.http.get<SearchResponse>(`${this.baseUrl}/search.json`, { params });
  }

  /**
   * Get historical weather data
   * @param q Location query (city name, lat/lon, postcode, IP, etc.)
   * @param dt Date in YYYY-MM-DD format (must be >= 2010-01-01)
   * @param options Optional parameters (end_dt, lang)
   */
  getHistory(
    q: string,
    dt: string,
    options?: HistoryOptions
  ): Observable<HistoryResponse> {
    let params = new HttpParams()
      .set('key', environment.weatherApiKey)
      .set('q', q)
      .set('dt', dt);

    if (options?.end_dt) {
      params = params.set('end_dt', options.end_dt);
    }

    if (options?.lang) {
      params = params.set('lang', options.lang);
    }

    return this.http.get<HistoryResponse>(`${this.baseUrl}/history.json`, { params });
  }

  /**
   * Get weather alerts for a location
   * @param q Location query (city name, lat/lon, postcode, IP, etc.)
   * @param options Optional parameters (lang)
   */
  getAlerts(
    q: string,
    options?: AlertsOptions
  ): Observable<AlertsResponse> {
    let params = new HttpParams()
      .set('key', environment.weatherApiKey)
      .set('q', q);

    if (options?.lang) {
      params = params.set('lang', options.lang);
    }

    return this.http.get<AlertsResponse>(`${this.baseUrl}/alerts.json`, { params });
  }

  /**
   * Get astronomy data (sunrise, sunset, moon phases)
   * @param q Location query (city name, lat/lon, postcode, IP, etc.)
   * @param options Optional parameters (dt, lang)
   */
  getAstronomy(
    q: string,
    options?: AstronomyOptions
  ): Observable<AstronomyResponse> {
    let params = new HttpParams()
      .set('key', environment.weatherApiKey)
      .set('q', q);

    if (options?.dt) {
      params = params.set('dt', options.dt);
    }

    if (options?.lang) {
      params = params.set('lang', options.lang);
    }

    return this.http.get<AstronomyResponse>(`${this.baseUrl}/astronomy.json`, { params });
  }

  /**
   * Get marine weather data
   * @param q Location query (city name, lat/lon, postcode, IP, etc.)
   * @param options Optional parameters (days, lang)
   */
  getMarine(
    q: string,
    options?: MarineOptions
  ): Observable<MarineResponse> {
    let params = new HttpParams()
      .set('key', environment.weatherApiKey)
      .set('q', q);

    if (options?.days) {
      params = params.set('days', options.days.toString());
    }

    if (options?.lang) {
      params = params.set('lang', options.lang);
    }

    return this.http.get<MarineResponse>(`${this.baseUrl}/marine.json`, { params });
  }

  /**
   * Get sports weather data
   * @param q Location query (city name, lat/lon, postcode, IP, etc.)
   * @param options Optional parameters (lang)
   */
  getSports(
    q: string,
    options?: SportsOptions
  ): Observable<SportsResponse> {
    let params = new HttpParams()
      .set('key', environment.weatherApiKey)
      .set('q', q);

    if (options?.lang) {
      params = params.set('lang', options.lang);
    }

    return this.http.get<SportsResponse>(`${this.baseUrl}/sports.json`, { params });
  }

  /**
   * Get time zone information
   * @param q Location query (city name, lat/lon, postcode, IP, etc.)
   * @param options Optional parameters (lang)
   */
  getTimeZone(
    q: string,
    options?: TimeZoneOptions
  ): Observable<TimeZoneResponse> {
    let params = new HttpParams()
      .set('key', environment.weatherApiKey)
      .set('q', q);

    if (options?.lang) {
      params = params.set('lang', options.lang);
    }

    return this.http.get<TimeZoneResponse>(`${this.baseUrl}/timezone.json`, { params });
  }

  /**
   * Get future weather data
   * @param q Location query (city name, lat/lon, postcode, IP, etc.)
   * @param dt Date in YYYY-MM-DD format (future date)
   * @param options Optional parameters (lang)
   */
  getFuture(
    q: string,
    dt: string,
    options?: FutureOptions
  ): Observable<FutureResponse> {
    let params = new HttpParams()
      .set('key', environment.weatherApiKey)
      .set('q', q)
      .set('dt', dt);

    if (options?.lang) {
      params = params.set('lang', options.lang);
    }

    return this.http.get<FutureResponse>(`${this.baseUrl}/future.json`, { params });
  }

  /**
   * Get location from IP address
   * @param ip IP address (optional, if not provided uses request IP)
   */
  getIPLookup(ip?: string): Observable<IPLookupResponse> {
    let params = new HttpParams()
      .set('key', environment.weatherApiKey);

    if (ip) {
      params = params.set('q', ip);
    }

    return this.http.get<IPLookupResponse>(`${this.baseUrl}/ip.json`, { params });
  }
}
