import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'ff-video-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-50px)', opacity: 0 }),
        animate('300ms', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ transform: 'translateY(-50px)', opacity: 0 }))
      ])
    ])
  ],
  template: `
    @if (open()) {
      <div class="__overlay" [@fadeInOut]>
        <div class="__content" [@slideInOut]>
          <button class="__close-button" (click)="close.emit()">x</button>
          <iframe
            class="__iframe"
            [src]="safeVideoUrl()"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    }
  `,
  styles: `
    .__overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(10px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .__content {
      background: #000;
      position: relative;
      border-radius: 5px;
    }

    .__iframe {
      display: block;
      width: 80vw;
      height: calc(80vw * (9 / 16));
      max-width: calc(90vh * (16 / 9));
      max-height: 90vh;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      border-radius: 5px;
    }

    .__close-button {
      position: absolute;
      top: -10px;
      right: -10px;
      background-color: #fff;
      border: none;
      font-size: 24px;
      cursor: pointer;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      font-weight: 700;
      line-height: 30px;
      text-align: center;
    }
  `
})
export class VideoModalComponent {
  sanitizer = inject(DomSanitizer);
  open = input<boolean>();
  videoId = input<string>();
  safeVideoUrl = computed(() => {
    if (!this.videoId()) { return undefined; }
    const embedUrl = `https://www.youtube.com/embed/${this.videoId()}?autoplay=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  });
  close = output();
}
