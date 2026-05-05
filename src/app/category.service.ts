import { Injectable, inject } from '@angular/core';
import { Database, listVal, ref, query, orderByChild } from '@angular/fire/database';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private db = inject(Database);

  getAll() {
    // This fetches categories and sorts them by name
    return listVal(ref(this.db, '/categories'), { keyField: 'key' });
  }
}