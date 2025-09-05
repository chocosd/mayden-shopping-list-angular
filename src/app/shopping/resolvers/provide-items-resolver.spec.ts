import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ShoppingItem } from '../models/shopping-item.interface';
import { provideShoppingItemsResolver } from './provide-items-resolver';
describe('provideShoppingItemsResolver', () => {
  const executeResolver: ResolveFn<ShoppingItem[]> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => provideShoppingItemsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClientTesting(),
        provideHttpClient(),
      ],
    });
  });

  it('should be created and return shopping items', () => {
    const result = executeResolver(null as any, null as any);
    expect(result).toEqual([]);
    expect(result).toBeTruthy();
  });
});
