import { Injectable, inject } from '@angular/core';
import { Database, ref, objectVal } from '@angular/fire/database';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private db = inject(Database);

  get(uid: string): Observable<AppUser | null> {
    return objectVal<AppUser>(ref(this.db, 'users/' + uid));
  }
}