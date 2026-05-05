import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    map(user => {
      if (user) return true; // Person is logged in, let them through

      // Not logged in: Redirect to login and remember where they wanted to go
      router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    })
  );
};