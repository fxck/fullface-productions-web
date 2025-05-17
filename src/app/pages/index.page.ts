import { ChangeDetectionStrategy, Component, ElementRef, OnInit, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppBarComponent } from '../components/app-bar.component';
import { HeroComponent } from '../components/hero.component';
import { AboutComponent } from '../components/about.component';
import { injectLoad } from '@analogjs/router';
import { load } from './index.server';
import { InstagramPost } from '../../models/instagram.model';
import { HttpClient } from '@angular/common/http';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ff-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AppBarComponent,
    HeroComponent,
    AboutComponent,
    NgClass
  ],
  template: `
    <ff-app-bar />

    <div class="__hero">
      <ff-hero
        [clients]="clients"
        (aboutClick)="scrollToAbout()"
      />
    </div>

    <div class="__about" #aboutRef>

      <ff-about />

      <div class="__instagram-grid">
        @if (isLoading()) {
          @for (i of [1, 2, 3, 4, 5, 6, 7, 8, 9]; track i) {
            <div class="__instagram-post __ghost"></div>
          }
        } @else {
          @for (item of posts(); track item.id) {
            <div
              [style.backgroundImage]="'url(' + item.thumbnail_url + ')'"
              class="__instagram-post"
              [ngClass]="{'__loaded': true}">
            </div>
          }
        }
      </div>

    </div>
  `,
  styles: `
    :host {
      --hero-min-height: 700px;
    }

    .__hero {
      position: relative;

      height: 100vh;
      min-height: var(--hero-min-height);
    }

    .__instagram-grid {
      max-width: 1000px;
      padding: var(--bu);
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: var(--bu);
    }

    .__instagram-post {
      width: 100%;
      aspect-ratio: 1/1;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      transition: opacity 0.3s ease-in-out;
    }

    .__ghost {
      background-color: rgba(200, 200, 200, 0.2);
      position: relative;
      overflow: hidden;
    }

    .__ghost::after {
      content: '';
      display: block;
      position: absolute;
      left: -150px;
      top: 0;
      height: 100%;
      width: 150px;
      background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
      animation: shimmer 1.5s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
    }

    @keyframes shimmer {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(calc(100% + 150px));
      }
    }

    .__loaded {
      opacity: 1;
    }
  `
})
export default class HomeComponent implements OnInit {
  clients = [
    {
      name: 'Specialized',
      videoUrl: 'https://youtu.be/kqOkz6tBIyk',
      videoId: 'kqOkz6tBIyk',
      separator: true
    },
    {
      name: 'Hannah',
      videoUrl: 'https://youtu.be/gEts4A_vYB0',
      videoId: 'gEts4A_vYB0',
      separator: false
    },
    {
      name: 'Lipno',
      videoUrl: 'https://youtu.be/NuEdQ9fn8QM',
      videoId: 'NuEdQ9fn8QM',
      separator: true
    },
    {
      name: "Horská služba",
      videoUrl: 'https://youtu.be/zFciERbYG2g',
      videoId: 'zFciERbYG2g',
      separator: false
    },
    {
      name: "Trek",
      videoUrl: 'https://youtu.be/88ABaXBQZB8',
      videoId: '88ABaXBQZB8',
      separator: true
    },
    {
      name: "Sony",
      videoUrl: 'https://youtu.be/pTJsbODp1aE',
      videoId: 'pTJsbODp1aE',
      separator: true
    },
    {
      name: "Živý kraj",
      videoUrl: 'https://youtu.be/O-VpSzHxv38',
      videoId: 'O-VpSzHxv38',
      separator: false
    },

    {
      name: "Rose Bikes",
      videoUrl: 'https://youtu.be/CQHGNZ5XwQM',
      videoId: 'CQHGNZ5XwQM',
      separator: true
    },
    {
      name: "Marosana",
      videoUrl: 'https://youtu.be/tEl3iTzP_nY',
      videoId: 'tEl3iTzP_nY',
      separator: false
    },
  ];

  activeItem = signal<string | undefined>(undefined);

  aboutRef = viewChild<ElementRef<HTMLElement>>('aboutRef');

  // Initial data from SSR (could be empty)
  initialData = toSignal<InstagramPost[]>(injectLoad<typeof load>(), { initialValue: [] });
  
  // Client-side state
  http = inject(HttpClient);
  posts = signal<InstagramPost[]>([]);
  isLoading = signal(true);

  scrollToAbout() {
    this.aboutRef()?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
  }
  
  ngOnInit() {
    // Use initial data if available (though it will be empty in this implementation)
    if (this.initialData().length > 0) {
      this.posts.set(this.initialData());
      this.isLoading.set(false);
      return;
    }
    
    // Fetch from API - use environment variable if available, otherwise default to local endpoint
    const apiUrl = import.meta.env.MY_SERVER_SCRAPER_ENDPOINT || '/api/instagram';
    
    this.http.get<InstagramPost[]>(apiUrl).subscribe({
      next: (data) => {
        this.posts.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load Instagram posts:', err);
        this.isLoading.set(false);
      }
    });
  }

}
