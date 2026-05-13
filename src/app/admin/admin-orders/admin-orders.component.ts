import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Add this
import { Database, ref, listVal } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, RouterModule], // Add RouterModule here
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$: Observable<any[]>;
  private db = inject(Database);

  constructor() {
    // We fetch all orders from the 'orders' node
    this.orders$ = listVal(ref(this.db, 'orders'), { keyField: 'key' });
  }
}