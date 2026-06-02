import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PortfolioData, ContactResponse } from '../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = 'http://localhost:8010/api';

  private portfolioState = signal<PortfolioData | null>(null);
  private loadingState = signal<boolean>(true);
  private errorState = signal<string | null>(null);
  private currentLang = signal<string>('es');

  portfolio = computed(() => this.portfolioState());
  loading = computed(() => this.loadingState());
  error = computed(() => this.errorState());
  lang = computed(() => this.currentLang());

  constructor(private http: HttpClient) {}

  fetchPortfolioData(lang: string = 'es'): void {
    this.currentLang.set(lang);
    this.loadingState.set(true);
    this.errorState.set(null);

    const startTime = Date.now();

    this.http.get<PortfolioData>(`${this.apiUrl}/portfolio/?lang=${lang}`).subscribe({
      next: (data) => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 2000 - elapsedTime);

        setTimeout(() => {
          this.portfolioState.set(data);
          this.loadingState.set(false);
        }, remainingTime);
      },
      error: (err) => {
        console.error('Error fetching portfolio data:', err);
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 2000 - elapsedTime);

        setTimeout(() => {
          this.errorState.set('error.backend');
          this.loadingState.set(false);
        }, remainingTime);
      }
    });
  }

  sendContactMessage(name: string, email: string, message: string): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${this.apiUrl}/contact/`, { name, email, message });
  }
}
