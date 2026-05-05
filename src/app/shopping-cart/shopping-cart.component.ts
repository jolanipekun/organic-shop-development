import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Required for routerLink
import { ShoppingCartService } from '../shopping-cart.service';
import { Database, ref, get } from '@angular/fire/database';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, RouterModule], // Imported RouterModule
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  private cartService = inject(ShoppingCartService);
  private db = inject(Database);

  items: any[] = [];
  totalItemsCount: number = 0;
  totalPrice: number = 0;

  async ngOnInit() {
    await this.loadCart();
  }

  async loadCart() {
    const cartObj = await this.cartService.getCart();
    const itemsRef = ref(this.db, `shopping-carts/${cartObj.key}/items`);
    const snapshot = await get(itemsRef);
    const data = snapshot.val();

    this.items = [];
    if (data) {
      Object.keys(data).forEach(id => {
        // Firebase snapshot -> Component Array
        this.items.push({ key: id, ...data[id] });
      });
    }
    this.calculateTotals();
  }

  async addToCart(product: any) {
    // Note: service.addToCart takes product, not item
    await this.cartService.addToCart(product);
    await this.loadCart(); // Manual reload
  }

  async removeFromCart(product: any) {
    // Note: service.removeFromCart takes product, not item
    await this.cartService.removeFromCart(product);
    await this.loadCart(); // Manual reload
  }

  async clearCart() {
    await this.cartService.clearCart();
    this.items = [];
    this.calculateTotals();
  }

  private calculateTotals() {
    this.totalItemsCount = this.items.reduce((acc, item) => acc + item.quantity, 0);
    this.totalPrice = this.items.reduce((acc, item) => acc + (item.quantity * item.product.price), 0);
  }
}