import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthStore);
  const router = inject(Router);
  const token = auth.token();

  if (token) {
    return true;
  }

  router.navigateByUrl('/login');
  return false;
};
