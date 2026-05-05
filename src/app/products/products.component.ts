import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for the 'async' pipe
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products$: Observable<any[]>;
  private cartService = inject(ShoppingCartService);

  constructor() {
    const productService = inject(ProductService);
    this.products$ = productService.getAll();
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }


  removeFromCart(product: any) {
    this.cartService.removeFromCart(product);
  }
}