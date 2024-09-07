import { Component, input } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'ff-person',
  standalone: true,
  template: `
    <div
      class="__bg"
      [style.backgroundImage]="'url(' + image() + ')'">
    </div>

    <div class="__info">

      <h3 class="__name">{{ name() }}</h3>
      <h4 class="__position">{{ position() }}</h4>

      <div>
        <a [href]="'https://instagram.com/' + instagram()" target="__blank" class="__button">&#64;{{ instagram() }}</a>
      </div>

      <div>
        <span class="__button">{{ phone() }}</span>
      </div>

      <div>
        <a [href]="mail()" target="__blank" class="__button">{{ mail() }}</a>
      </div>

    </div>
  `,
  styles: `
    :host {
      position: relative;

      display: block;
      min-height: 460px;
      color: #fff;

      &:hover {
        .__button {
          opacity: 1;
        }
      }
    }

    .__name {
      line-height: 2em;
    }

    .__button {
      padding: 0;
      margin: 0;
      display: block;
      line-height: 1.5em;

      opacity: 0;
      color: #fff;
      background: transparent;
      border: none;

      text-decoration: none;

      transition: opacity 250ms;

      &[href] {
        &:hover {
          opacity: 0.5 !important;
        }
      }
    }

    .__bg,
    .__info {
      position: absolute;
    }

    .__bg {
      top: 0;
      left: 0;

      display: block;
      width: 100%;
      height: 100%;
      background-position: bottom center;
      background-size: cover;
      background-repeat: no-repeat;
    }

    .__info {
      left: 0;
      bottom: 0;
      z-index: 1;

      display: block;
      width: 100%;
    }

    .__name,
    .__position {
      padding-left: 16px;
      margin: 0;
    }

    .__position {
      font-size: 14px;
      font-weight: 800;
      text-transform: uppercase;
      opacity: 0.3;
      padding-bottom: calc(var(--bu) / 2);
    }
  `
})
export class PersonComponent {
  image = input<string>();
  mail = input<string>();
  position = input<string>();
  instagram = input<string>();
  name = input<string>();
  phone = input<string>();
}
