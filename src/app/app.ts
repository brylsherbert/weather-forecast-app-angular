import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DarkModeToggleComponent } from './shared/components/dark-mode-toggle/dark-mode-toggle.component';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DarkModeToggleComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('weather-forecast-app-angular-tailwind');
  
  // Initialize theme service to apply theme on app start
  private readonly themeService = inject(ThemeService);
}
