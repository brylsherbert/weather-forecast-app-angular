import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherStore } from '../../services/weather-store.service';

@Component({
  selector: 'app-ip-lookup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ip-lookup.component.html',
  styleUrl: './ip-lookup.component.css'
})
export class IpLookupComponent {
  private readonly weatherStore = inject(WeatherStore);

  readonly ipLookup = this.weatherStore.ipLookup.asReadonly();
  readonly loading = this.weatherStore.loading.asReadonly();

  ipAddress = signal<string>('');

  loadIPLookup(): void {
    this.weatherStore.loadIPLookup(this.ipAddress() || undefined);
  }
}
