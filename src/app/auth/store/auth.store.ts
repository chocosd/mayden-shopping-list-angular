import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tap } from 'rxjs';
import { type NotificationVariant } from '../../shared/models/notification-variant.type';
import { type LoginRequest } from '../models/auth.interface';
import { AuthApiService } from '../services/auth-api.service';

interface AuthState {
  token: string | null;
  loading: boolean;
  notice: {
    variant: NotificationVariant;
    message: string | undefined;
  };
}

const TOKEN_KEY = 'auth_token';

const initialState: AuthState = {
  token: typeof localStorage !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null,
  loading: false,
  notice: {
    variant: 'info',
    message: undefined,
  },
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, authApi = inject(AuthApiService)) => ({
    login: rxMethod<LoginRequest>(
      tap((payload) => {
        patchState(store, { loading: true });
        authApi
          .login(payload)
          .pipe(
            tap({
              next: (res) => {
                localStorage.setItem(TOKEN_KEY, res.token);
                patchState(store, { token: res.token, loading: false });
              },
              error: (error) => {
                const message = (error as any)?.error?.message ?? 'Unable to login';
                patchState(store, {
                  loading: false,
                  notice: { variant: 'danger', message },
                });
              },
            }),
          )
          .subscribe();
      }),
    ),
    register: rxMethod<LoginRequest>(
      tap((payload) => {
        patchState(store, { loading: true });
        authApi
          .register(payload)
          .pipe(
            tap({
              next: (res) => {
                localStorage.setItem(TOKEN_KEY, res.token);
                patchState(store, { token: res.token, loading: false });
              },
              error: (error) => {
                const message = (error as any)?.error?.message ?? 'Unable to register';
                patchState(store, { loading: false, notice: { variant: 'danger', message } });
              },
            }),
          )
          .subscribe();
      }),
    ),
    logout() {
      localStorage.removeItem(TOKEN_KEY);
      patchState(store, { token: null });
    },
    restore() {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        patchState(store, { token });
      }
    },
  })),
);
