import { Injectable, inject } from '@angular/core';
import { Database, ref, listVal, push, update, remove, objectVal } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private db = inject(Database);

  // CREATE
  create(product: any) {
    // This pushes a new object into the 'products' node in Firebase
    return push(ref(this.db, 'products'), product);
  }

  //  READ ALL (Your existing working code)
  getAll(): Observable<any[]> {
    const productsRef = ref(this.db, 'products');
    return listVal(productsRef, { keyField: 'key' });
  }

  // READ SINGLE (Used for editing)
  get(productId: string) {
    return objectVal(ref(this.db, 'products/' + productId));
  }

  //  UPDATE
  update(productId: string, product: any) {
    return update(ref(this.db, 'products/' + productId), product);
  }

  //  DELETE
  delete(productId: string) {
    return remove(ref(this.db, 'products/' + productId));
  }
}