import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { VideoModalComponent } from './video-modal.component';

@Component({
  selector: 'ff-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    VideoModalComponent
  ],
  template: `
    <div class="__hero">

      <div class="__bg-video">
        <video
          autoplay
          loop
          muted
          playsinline
          preload="auto"
          class="__bg-video_element">
          <source src="/bg_video.mp4" type="video/mp4">
        </video>
      </div>

      <div class="__work">
        <div
          class="__work_content"
          [class.has-active-item]="!!activeItem()">
          @for (item of clients(); track $index; let last = $last) {
            <div class="__work_item">

              <button
                (mouseenter)="activeItem.set(item.name)"
                (mouseleave)="activeItem.set(undefined)"
                (click)="activeVideo.set(item.videoId)"
                [class.is-active]="activeItem() === item.name"
                class="__work_button">
                {{ item.name }}
              </button>

              @if (item.separator) {
                <span class="__work_sep">/</span>
              }

            </div>
          }
        </div>
      </div>

      <div class="__hero-footer">

        <a
          class="__hero-footer_link __instagram"
          target="_blank"
          href="https://www.instagram.com/fullfaceproductions/">
          <span class="__inner-text">Instagram</span>
        </a>

        <span class="__hero-footer_sep __sep-1">—</span>

        <a
          class="__hero-footer_link __email"
          target="_blank"
          href="mailto:info@fullfaceproductions.com">
          <span class="__inner-text">info&#64;fullfaceproductions.com</span>
        </a>

        <span class="__hero-footer_sep __sep-2">—</span>

        <button class="__hero-footer_link __about" (click)="aboutClick.emit()">
          <span class="__inner-text">About</span>
        </button>

      </div>

    </div>

    <ff-video-modal
      [open]="!!activeVideo()"
      [videoId]="activeVideo()"
      (close)="activeVideo.set(undefined)"
    />

  `,
  styles: `
    :host {
      --hero-color: #fff;
      --bg-video-overlay-opacity: 0.45;
    }

    .__hero {
      position: absolute;
      top: 0;
      left: 0;

      display: block;
      width: 100%;
      height: 100%;
    }

    .__hero-footer {
      position: absolute;
      bottom: calc(var(--bu) * 1.25);
      left: 0;
      z-index: 3;

      display: block;
      width: 100%;

      font-size: var(--bu);
      font-weight: 700;
      text-align: center;

      color: var(--hero-color);
    }

      .__hero-footer_link {
        display: inline-block;
        vertical-align: middle;
        text-decoration: none;
        padding: 0;
        margin: 0;

        background: none;
        border: none;
        color: var(--hero-color);

        font-weight: inherit;
        cursor: pointer;
        
        .__inner-text {
          border-bottom: 2px solid transparent;
          transition: border 200ms;
        }
        
        &:hover {
          .__inner-text {
            border-bottom-color: var(--hero-color);
          }
        }
      }

      .__hero-footer_sep {
        display: inline-block;
        vertical-align: middle;
        padding: 0 calc(var(--bu) / 2);

        opacity: 0.5;
      }

    .__work {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;

      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      line-height: 1.5;

      color: var(--hero-color);

      font-size: var(--work-size);
      font-weight: 700;
    }

      .__work_content {
        display: block;
        width: 880px;
        margin: 0 auto;
        text-align: center;
        padding: 0 var(--bu);
        margin-bottom: var(--bu);
        overflow-wrap: break-word;

        &.has-active-item {
          .__work_button {
            opacity: 0.3;
          }
        }
        
        @media (max-width: 900px) {
          width: 760px;
        }
        
        @media (max-width: 800px) {
          width: 680px;
        }
        
        @media (max-width: 700px) {
          width: 580px;
        }
        
        @media (max-width: 600px) {
          width: 480px;
        }
        
        @media (max-width: 500px) {
          width: 400px;
        }
        
        @media (max-width: 420px) {
          width: 320px;
        }
      }

      .__work_item {
        display: inline-block;
        vertical-align: middle;
        line-height: 1.5;
      }

      .__work_button {
        display: inline-block;
        vertical-align: middle;
        margin: 0;
        padding: 0;
        line-height: 1.5;

        background: none;
        border: none;
        color: inherit;
        font-weight: inherit;
        text-transform: uppercase;

        cursor: pointer;
        transition: opacity 500ms 50ms;

        &.is-active {
          transition-delay: 0;
          opacity: 1 !important;
        }
        
        @media (max-width: 900px) {
          font-size: 48px;
        }
        
        @media (max-width: 800px) {
          font-size: 42px;
        }
        
        @media (max-width: 700px) {
          font-size: 36px;
        }
        
        @media (max-width: 600px) {
          font-size: 30px;
        }
        
        @media (max-width: 500px) {
          font-size: 25px;
        }
        
        @media (max-width: 420px) {
          font-size: 20px;
        }
      }

      .__work_sep {
        display: inline-block;
        vertical-align: middle;
        line-height: 1.5;
        padding: 0 var(--bu);
        opacity: 0.15;
        
        @media (max-width: 900px) {
          padding: 0 calc(var(--bu) * 0.9);
        }
        
        @media (max-width: 800px) {
          padding: 0 calc(var(--bu) * 0.8);
        }
        
        @media (max-width: 700px) {
          padding: 0 calc(var(--bu) * 0.7);
        }
        
        @media (max-width: 600px) {
          padding: 0 calc(var(--bu) * 0.6);
        }
        
        @media (max-width: 500px) {
          padding: 0 calc(var(--bu) * 0.5);
        }
        
        @media (max-width: 420px) {
          padding: 0 calc(var(--bu) * 0.4);
        }
      }
      

    .__bg-video {
      position: absolute;
      top: 0;
      left: 0;

      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;

      &::after {
        content: '';

        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;

        display: block;
        width: 100%;
        height: 100%;

        background: #000;
        opacity: var(--bg-video-overlay-opacity);
      }
    }

      .__bg-video_element {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
    @media (max-width: 768px) and (min-width: 531px) {
      .__hero-footer {
        bottom: calc(var(--bu) * 2);
        font-size: calc(var(--bu) * 0.85);
      }
    }
    
    @media (max-width: 530px) {
      .__hero-footer {
        bottom: calc(var(--bu) * 2);
        display: flex;
        flex-direction: column;
        gap: calc(var(--bu) * 0.5);
      }
      
      .__hero-footer_sep {
        display: none;
      }
      
      /* Reordering for mobile */
      .__hero-footer_link.__about {
        order: 1;
      }
      
      .__hero-footer_link.__instagram {
        order: 2;
      }
      
      .__hero-footer_link.__email {
        order: 3;
      }
    }
  `
})
export class HeroComponent {
  clients = input<{
    name: string;
    videoUrl: string;
    videoId: string;
    separator: boolean;
  }[]>();
  activeItem = signal<string | undefined>(undefined);
  aboutClick = output();
  activeVideo = signal<string | undefined>(undefined);
}
