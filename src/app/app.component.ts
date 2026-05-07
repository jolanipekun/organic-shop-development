import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { AuthService } from './auth.service'; // Adjust path as needed

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BsNavbarComponent],
  template: `
    <app-bs-navbar></app-bs-navbar>
    <div class="container mt-5">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  constructor() {
    // Listen for the user state
    this.auth.user$.subscribe(user => {
      if (user) {
        // Check if we have a saved returnUrl from before the login
        let returnUrl = localStorage.getItem('returnUrl');

        if (returnUrl) {
          localStorage.removeItem('returnUrl'); // Clean up so it doesn't happen again
          this.router.navigateByUrl(returnUrl);
        }
      }
    });
  }
}