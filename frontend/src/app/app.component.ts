
import { Component, OnInit, ElementRef, ViewChild, OnDestroy, signal, computed, inject, ChangeDetectionStrategy, effect, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from './services/portfolio.service';
import { LanguageService, AppLanguage } from './services/language.service';
import { Project } from './models/portfolio.models';
import { trigger, transition, style, animate } from '@angular/animations';

interface TerminalLine {
  type: 'output' | 'input' | 'error' | 'success';
  text: string;
}

interface DashboardMetric {
  icon: string;
  value: string;
  label: string;
  section: string;
}

interface CategoryFilter {
  key: string;
  label: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ height: '0', opacity: 0 }))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('terminalEnd') terminalEndRef!: ElementRef;
  @ViewChild('matrixCanvas') matrixCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('confettiCanvas') confettiCanvasRef!: ElementRef<HTMLCanvasElement>;

  private portfolioService = inject(PortfolioService);
  languageService = inject(LanguageService);

  // Accent Themes
  accentName = signal<'blue' | 'emerald' | 'violet' | 'rose'>('blue');
  copiedField = signal<string | null>(null);
  imageError = signal<boolean>(false);
  currentYear = new Date().getFullYear();

  // Search & Filter State
  skillSearch = signal<string>('');
  projectSearch = signal<string>('');
  activeSkillCat = signal<string>('ALL');
  activeProjCat = signal<string>('ALL');
  selectedTechs = signal<string[]>([]);
  techDropdownOpen = signal<boolean>(false);
  techSearchQuery = signal<string>('');
  backgroundTheme = signal<'dark' | 'slate-grey'>('dark');
  activeTab = signal<'todos' | 'destacados' | 'laborales' | 'universitarios'>('todos');

  skillCategoryFilters = computed<CategoryFilter[]>(() => {
    const lang = this.languageService.currentLang();
    const isDev = window.location.port === '4210';
    if (isDev && lang === 'en') {
      return [
        { key: 'ALL', label: 'All' },
        { key: 'Backend', label: 'Backend' },
        { key: 'Frontend', label: 'Frontend' },
        { key: 'DB', label: 'Databases' },
        { key: 'Tools', label: 'Tools' }
      ];
    }
    return [
      { key: 'ALL', label: $localize`:@@filters.all:Todos` },
      { key: 'Backend', label: $localize`:@@filters.backend:Backend` },
      { key: 'Frontend', label: $localize`:@@filters.frontend:Frontend` },
      { key: 'DB', label: $localize`:@@filters.databases:Bases de datos` },
      { key: 'Tools', label: $localize`:@@filters.tools:Herramientas` }
    ];
  });

  projectCategoryFilters = computed<CategoryFilter[]>(() => {
    const lang = this.languageService.currentLang();
    const isDev = window.location.port === '4210';
    if (isDev && lang === 'en') {
      return [
        { key: 'ALL', label: 'All' },
        { key: 'Fullstack', label: 'Fullstack' }
      ];
    }
    return [
      { key: 'ALL', label: $localize`:@@filters.all:Todos` },
      { key: 'Fullstack', label: $localize`:@@filters.fullstack:Fullstack` }
    ];
  });

  accessibilityButtonText = computed(() => {
    const isDark = this.backgroundTheme() === 'dark';
    const lang = this.languageService.currentLang();
    const isDev = window.location.port === '4210';
    if (isDev && lang === 'en') {
      return isDark ? 'Accessible Mode' : 'Dark Mode';
    }
    return isDark 
      ? $localize`:@@accessibility.accessibleMode:Modo Accesible` 
      : $localize`:@@accessibility.darkMode:Fondo Oscuro`;
  });

  accessibilityButtonTitle = computed(() => {
    const isDark = this.backgroundTheme() === 'dark';
    const lang = this.languageService.currentLang();
    const isDev = window.location.port === '4210';
    if (isDev && lang === 'en') {
      return isDark ? 'Switch to High Readability Light Mode' : 'Switch to original Dark Mode';
    }
    return isDark 
      ? $localize`:@@accessibility.titleToLight:Cambiar a Fondo Claro de Alta Legibilidad` 
      : $localize`:@@accessibility.titleToDark:Cambiar a Fondo Oscuro original`;
  });

  // Experience Accordion
  expandedExps = signal<Record<number, boolean>>({ 0: true });

  // Modal
  selectedProject = signal<Project | null>(null);

  // Terminal
  terminalInput = '';
  terminalHistory = signal<TerminalLine[]>([]);
  sqlGameState = signal<'idle' | 'waiting-choice'>('idle');
  matrixActive = signal<boolean>(false);

  quickCommands = ['help', 'about', 'skills', 'projects', 'game', 'matrix', 'clear'];

  dashboardMetrics = computed<DashboardMetric[]>(() => {
    const lang = this.languageService.currentLang();
    const isDev = window.location.port === '4210';
    if (isDev && lang === 'en') {
      return [
        { icon: 'bi-briefcase', value: '9+', label: 'Years of experience', section: 'experience' },
        { icon: 'bi-code-square', value: '9+', label: 'Projects completed', section: 'projects' },
        { icon: 'bi-database', value: '6+', label: 'Databases', section: 'skills' },
        { icon: 'bi-people', value: '9+', label: 'Happy clients', section: 'contact' }
      ];
    }
    return [
      { icon: 'bi-briefcase', value: '9+', label: $localize`:@@metrics.yearsExperience:Años de experiencia`, section: 'experience' },
      { icon: 'bi-code-square', value: '9+', label: $localize`:@@metrics.projectsCompleted:Proyectos completados`, section: 'projects' },
      { icon: 'bi-database', value: '6+', label: $localize`:@@metrics.databases:Bases de datos`, section: 'skills' },
      { icon: 'bi-people', value: '9+', label: $localize`:@@metrics.happyClients:Clientes satisfechos`, section: 'contact' }
    ];
  });

  // Matrix animation
  private matrixIntervalId?: any;
  private confettiAnimationFrameId?: number;

  // Contact Form
  formData = { name: '', email: '', message: '' };
  formErrors = { name: '', email: '', message: '' };
  formSubmitted = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);

  // Typing Effect
  words: string[] = [];
  currentWordIdx = 0;
  currentText = signal<string>('');
  isDeleting = false;
  typingSpeed = 100;
  private typingTimeoutId?: any;

  // Themes
  themes = {
    blue: { light: '#60a5fa', default: '#3b82f6', dark: '#1d4ed8', glow: 'rgba(59, 130, 246, 0.15)' },
    emerald: { light: '#34d399', default: '#10b981', dark: '#047857', glow: 'rgba(16, 185, 129, 0.15)' },
    violet: { light: '#c084fc', default: '#8b5cf6', dark: '#6d28d9', glow: 'rgba(139, 92, 246, 0.15)' },
    rose: { light: '#f43f5e', default: '#e11d48', dark: '#be123c', glow: 'rgba(225, 29, 72, 0.15)' }
  };
  themeOptions: Array<'blue' | 'emerald' | 'violet' | 'rose'> = ['blue', 'emerald', 'violet', 'rose'];

  // Expose service signals
  portfolio = this.portfolioService.portfolio;
  loading = this.portfolioService.loading;
  error = this.portfolioService.error;

  // Computed filters
  filteredSkills = computed(() => {
    const data = this.portfolio();
    if (!data) return [];
    const search = this.skillSearch().toLowerCase();
    const catKey = this.activeSkillCat();
    const catValue = this.resolveSkillCategory(catKey);
    return data.skills.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(search) ||
        s.usage.toLowerCase().includes(search);
      const matchesCategory = !catValue || s.category === catValue;
      return matchesSearch && matchesCategory;
    });
  });

  availableTechnologies = computed(() => {
    const data = this.portfolio();
    if (!data) return [];
    const techs = new Set<string>();
    data.projects.forEach(p => {
      p.tech.forEach(t => techs.add(t));
    });
    return Array.from(techs).sort();
  });

  filteredAvailableTechnologies = computed(() => {
    const list = this.availableTechnologies();
    const query = this.techSearchQuery().toLowerCase().trim();
    if (!query) return list;
    return list.filter(t => t.toLowerCase().includes(query));
  });

  filteredProjects = computed(() => {
    const data = this.portfolio();
    if (!data) return [];
    const search = this.projectSearch().toLowerCase();
    const catKey = this.activeProjCat();
    const selectedTechList = this.selectedTechs();
    const tab = this.activeTab();
    return data.projects.filter(p => {
      let matchesTab = false;
      if (selectedTechList.length > 0 || catKey === 'Tools' || tab === 'todos') {
        matchesTab = true;
      } else {
        if (tab === 'destacados') {
          matchesTab = p.featured === true;
        } else if (tab === 'laborales') {
          matchesTab = p.type === 'laboral';
        } else if (tab === 'universitarios') {
          matchesTab = p.type === 'universitario';
        }
      }

      const matchesSearch = p.title.toLowerCase().includes(search) ||
        p.tech.some(t => t.toLowerCase().includes(search));
      const matchesCategory = catKey === 'ALL' ||
        p.category.toLowerCase().includes(catKey.toLowerCase());
      const matchesTech = selectedTechList.length === 0 ||
        p.tech.some(t => selectedTechList.includes(t));
      return matchesTab && matchesSearch && matchesCategory && matchesTech;
    });
  });

  constructor() {
    effect(() => {
      const data = this.portfolio();
      if (data?.profile.subtitles?.length) {
        this.words = [...data.profile.subtitles];
        if (!this.currentText()) {
          this.currentWordIdx = 0;
          this.isDeleting = false;
        }
      }
    });

    effect(() => {
      const lang = this.languageService.currentLang();
      this.resetTerminalHistory();
      this.syncTypingWords();
      this.activeSkillCat.set('ALL');
      this.activeProjCat.set('ALL');
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    this.languageService.init();
    this.applyThemeColors('blue');
    this.resetTerminalHistory();
    this.handleTyping();

    this.portfolioService.portfolio; // trigger initial relation
  }

  switchLanguage(lang: AppLanguage): void {
    this.languageService.setLanguage(lang);
    this.syncTypingWords();
  }

  toggleTechDropdown(): void {
    this.techDropdownOpen.update(o => {
      const newVal = !o;
      if (!newVal) {
        this.techSearchQuery.set('');
      }
      return newVal;
    });
  }

  toggleTechFilter(tech: string): void {
    this.selectedTechs.update(current => {
      if (current.includes(tech)) {
        return current.filter(t => t !== tech);
      } else {
        return [...current, tech];
      }
    });
  }

  clearTechFilters(): void {
    this.selectedTechs.set([]);
    this.techSearchQuery.set('');
  }

  getSelectedTechsLabel(): string {
    const list = this.selectedTechs();
    if (list.length === 0) {
      return 'Filtrar por Tecnologías';
    }
    if (list.length <= 2) {
      return list.join(', ');
    }
    return `${list.length} Seleccionadas`;
  }

  toggleBackgroundTheme(): void {
    this.backgroundTheme.update(t => t === 'dark' ? 'slate-grey' : 'dark');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-tech')) {
      if (this.techDropdownOpen()) {
        this.techSearchQuery.set('');
      }
      this.techDropdownOpen.set(false);
    }
  }

  private resetTerminalHistory(): void {
    this.terminalHistory.set([
      { type: 'output', text: $localize`:@@terminal.init1:╔════════════════════════════════════════════════════════════╗` },
      { type: 'output', text: $localize`:@@terminal.init2:║     PORTFOLIO INTERACTIVE TERMINAL v3.0 - INITIALIZED      ║` },
      { type: 'output', text: $localize`:@@terminal.init3:╚════════════════════════════════════════════════════════════╝` },
      { type: 'output', text: $localize`:@@terminal.init4:Type "help" to see available commands` }
    ]);
  }

  private syncTypingWords(): void {
    const data = this.portfolio();
    this.words = data?.profile.subtitles?.length
      ? [...data.profile.subtitles]
      : [$localize`:@@nav.fullstackDev:Desarrollador Full-Stack` ];
    this.currentWordIdx = 0;
    this.currentText.set('');
    this.isDeleting = false;
  }

  private resolveSkillCategory(key: string): string | null {
    if (key === 'ALL') return null;
    const lang = this.languageService.currentLang();
    const map: Record<AppLanguage, Record<string, string>> = {
      es: { Backend: 'Backend', Frontend: 'Frontend', DB: 'Bases de Datos', Tools: 'Herramientas' },
      en: { Backend: 'Backend', Frontend: 'Frontend', DB: 'Databases', Tools: 'Tools' }
    };
    return map[lang][key] ?? key;
  }

  ngOnDestroy(): void {
    if (this.typingTimeoutId) clearTimeout(this.typingTimeoutId);
    if (this.matrixIntervalId) clearInterval(this.matrixIntervalId);
    if (this.confettiAnimationFrameId) cancelAnimationFrame(this.confettiAnimationFrameId);
  }

  applyThemeColors(themeName: string): void {
    const selectedTheme = this.themes[themeName as keyof typeof this.themes];
    if (!selectedTheme) return;
    Object.entries(selectedTheme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--accent-${key}`, value);
    });
    this.accentName.set(themeName as 'blue' | 'emerald' | 'violet' | 'rose');
  }

  copyToClipboard(text: string, field: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copiedField.set(field);
      setTimeout(() => this.copiedField.set(null), 2000);
    });
  }

  smoothScrollToTop(event?: Event): void {
    if (event) event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  retryLoad(): void {
    this.portfolioService.fetchPortfolioData();
  }

  exportToPDF(): void {
    // Implementation for PDF export
    window.print();
  }

  executeQuickCommand(cmd: string): void {
    this.terminalInput = cmd;
    const fakeEvent = new Event('submit') as any;
    this.handleTerminalSubmit(fakeEvent);
  }

  private handleTyping(): void {
    if (!this.words.length) {
      this.syncTypingWords();
    }
    if (!this.words.length) return;

    const fullWord = this.words[this.currentWordIdx];
    const currentLen = this.currentText().length;

    if (!this.isDeleting) {
      this.currentText.set(fullWord.substring(0, currentLen + 1));
      if (this.currentText() === fullWord) {
        this.isDeleting = true;
        this.typingSpeed = 2000;
      } else {
        this.typingSpeed = 100;
      }
    } else {
      this.currentText.set(fullWord.substring(0, currentLen - 1));
      if (this.currentText() === '') {
        this.isDeleting = false;
        this.currentWordIdx = (this.currentWordIdx + 1) % this.words.length;
        this.typingSpeed = 500;
      } else {
        this.typingSpeed = 40;
      }
    }

    this.typingTimeoutId = setTimeout(() => this.handleTyping(), this.typingSpeed);
  }

  toggleExp(index: number): void {
    this.expandedExps.update(prev => ({ ...prev, [index]: !prev[index] }));
  }

  getLevelPercentage(level: string): number {
    const normalized = level.toLowerCase();
    if (normalized.includes('excelente') || normalized.includes('excellent') || normalized.includes('sénior') || normalized.includes('senior')) return 95;
    if (normalized.includes('avanzado') || normalized.includes('advanced')) return 85;
    return 70;
  }

  handleTerminalSubmit(event: Event): void {
    event.preventDefault();
    const input = this.terminalInput.trim();
    if (!input) return;

    const lowerInput = input.toLowerCase();
    const newHistory = [...this.terminalHistory(), { type: 'input' as const, text: input }];
    this.terminalInput = '';

    if (this.sqlGameState() === 'waiting-choice') {
      this.handleSQLGameChoice(lowerInput, newHistory);
      return;
    }

    this.executeTerminalCommand(lowerInput, newHistory);
  }

  private handleSQLGameChoice(input: string, history: TerminalLine[]): void {
    if (input === '1') {
      history.push({ type: 'success', text: '✓ Excellent choice! Combined index + projected SELECT reduces I/O by 40%' });
      history.push({ type: 'output', text: 'Type "clear" to reset or "game" to play again' });
      this.sqlGameState.set('idle');
    } else if (input === '2') {
      history.push({ type: 'error', text: '✗ Incorrect. Trigger adds write overhead and doesn\'t solve the query scan' });
    } else if (input === '3') {
      history.push({ type: 'error', text: '✗ Incorrect. CONNECT BY is for hierarchical queries, not optimization' });
    } else {
      history.push({ type: 'error', text: 'Invalid choice. Type 1, 2, or 3' });
    }
    this.terminalHistory.set(history);
    this.scrollTerminal();
  }

  private executeTerminalCommand(command: string, history: TerminalLine[]): void {
    const data = this.portfolio();
    switch (command) {
      case 'help':
        history.push({ type: 'output', text: 'Available commands:' });
        history.push({ type: 'output', text: '  about    - Professional information' });
        history.push({ type: 'output', text: '  skills   - Technical skills list' });
        history.push({ type: 'output', text: '  projects - Featured projects' });
        history.push({ type: 'output', text: '  game     - SQL optimization mini-game' });
        history.push({ type: 'output', text: '  matrix   - Matrix code rain effect' });
        history.push({ type: 'output', text: '  clear    - Clear terminal history' });
        break;
      case 'about':
        if (data) {
          history.push({ type: 'output', text: `Name: ${data.profile.name}` });
          history.push({ type: 'output', text: `Role: ${this.currentText()}` });
          history.push({ type: 'output', text: `Location: ${data.profile.location}` });
          history.push({ type: 'output', text: `Email: ${data.profile.email}` });
        }
        break;
      case 'skills':
        if (data) {
          history.push({ type: 'success', text: 'Core Technologies:' });
          data.skills.slice(0, 5).forEach(s => {
            history.push({ type: 'output', text: `  • ${s.name} (${s.level})` });
          });
        }
        break;
      case 'projects':
        if (data) {
          history.push({ type: 'success', text: 'Featured Projects:' });
          data.projects.slice(0, 3).forEach(p => {
            history.push({ type: 'output', text: `  • ${p.title} - ${p.metrics}` });
          });
        }
        break;
      case 'clear':
        this.terminalHistory.set([]);
        return;
      case 'matrix':
        history.push({ type: 'success', text: 'Starting Matrix rain... Press ESC or click to exit' });
        this.terminalHistory.set(history);
        setTimeout(() => this.startMatrixRain(), 100);
        return;
      case 'game':
        this.sqlGameState.set('waiting-choice');
        history.push({ type: 'output', text: '═══════════════════════════════════════════════════════════' });
        history.push({ type: 'output', text: 'SQL OPTIMIZATION CHALLENGE' });
        history.push({ type: 'output', text: 'Slow query detected: SELECT * FROM orders o, customers c WHERE o.customer_id = c.id AND o.status = "pending"' });
        history.push({ type: 'output', text: 'Options:' });
        history.push({ type: 'output', text: '  1) Create composite index on orders(customer_id, status)' });
        history.push({ type: 'output', text: '  2) Create a materialized view' });
        history.push({ type: 'output', text: '  3) Use EXISTS instead of JOIN' });
        history.push({ type: 'output', text: 'Type your choice (1, 2, or 3):' });
        break;
      default:
        history.push({ type: 'error', text: `Unknown command: "${command}". Type "help" for options` });
    }
    this.terminalHistory.set(history);
    this.scrollTerminal();
  }

  private scrollTerminal(): void {
    setTimeout(() => {
      this.terminalEndRef?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }

  startMatrixRain(): void {
    this.matrixActive.set(true);
    setTimeout(() => {
      const canvas = this.matrixCanvasRef?.nativeElement;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
      const fontSize = 16;
      const columns = canvas.width / fontSize;
      const drops = Array(Math.floor(columns)).fill(1);

      const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0f0';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      };

      this.matrixIntervalId = setInterval(draw, 35);

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') this.stopMatrixRain();
      };
      window.addEventListener('keydown', handleEsc);
      (canvas as any)._escHandler = handleEsc;
    }, 50);
  }

  stopMatrixRain(): void {
    if (this.matrixIntervalId) {
      clearInterval(this.matrixIntervalId);
      this.matrixIntervalId = undefined;
    }
    const canvas = this.matrixCanvasRef?.nativeElement;
    if (canvas && (canvas as any)._escHandler) {
      window.removeEventListener('keydown', (canvas as any)._escHandler);
    }
    this.matrixActive.set(false);
  }

  handleFormSubmit(event: Event): void {
    event.preventDefault();
    this.formErrors = { name: '', email: '', message: '' };

    if (!this.formData.name.trim()) {
      this.formErrors.name = $localize`:@@contact.nameRequired:El nombre es requerido`;
      return;
    }
    if (!this.formData.email.trim()) {
      this.formErrors.email = $localize`:@@contact.emailRequired:El correo es requerido`;
      return;
    }
    if (!/\S+@\S+\.\S+/.test(this.formData.email)) {
      this.formErrors.email = $localize`:@@contact.emailInvalid:Formato de correo inválido`;
      return;
    }
    if (!this.formData.message.trim()) {
      this.formErrors.message = $localize`:@@contact.messageRequired:El mensaje es requerido`;
      return;
    }

    this.isSubmitting.set(true);

    this.portfolioService.sendContactMessage(
      this.formData.name,
      this.formData.email,
      this.formData.message
    ).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.formSubmitted.set(true);
        this.formData = { name: '', email: '', message: '' };
        setTimeout(() => this.triggerConfetti(), 100);
        setTimeout(() => this.formSubmitted.set(false), 5000);
      },
      error: (err) => {
        console.error('Error:', err);
        this.isSubmitting.set(false);
        alert($localize`:@@contact.sendError:Error al enviar el mensaje. Inténtelo de nuevo.`);
      }
    });
  }

  private triggerConfetti(): void {
    const canvas = this.confettiCanvasRef?.nativeElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#e11d48', '#f59e0b'];
    const particles = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 5 + 3,
      d: Math.random() * canvas.height,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 5,
      tiltAngle: 0,
      tiltAngleIncremental: Math.random() * 0.07 + 0.02
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(p.tiltAngle);
        p.tilt = Math.sin(p.tiltAngle - i / 3) * 15;

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();
      });

      if (particles.some(p => p.y < canvas.height)) {
        this.confettiAnimationFrameId = requestAnimationFrame(draw);
      }
    };

    draw();
    setTimeout(() => {
      if (this.confettiAnimationFrameId) {
        cancelAnimationFrame(this.confettiAnimationFrameId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }, 3000);
  }
}
