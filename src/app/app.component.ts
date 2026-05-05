import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BsNavbarComponent], // This allows the HTML to use <app-bs-navbar>
  template: `
    <app-bs-navbar></app-bs-navbar>
    <div class="container mt-5">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  title = 'oshop';
}