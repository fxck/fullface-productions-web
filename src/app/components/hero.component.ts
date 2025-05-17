import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { VideoModalComponent } from './video-modal.component';

@Component({
  selector: 'ff-hero',
  standalone: true,
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
          class="__hero-footer_link"
          target="_blank"
          href="https://www.instagram.com/fullfaceproductions/">
          Instagram
        </a>

        <span class="__hero-footer_sep">—</span>

        <a
          class="__hero-footer_link"
          target="_blank"
          href="mailto:info@fullfaceproductions.com">
          info&#64;fullfaceproductions.com
      </a>

        <span class="__hero-footer_sep">—</span>

        <button class="__hero-footer_link" (click)="aboutClick.emit()">About</button>

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
      --work-size: 55px;
      --work-content-width: 880px;
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
        border-bottom: 2px solid transparent;
        color: var(--hero-color);

        font-weight: inherit;

        cursor: pointer;
        transition: border 200ms;

        &:hover {
          border-bottom-color: var(--hero-color);
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
      line-height: calc(var(--work-size) * 1.75);

      color: var(--hero-color);

      font-size: var(--work-size);
      font-weight: 700;
    }

      .__work_content {
        display: block;
        max-width: var(--work-content-width);
        margin-right: -40px;
        margin-bottom: -20px;
        padding: 0 var(--bu);

        text-align: center;

        &.has-active-item {
          .__work_button {
            opacity: 0.3;
          }
        }
      }

      .__work_item {
        display: inline-block;
        vertical-align: top;
      }

      .__work_button {
        display: inline-block;
        vertical-align: top;
        margin: 0;
        padding: 0;
        line-height: inherit;

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
      }

      .__work_sep {
        display: inline-block;
        vertical-align: top;
        line-height: inherit;
        padding: 0 var(--bu);

        opacity: 0.15;
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
