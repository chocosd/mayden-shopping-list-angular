import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ShoppingItem } from '../models/shopping-item.interface';
import { ShoppingStore } from '../store/shopping.store';

export const provideShoppingItemsResolver: ResolveFn<ShoppingItem[]> = () => {
  const shoppingStore = inject(ShoppingStore);

  shoppingStore.getShoppingItems();

  console.log('shoppingStore.items()', shoppingStore.items());

  if (!shoppingStore.items()?.length) {
    return [];
  }

  return shoppingStore.items();
};
