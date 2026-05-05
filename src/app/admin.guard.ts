import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { map, switchMap } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const userService = inject(UserService);

  return auth.user$.pipe(
    switchMap(user => userService.get(user!.uid)),
    map(appUser => appUser?.isAdmin || false)
  );
};