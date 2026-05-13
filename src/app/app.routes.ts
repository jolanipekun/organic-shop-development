import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';

import { LoginComponent } from './login/login.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { authGuard } from './auth.guard';

import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderSuccessComponent } from './order-success/order-success.component';

import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';


export const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'admin/products/new', component: ProductFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  // Protected Routes - only logged-in users can see these
  { path: 'check-out', component: CheckOutComponent, canActivate: [authGuard] },
  { path: 'my/orders', component: MyOrdersComponent, canActivate: [authGuard] },
  { path: 'order-success', component: OrderSuccessComponent },

  // Admin Routes - eventually we will add an AdminGuard here too!
  { path: 'admin/products/new', component: ProductFormComponent, canActivate: [authGuard] },
  { path: 'admin/products', component: AdminProductsComponent, canActivate: [authGuard] },
  { path: 'admin/products/:id', component: ProductFormComponent },

  { path: 'admin/products', component: AdminProductsComponent },
  { path: 'admin/orders', component: AdminOrdersComponent },
];