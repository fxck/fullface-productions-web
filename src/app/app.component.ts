import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'ff-app',
  standalone: true,
  imports: [ RouterOutlet ],
  template: `<router-outlet />`,
})
export class AppComponent {}
