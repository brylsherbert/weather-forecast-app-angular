import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';

export interface IpifyResponse {
  ip: string;
}

@Injectable({
  providedIn: 'root'
})
export class IpService {
  private readonly http = inject(HttpClient);
  private readonly ipifyUrl = 'https://api.ipify.org';
  
  readonly publicIP = signal<string>('Cebu, Philippines');

  /**
   * Get the user's public IP address
   * @returns Observable with IP address in JSON format
   */
  getPublicIP(): Observable<IpifyResponse> {
    return this.http.get<IpifyResponse>(`${this.ipifyUrl}?format=json`);
  }

  /**
   * Get the user's public IP address and store it in a signal
   * @returns Promise that resolves when IP is fetched and stored
   */
  async getPublicIPAsync(): Promise<void> {
    try {
      const response = await lastValueFrom(this.getPublicIP());
      this.publicIP.set(response.ip);
    } catch (error) {
      console.warn('Failed to get IP address:', error);
      this.publicIP.set('');
    }
  }
}
