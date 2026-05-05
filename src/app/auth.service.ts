import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { Database, ref, set } from '@angular/fire/database';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private db = inject(Database);
  user$ = user(this.auth); // This tracks if someone is logged in

  async login() {
    const result = await signInWithPopup(this.auth, new GoogleAuthProvider());
    if (result.user) {
      this.save(result.user); // Save to DB after login
    }
  }

  private save(user: any) {
    // This creates/updates /users/[userId] in your Firebase Database
    set(ref(this.db, 'users/' + user.uid), {
      name: user.displayName,
      email: user.email
    });
  }

  logout() { this.auth.signOut(); }
}