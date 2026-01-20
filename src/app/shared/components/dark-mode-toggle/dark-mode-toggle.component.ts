import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-dark-mode-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dark-mode-toggle.component.html',
  styleUrl: './dark-mode-toggle.component.css'
})
export class DarkModeToggleComponent {
  private readonly themeService = inject(ThemeService);

  readonly isDarkMode = this.themeService.isDarkMode;

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
