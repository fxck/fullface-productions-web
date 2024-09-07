import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PersonComponent } from './person.component';

@Component({
  selector: 'ff-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PersonComponent
  ],
  template: `
    <div class="__content">
      <h2 class="__title">
        Ready to work in places and conditions far beyond the comfort limit,
        with a complete in-house production capable of everything from the idea,
        through filming, to post-production.
      </h2>

      <p class="__desc">
        What started as a passion evolved into collaborations with over <strong>80 clients</strong> across <strong>15 years</strong> and <strong>5 continents</strong>, serving everyone from small <strong>family-owned companies</strong> to <strong>national television networks</strong> and <strong>global corporations</strong>.
      </p>

      <div class="__team">
        @for (item of team; track $index) {
          <ff-person
            [image]="item.photo"
            [name]="item.name"
            [position]="item.position"
            [mail]="item.mail"
            [phone]="item.phone"
            [instagram]="item.instagram"
          />
        }
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      padding: calc(var(--bu) * 6) 0;

      background: #000;
      color: #fff;
    }

    .__content {
      max-width: 840px;
      padding: 0 var(--bu);
      margin: 0 auto;

      text-align: center;
    }

    .__title {
      font-size: 32px;
      line-height: 1.75em;
    }

    .__desc {
      font-size: 20px;
      line-height: 2em;

      opacity: 0.8;
    }

    .__team {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: var(--bu);
      padding-top: calc(var(--but) * 3);
    }
  `
})
export class AboutComponent {
  team = [
    {
      name: 'Štěpán Romanov',
      position: 'Producer',
      phone: '+420 721 126 903',
      mail: 'stepan@fullfaceproductions.com',
      instagram: 'stepanrmnv',
      photo: '/stepan.jpg'
    },
    {
      name: 'Martin Vrbický',
      position: 'DOP, Director',
      phone: '+420 724 165 714',
      mail: 'martin@fullfaceproductions.com',
      instagram: 'martin.vrbicky',
      photo: '/martin.jpg'
    }
  ];
}
