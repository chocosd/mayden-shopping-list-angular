import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, finalize, of, pipe, switchMap, tap } from 'rxjs';
import { NotificationVariant } from '../../shared/models/notification-variant.type';
import { ShoppingCart, ShoppingItem, SlimShoppingItem } from '../models/shopping-item.interface';
import { ShoppingApiService } from '../services/shopping-api.service';

interface ShoppingState {
  items: ShoppingItem[];
  total: number;
  spendLimit: number;
  loading: boolean;
  notice: {
    variant: NotificationVariant;
    message: string;
  };
  title: string;
}

const initialState: ShoppingState = {
  items: [],
  total: 0,
  spendLimit: 0,
  loading: false,
  notice: {
    variant: 'info',
    message: '',
  },
  title: '',
};

export const ShoppingStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),
  withMethods((store, shoppingApiService = inject(ShoppingApiService)) => ({
    addShoppingItem: rxMethod<SlimShoppingItem>(
      pipe(
        tap(() => patchState(store, { notice: { variant: 'info', message: '' } })),
        switchMap((item: SlimShoppingItem) => shoppingApiService.addShoppingItem(item)),
        tap({
          next: (cart) => patchState(store, { ...cart, loading: false }),
          error: (error) =>
            patchState(store, { notice: { variant: 'danger', message: error.message } }),
        }),
      ),
    ),
    removeShoppingItem: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true, notice: { variant: 'info', message: '' } })),
        switchMap((id: string) =>
          shoppingApiService.removeShoppingItem(id).pipe(
            tap((cart) => patchState(store, { ...cart, loading: false })),
            finalize(() => patchState(store, (state) => ({ ...state, loading: false }))),
            catchError((error) => {
              patchState(store, { notice: { variant: 'danger', message: error.message } });
              return of(null);
            }),
          ),
        ),
      ),
    ),
    getShoppingItems: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, notice: { variant: 'info', message: '' } })),
        switchMap(() => shoppingApiService.getShoppingItems()),
        tap({
          next: (cart) =>
            patchState(store, {
              items: cart.items,
              total: cart.total,
              spendLimit: cart.spendLimit,
              title: cart.title ?? '',
              loading: false,
            }),
          error: (error) =>
            patchState(store, {
              notice: { variant: 'danger', message: error.message },
              loading: false,
            }),
        }),
      ),
    ),
    removeOneFromShoppingItemQuantity: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { notice: { variant: 'info', message: '' } })),
        switchMap((id: string) => {
          const item = store.items().find((item) => item.id === id);

          if (!item) {
            return of({} as ShoppingCart);
          }

          return shoppingApiService.updateShoppingItem(id, { quantity: item.quantity - 1 });
        }),
        tap({
          next: (cart) =>
            patchState(store, {
              items: cart.items,
              total: cart.total,
              spendLimit: cart.spendLimit,
              title: cart.title ?? store.title(),
              loading: false,
            }),
          error: (error) =>
            patchState(store, { notice: { variant: 'danger', message: error.message } }),
        }),
      ),
    ),
    addOneToShoppingItemQuantity: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { notice: { variant: 'info', message: '' } })),
        switchMap((id: string) => {
          const item = store.items().find((item) => item.id === id);

          if (!item) {
            return of({} as ShoppingCart);
          }

          return shoppingApiService.updateShoppingItem(id, { quantity: item.quantity + 1 });
        }),
        tap({
          next: (cart) =>
            patchState(store, {
              items: cart.items,
              total: cart.total,
              spendLimit: cart.spendLimit,
              title: cart.title ?? store.title(),
              loading: false,
            }),
          error: (error) =>
            patchState(store, { notice: { variant: 'danger', message: error.message } }),
        }),
      ),
    ),
    updateShoppingItem: rxMethod<{ id: string; patch: Partial<ShoppingItem> }>(
      pipe(
        tap(() => patchState(store, { notice: { variant: 'info', message: '' } })),
        switchMap(({ id, patch }) => shoppingApiService.updateShoppingItem(id, patch)),
        tap({
          next: (cart) =>
            patchState(store, {
              items: cart.items,
              total: cart.total,
              spendLimit: cart.spendLimit,
              title: cart.title ?? store.title(),
              loading: false,
            }),
          error: (error) =>
            patchState(store, {
              notice: { variant: 'danger', message: error.message },
              loading: false,
            }),
        }),
      ),
    ),
    setTitle: rxMethod<string>(
      pipe(
        tap((title) => patchState(store, { title })),
        switchMap((title) => shoppingApiService.updateCart({ title })),
        tap({
          next: (cart) => patchState(store, { title: cart.title ?? store.title() }),
          error: (error) =>
            patchState(store, { notice: { variant: 'danger', message: error.message } }),
        }),
      ),
    ),
    setSpendLimit: rxMethod<number>(
      pipe(
        tap((spendLimit) => patchState(store, { spendLimit })),
        switchMap((spendLimit) => shoppingApiService.updateCart({ spendLimit })),
        tap({
          next: (cart) => patchState(store, { spendLimit: cart.spendLimit }),
          error: (error) =>
            patchState(store, { notice: { variant: 'danger', message: error.message } }),
        }),
      ),
    ),
    reorderItems: rxMethod<{ items: ShoppingItem[] }>(
      pipe(
        tap(() => patchState(store, { notice: { variant: 'info', message: '' } })),
        switchMap(({ items }) => shoppingApiService.reorderShoppingItems(items)),
        tap({
          next: (items) => patchState(store, { items }),
          error: (error) =>
            patchState(store, { notice: { variant: 'danger', message: error.message } }),
        }),
      ),
    ),
  })),
  withComputed((state) => ({
    remainingSpend: computed(
      () =>
        state.items().reduce((prev, item) => {
          const rawTotal = state.spendLimit() - (prev + item.price * item.quantity);

          return Number(Intl.NumberFormat().format(rawTotal));
        }, 0),
      {},
    ),
  })),
);
