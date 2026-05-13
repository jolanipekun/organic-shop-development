import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cartItems: any[] = [];
  totalPrice: number = 0;
  totalItemsCount: number = 0;
  subscription!: Subscription;
  private cartService = inject(ShoppingCartService);

  async ngOnInit() {
    const cartObservable = await this.cartService.getCart();
    this.subscription = cartObservable.subscribe(items => {
      this.cartItems = items || [];
      this.calculateTotals();
    });
  }

  private calculateTotals() {
    this.totalPrice = 0;
    this.totalItemsCount = 0;
    this.cartItems.forEach(item => {
      this.totalPrice += (item.product.price * item.quantity);
      this.totalItemsCount += item.quantity;
    });
  }

  clearCart() {
    this.cartService.clearCart();
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}