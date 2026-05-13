import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';
import { Database, ref, push } from '@angular/fire/database';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  // Use 'any[]' for now, but usually, you'd use a ShoppingCart interface
  @ViewChild('f') shippingForm!: NgForm;
  private db = inject(Database);
  cartItems: any[] = [];
  totalPrice = 0;
  totalCount = 0;

  private subscription!: Subscription;
  private cartService = inject(ShoppingCartService);
  private router = inject(Router);

  async ngOnInit() {
    // 1. Get the Observable from the service
    const cartObservable = await this.cartService.getCart();

    // 2. Subscribe and calculate totals whenever the cart changes
    this.subscription = cartObservable.subscribe(items => {
      this.cartItems = items || [];
      this.calculateTotals();
    });
  }

  private calculateTotals() {
    let price = 0;
    let count = 0;

    this.cartItems.forEach(item => {
      price += (item.product.price * item.quantity);
      count += item.quantity;
    });

    this.totalPrice = price;
    this.totalCount = count;
  }

  async placeOrder() {
    const order = {
      userId: 'current-user-id', // You can get this from your Auth service
      datePlaced: new Date().getTime(),
      shipping: this.shippingForm.value,
      items: this.cartItems
    };

    // 1. Save the order to Firebase
    const ordersRef = ref(this.db, 'orders');
    await push(ordersRef, order);

    // 2. ONLY NOW clear the cart
    await this.cartService.clearCart();

    // 3. Navigate
    this.router.navigate(['/order-success']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}