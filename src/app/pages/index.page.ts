import { ChangeDetectionStrategy, Component, ElementRef, OnInit, inject, signal, viewChild } from '@angular/core';
import { AppBarComponent } from '../components/app-bar.component';
import { HeroComponent } from '../components/hero.component';
import { AboutComponent } from '../components/about.component';
import { injectLoad } from '@analogjs/router';
import { load } from './index.server';
import { InstagramPost } from '../../models/instagram.model';
import { HttpClient } from '@angular/common/http';
import { NgClass, DecimalPipe } from '@angular/common';

@Component({
  selector: 'ff-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AppBarComponent,
    HeroComponent,
    AboutComponent,
    NgClass,
    DecimalPipe
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
            <a
              [href]="'https://www.instagram.com/p/' + item.code + '/'"
              target="_blank"
              rel="noopener noreferrer"
              [style.backgroundImage]="'url(' + item.thumbnail_url + ')'"
              class="__instagram-post"
              [ngClass]="{'__loaded': true}">
              <div class="__instagram-overlay">
                <div class="__instagram-likes">
                  <span class="__instagram-likes-icon">♥</span>
                  <span class="__instagram-likes-count">{{ item.like_count | number }}</span>
                </div>
              </div>
            </a>
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
      
      @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
      }
      
      @media (max-width: 480px) {
        grid-template-columns: 1fr;
      }
    }

    .__instagram-post {
      display: block;
      width: 100%;
      aspect-ratio: 1/1;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      transition: opacity 0.3s ease-in-out;
      position: relative;
      overflow: hidden;
      text-decoration: none;
      color: white;
      border-radius: 4px;
      
      &:hover {
        .__instagram-overlay {
          opacity: 1;
        }
      }
      
      @media (max-width: 480px) {
        .__instagram-overlay {
          opacity: 1;
        }
      }
    }
    
    .__instagram-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .__instagram-likes {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 600;
    }
    
    .__instagram-likes-icon {
      margin-right: 6px;
      color: #ff4d67;
    }
    
    .__instagram-likes-count {
      color: white;
    }

    .__ghost {
      background-color: #191919;
      position: relative;
      overflow: hidden;
      border-radius: 4px;
    }

    .__ghost::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        rgba(255, 255, 255, 0.03) 0%, 
        rgba(255, 255, 255, 0.06) 50%, 
        rgba(255, 255, 255, 0.03) 100%);
      background-size: 200% 100%;
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0% {
        background-position: 100% 0;
      }
      100% {
        background-position: -100% 0;
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

  // Initial data from SSR (will be empty with our implementation)
  private loadData = injectLoad<typeof load>();
  initialData = signal<InstagramPost[]>([]);

  // Client-side state
  http = inject(HttpClient);
  posts = signal<InstagramPost[]>([]);
  isLoading = signal(true);

  scrollToAbout() {
    this.aboutRef()?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnInit() {
    // Set any initial data if available (though it will be empty with our implementation)
    if (this.loadData && Array.isArray(this.loadData)) {
      this.posts.set(this.loadData);
      this.isLoading.set(false);
      return;
    }

    // Fetch from API - use default endpoint for local development
    const apiUrl = '/api/instagram';

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
