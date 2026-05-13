import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Database, ref, listVal } from '@angular/fire/database';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-products.component.html'
})
export class AdminProductsComponent implements OnDestroy {
  products: any[] = [];
  filteredProducts: any[] = [];
  subscription: Subscription;
  private db = inject(Database);

  constructor() {
    // Fetch products and store in two arrays
    this.subscription = listVal(ref(this.db, 'products'), { keyField: 'key' })
      .subscribe(products => this.filteredProducts = this.products = products);
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}