import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // 1. Make sure Router is imported
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service'; // 2. ProductService is already imported
import { ShoppingCartService } from '../../shopping-cart.service';
import { Observable } from 'rxjs';

interface Category {
  key: string;
  name: string;
}

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  categories$: Observable<Category[]>;

  private productService = inject(ProductService);
  private router = inject(Router);
  private cartService = inject(ShoppingCartService);

  constructor() {
    const categoryService = inject(CategoryService);
    this.categories$ = categoryService.getAll() as Observable<Category[]>;
  }

  save(product: any) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}