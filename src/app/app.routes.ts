import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { provideShoppingItemsResolver } from './shopping/resolvers/provide-items-resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'shopping',
    pathMatch: 'full',
  },
  {
    path: 'shopping',
    canActivate: [authGuard],
    resolve: {
      shoppingItems: provideShoppingItemsResolver,
    },
    loadComponent: () =>
      import('./shopping/pages/shopping-page/shopping-page.component').then(
        (m) => m.ShoppingPageComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/pages/login/login.component').then((m) => m.LoginComponent),
  },
];
