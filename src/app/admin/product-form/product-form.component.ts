import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Database, ref, set, get, remove } from '@angular/fire/database';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  product: any = {};
  id: string | null;
  private db = inject(Database);

  constructor(private router: Router, private route: ActivatedRoute) {
    // 1. Grab the ID from the URL (/admin/products/123)
    this.id = this.route.snapshot.paramMap.get('id');

    // 2. If ID exists, we are in EDIT mode. Fetch the product from Firebase.
    if (this.id) {
      get(ref(this.db, `products/${this.id}`)).then(snapshot => {
        if (snapshot.exists()) {
          this.product = snapshot.val();
        }
      });
    }
  }

  save(product: any) {
    // If we have an ID, update the existing node. If not, create a new one.
    const productPath = this.id ? `products/${this.id}` : `products/${new Date().getTime()}`;
    const productRef = ref(this.db, productPath);

    set(productRef, product).then(() => {
      this.router.navigate(['/admin/products']);
    });
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    if (this.id) {
      remove(ref(this.db, `products/${this.id}`)).then(() => {
        this.router.navigate(['/admin/products']);
      });
    }
  }
}