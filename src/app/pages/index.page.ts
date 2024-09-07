import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import { AppBarComponent } from '../components/app-bar.component';
import { HeroComponent } from '../components/hero.component';
import { AboutComponent } from '../components/about.component';

@Component({
  selector: 'ff-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AppBarComponent,
    HeroComponent,
    AboutComponent
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
  `
})
export default class HomeComponent {
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
      videoUrl: '',
      videoId: '',
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

  scrollToAbout() {
    this.aboutRef()?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
  }
}
