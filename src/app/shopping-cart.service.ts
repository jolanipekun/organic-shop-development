import { Injectable, inject } from '@angular/core';
import { Database, ref, set, get, push, remove, listVal } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private db = inject(Database);
  private cartCountSource = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSource.asObservable();

  constructor() {
    this.refreshCount();
  }

  private getOrCreateCartId(): string {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    const newCartRef = push(ref(this.db, 'shopping-carts'), {
      dateCreated: new Date().getTime()
    });
    const newId = newCartRef.key as string;
    localStorage.setItem('cartId', newId);
    return newId;
  }

  async getCart(): Promise<Observable<any[]>> {
    const cartId = this.getOrCreateCartId();
    return listVal(ref(this.db, `shopping-carts/${cartId}/items`));
  }

  async refreshCount() {
    const cartId = this.getOrCreateCartId();
    const itemsRef = ref(this.db, `shopping-carts/${cartId}/items`);
    const snapshot = await get(itemsRef);
    const items = snapshot.val();
    let total = 0;
    if (items) {
      Object.keys(items).forEach(id => total += (items[id].quantity || 0));
    }
    this.cartCountSource.next(total);
  }

  async addToCart(product: any) { await this.updateItem(product, 1); }
  async removeFromCart(product: any) { await this.updateItem(product, -1); }

  private async updateItem(product: any, change: number) {
    const cartId = this.getOrCreateCartId();
    const productId = String(product.key || product.id || product.$key);
    const itemRef = ref(this.db, `shopping-carts/${cartId}/items/${productId}`);

    try {
      const snapshot = await get(itemRef);
      const data = snapshot.val();
      const newQuantity = (data?.quantity || 0) + change;

      if (newQuantity <= 0) {
        await remove(itemRef);
      } else {
        await set(itemRef, {
          product: {
            title: product.title || '',
            price: product.price || 0,
            imageUrl: product.imageUrl || ''
          },
          quantity: newQuantity
        });
      }
      await this.refreshCount();
    } catch (err) {
      console.error("Update failed", err);
    }
  }

  async clearCart() {
    const cartId = this.getOrCreateCartId();
    await remove(ref(this.db, `shopping-carts/${cartId}/items`));
    this.cartCountSource.next(0);
  }
}