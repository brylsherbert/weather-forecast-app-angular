# Weather Forecast App

A modern, responsive weather forecast application built with Angular 21 and Tailwind CSS 4. This application provides comprehensive weather information using the [WeatherAPI.com](https://www.weatherapi.com) service.

![Angular](https://img.shields.io/badge/Angular-21.1.0-red.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.12-38bdf8.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)

## Features

### Main Weather Page
- **Current Weather Display**: Real-time weather information with temperature, conditions, humidity, wind speed, and more
- **7-Day Forecast**: Extended forecast with daily high/low temperatures, conditions, and precipitation
- **Hourly Forecast**: Detailed hourly weather predictions for the next 24 hours
- **Air Quality Index**: Real-time air quality data with pollutant information
- **Weather Alerts**: Important weather warnings and alerts for selected locations
- **Location Search**: Autocomplete search to find and select any city worldwide

### Extended Features Page
- **Astronomy Data**: Sunrise, sunset, moonrise, moonset, and moon phase information
- **Marine Weather**: Marine-specific weather forecasts for coastal areas
- **Time Zone Information**: Local time and timezone details for any location
- **Future Weather**: Weather forecasts for dates 14-300 days in the future
- **Historical Weather**: Historical weather data from 2010 onwards
- **IP Lookup**: Geolocation and weather information based on IP address

### Additional Features
- **Dark Mode**: Toggle between light and dark themes with persistent preference
- **Responsive Design**: Fully responsive layout that works on all device sizes
- **Auto-location**: Automatically detects user location via IP address on app startup
- **Real-time Updates**: Live weather data with automatic refresh capabilities

## Tech Stack

- **Framework**: [Angular](https://angular.dev) 21.1.0
- **Styling**: [Tailwind CSS](https://tailwindcss.com) 4.1.12
- **Language**: TypeScript 5.9.2
- **State Management**: Angular Signals
- **HTTP Client**: Angular HttpClient with RxJS
- **API**: [WeatherAPI.com](https://www.weatherapi.com)
- **Build Tool**: Angular CLI

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher ([Download](https://nodejs.org/))
- **npm**: Version 9.x or higher (comes with Node.js)
- **Angular CLI**: Version 21.x or higher

To install Angular CLI globally:
```bash
npm install -g @angular/cli
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-forecast-app-angular.git
   cd weather-forecast-app-angular
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   You need to get a free API key from [WeatherAPI.com](https://www.weatherapi.com):
   
   a. Sign up for a free account at [https://www.weatherapi.com](https://www.weatherapi.com)
   
   b. Navigate to your dashboard and copy your API key
   
   c. Copy the example environment files:
   ```bash
   cp src/environments/environment.example.ts src/environments/environment.ts
   cp src/environments/environment.prod.example.ts src/environments/environment.prod.ts
   ```
   
   d. Open `src/environments/environment.ts` and replace `YOUR_API_KEY_HERE` with your actual API key:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'https://api.weatherapi.com',
     weatherApiKey: 'your-actual-api-key-here',
     cacheTimeout: 300000
   };
   ```
   
   e. Do the same for `src/environments/environment.prod.ts` for production builds

## Running the Application

### Development Server

Start the development server:
```bash
ng serve
```

The application will be available at `http://localhost:4200/`. The app will automatically reload when you make changes to the source files.

### Production Build

To build the project for production:
```bash
ng build
```

The build artifacts will be stored in the `dist/` directory. The production build optimizes the application for performance and speed.

To build with production configuration:
```bash
ng build --configuration production
```

## Project Structure

```
src/app/
├── core/                          # Core application services
│   └── services/
│       ├── ip.service.ts         # IP geolocation service
│       └── theme.service.ts      # Dark mode theme service
├── features/
│   └── weather/
│       ├── components/           # Reusable weather components
│       │   ├── air-quality/
│       │   ├── astronomy/
│       │   ├── forecast-list/
│       │   ├── hourly-forecast/
│       │   ├── location-search/
│       │   ├── weather-alerts/
│       │   └── weather-card/
│       ├── pages/                 # Route-level page components
│       │   ├── weather-page/
│       │   └── extended-weather-page/
│       ├── models/               # TypeScript interfaces
│       │   └── weather.model.ts
│       ├── services/              # Feature-specific services
│       │   ├── weather-api.service.ts
│       │   ├── weather-store.service.ts
│       │   └── weather-initializer.service.ts
│       └── weather.routes.ts      # Feature routing
├── shared/                        # Shared components
│   └── components/
│       └── dark-mode-toggle/
└── environments/                  # Environment configuration
    ├── environment.ts
    ├── environment.prod.ts
    ├── environment.example.ts
    └── environment.prod.example.ts
```

## API Documentation

This application uses the [WeatherAPI.com](https://www.weatherapi.com) service. For detailed API documentation, visit:

- **Main Documentation**: [https://www.weatherapi.com/docs/](https://www.weatherapi.com/docs/)
- **Swagger/OpenAPI**: [https://app.swaggerhub.com/apis-docs/WeatherAPI.com/WeatherAPI/1.0.2](https://app.swaggerhub.com/apis-docs/WeatherAPI.com/WeatherAPI/1.0.2)

### API Endpoints Used

- Current Weather: `/v1/current.json`
- Forecast: `/v1/forecast.json`
- Search/Autocomplete: `/v1/search.json`
- Historical Weather: `/v1/history.json`
- Weather Alerts: `/v1/alerts.json`
- Astronomy: `/v1/astronomy.json`
- Marine Weather: `/v1/marine.json`
- Time Zone: `/v1/timezone.json`
- Future Weather: `/v1/future.json`
- IP Lookup: `/v1/ip.json`

## Development

### Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component:
```bash
ng generate component component-name
```

For a complete list of available schematics, run:
```bash
ng generate --help
```

### Running Tests

To execute unit tests with [Vitest](https://vitest.dev/):
```bash
ng test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [WeatherAPI.com](https://www.weatherapi.com) for providing the weather data API
- [Angular](https://angular.dev) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

**Note**: Make sure to keep your API key secure and never commit it to version control. The `.gitignore` file is configured to exclude environment files containing API keys.
