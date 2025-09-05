import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { ShoppingItem } from '../models/shopping-item.interface';
import { provideShoppingItemsResolver } from './provide-items-resolver';

describe('provideShoppingItemsResolver', () => {
  const executeResolver: ResolveFn<ShoppingItem[]> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => provideShoppingItemsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created and return shopping items', () => {
    const result = executeResolver(null as any, null as any);
    expect(result).toBe([]);
    expect(result).toBeTruthy();
  });
});
