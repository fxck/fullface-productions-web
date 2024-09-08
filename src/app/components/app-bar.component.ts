import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ff-app-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img class="__logo" src="/logo.svg" />
  `,
  styles: `
    :host {
      --logo-size: 150px;

      position: absolute;
      top: var(--bu);
      left: 0;
      z-index: 10;

      width: 100%;
      display: block;
    }

    .__logo {
      display: block;
      width: var(--logo-size);
      margin: 0 auto;
    }
  `
})
export class AppBarComponent {

}
