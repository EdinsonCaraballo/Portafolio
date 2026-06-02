import { Injectable, signal } from '@angular/core';
import { PortfolioService } from './portfolio.service';

export type AppLanguage = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly currentLang = signal<AppLanguage>('es');
  readonly languages: { code: AppLanguage; label: string; flag: string }[] = [
    { code: 'es', label: 'Español', flag: 'ES' },
    { code: 'en', label: 'English', flag: 'EN' }
  ];

  constructor(
    private portfolioService: PortfolioService
  ) {}

  init(): void {
    const isDevServer = window.location.port === '4210' || window.location.port === '4211';
    
    let lang: AppLanguage = 'es';
    if (isDevServer) {
      lang = window.location.port === '4211' ? 'en' : 'es';
    } else {
      const path = window.location.pathname;
      const pathLang = path.startsWith('/en/') || path === '/en' ? 'en' : (path.startsWith('/es/') || path === '/es' ? 'es' : null);
      const saved = localStorage.getItem('portfolio-lang') as AppLanguage | null;
      const browserLang = navigator.language.startsWith('en') ? 'en' : 'es';
      lang = pathLang || saved || browserLang;
    }

    this.currentLang.set(lang);
    this.portfolioService.fetchPortfolioData(lang);

    if (!isDevServer) {
      const path = window.location.pathname;
      const pathLang = path.startsWith('/en/') || path === '/en' ? 'en' : (path.startsWith('/es/') || path === '/es' ? 'es' : null);
      if (!pathLang) {
        this.setLanguage(lang, false);
      }
    }
  }

  setLanguage(lang: AppLanguage, persist = true): void {
    if (persist) {
      localStorage.setItem('portfolio-lang', lang);
    }

    this.currentLang.set(lang);
    this.portfolioService.fetchPortfolioData(lang);

    const isDevServer = window.location.port === '4210' || window.location.port === '4211';
    if (isDevServer) {
      const currentPort = window.location.port;
      const targetPort = lang === 'en' ? '4211' : '4210';
      if (currentPort !== targetPort) {
        window.location.href = window.location.protocol + '//' + window.location.hostname + ':' + targetPort + window.location.pathname;
      }
    } else {
      const path = window.location.pathname;
      let newPath = path;
      if (path.startsWith('/es/')) {
        newPath = path.replace('/es/', '/' + lang + '/');
      } else if (path.startsWith('/en/')) {
        newPath = path.replace('/en/', '/' + lang + '/');
      } else {
        newPath = '/' + lang + '/';
      }

      if (newPath !== path) {
        window.location.href = newPath;
      }
    }
  }
}
