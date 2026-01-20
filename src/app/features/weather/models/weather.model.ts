// Weather Condition Interface
export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

// Location Interface
export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

// Air Quality Interface
export interface AirQuality {
  co: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  'us-epa-index': number;
  'gb-defra-index': number;
}

// Current Weather Interface
export interface Current {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
  air_quality?: AirQuality;
}

// Day Forecast Interface
export interface DayForecast {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  avgvis_km: number;
  avgvis_miles: number;
  avg_humidity: number;
  condition: WeatherCondition;
  uv: number;
}

// Astronomy Interface
export interface Astronomy {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: string;
}

// Hour Forecast Interface
export interface HourForecast {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c?: number;
  windchill_f?: number;
  heatindex_c?: number;
  heatindex_f?: number;
  dewpoint_c?: number;
  dewpoint_f?: number;
  vis_km?: number;
  vis_miles?: number;
  uv?: number;
  gust_mph?: number;
  gust_kph?: number;
  air_quality?: AirQuality;
}

// Forecast Day Interface
export interface ForecastDay {
  date: string;
  date_epoch: number;
  day: DayForecast;
  astro: Astronomy;
  hour: HourForecast[];
}

// Alert Interface
export interface Alert {
  headline: string;
  msgtype: string;
  severity: string;
  urgency: string;
  areas: string;
  category: string;
  certainty: string;
  event: string;
  note: string;
  effective: string;
  expires: string;
  desc: string;
  instruction: string;
}

// Current Weather Response
export interface CurrentWeatherResponse {
  location: Location;
  current: Current;
}

// Forecast Response
export interface ForecastResponse {
  location: Location;
  current: Current;
  forecast: {
    forecastday: ForecastDay[];
  };
  alerts?: {
    alert: Alert[];
  };
}

// Search Location Item
export interface SearchLocationItem {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

// Search Response
export interface SearchResponse extends Array<SearchLocationItem> {}

// History Day Interface
export interface HistoryDay {
  date: string;
  date_epoch: number;
  day: DayForecast;
  astro: Astronomy;
  hour: HourForecast[];
}

// History Response
export interface HistoryResponse {
  location: Location;
  forecast: {
    forecastday: HistoryDay[];
  };
}

// Alerts Response
export interface AlertsResponse {
  location: Location;
  alerts: {
    alert: Alert[];
  };
}

// Request Options Interfaces
export interface CurrentWeatherOptions {
  aqi?: boolean;
  lang?: string;
}

export interface ForecastOptions {
  days?: number;
  aqi?: boolean;
  alerts?: boolean;
  lang?: string;
}

export interface HistoryOptions {
  dt: string;
  end_dt?: string;
  lang?: string;
}

export interface AlertsOptions {
  lang?: string;
}

// Astronomy Response
export interface AstronomyResponse {
  location: Location;
  astronomy: {
    astro: Astronomy;
  };
}

// Marine Weather Interface
export interface MarineWeather {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  avgvis_km: number;
  avgvis_miles: number;
  avg_humidity: number;
  condition: WeatherCondition;
  uv: number;
}

export interface MarineHour {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c?: number;
  windchill_f?: number;
  heatindex_c?: number;
  heatindex_f?: number;
  dewpoint_c?: number;
  dewpoint_f?: number;
  will_it_rain?: number;
  chance_of_rain?: number;
  will_it_snow?: number;
  chance_of_snow?: number;
  vis_km?: number;
  vis_miles?: number;
  gust_mph?: number;
  gust_kph?: number;
  uv?: number;
  air_quality?: AirQuality;
}

export interface MarineDay {
  date: string;
  date_epoch: number;
  day: MarineWeather;
  astro: Astronomy;
  hour: MarineHour[];
}

// Marine Response
export interface MarineResponse {
  location: Location;
  forecast: {
    forecastday: MarineDay[];
  };
}

// Sports Event Interface
export interface SportsEvent {
  stadium: string;
  country: string;
  tournament: string;
  start: string;
  match: string;
}

// Sports Response
export interface SportsResponse {
  location: Location;
  sports: {
    football?: SportsEvent[];
    cricket?: SportsEvent[];
    golf?: SportsEvent[];
  };
}

// Time Zone Response
export interface TimeZoneResponse {
  location: Location;
}

// Future Weather Response (similar to forecast but for future dates)
export interface FutureResponse {
  location: Location;
  forecast: {
    forecastday: ForecastDay[];
  };
}

// IP Lookup Response
export interface IPLookupResponse {
  ip: string;
  type: string;
  continent_code: string;
  continent_name: string;
  country_code: string;
  country_name: string;
  is_eu: string;
  geoname_id: number;
  city: string;
  region: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

// Request Options Interfaces for new APIs
export interface AstronomyOptions {
  dt?: string;
  lang?: string;
}

export interface MarineOptions {
  days?: number;
  lang?: string;
}

export interface SportsOptions {
  lang?: string;
}

export interface TimeZoneOptions {
  lang?: string;
}

export interface FutureOptions {
  dt: string;
  lang?: string;
}
