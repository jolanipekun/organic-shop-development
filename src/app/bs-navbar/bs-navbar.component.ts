import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-bs-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, AsyncPipe],
  templateUrl: './bs-navbar.component.html',
  styleUrl: './bs-navbar.component.css'
})
export class BsNavbarComponent {
  public authService = inject(AuthService);
  private cartService = inject(ShoppingCartService);

  user$ = this.authService.user$;

  // Now the Navbar just watches the stream from the service
  cartCount$ = this.cartService.cartCount$;

  logout() {
    this.authService.logout();
  }
}