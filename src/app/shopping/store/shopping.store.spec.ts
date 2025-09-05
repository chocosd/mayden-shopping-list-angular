import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { delay, of } from 'rxjs';
import { ShoppingApiService } from '../services/shopping-api.service';
import { ShoppingStore } from './shopping.store';

describe('ShoppingStore (cart updates)', () => {
  const setup = (delayed = false) => {
    const apiStub: Partial<ShoppingApiService> = {
      updateCart: jasmine.createSpy('updateCart').and.callFake((payload: any) => {
        const source$ = of({
          items: [],
          total: 0,
          spendLimit: payload.spendLimit ?? 0,
          title: payload.title,
        });
        return delayed ? source$.pipe(delay(100)) : source$;
      }),
      getShoppingItems: jasmine
        .createSpy('getShoppingItems')
        .and.returnValue(of({ items: [], total: 0, spendLimit: 0 })),
    } as unknown as ShoppingApiService;

    TestBed.configureTestingModule({
      providers: [ShoppingStore, { provide: ShoppingApiService, useValue: apiStub }],
    });

    const store = TestBed.inject(ShoppingStore);
    return { store, apiStub };
  };

  it('should call updateCart when setting title (immediate)', () => {
    const { store, apiStub } = setup(false);
    store.setTitle('Groceries');
    expect((apiStub.updateCart as jasmine.Spy).calls.mostRecent().args[0]).toEqual({
      title: 'Groceries',
    });
    expect(store.title()).toBe('Groceries');
  });

  it('should call updateCart when setting spendLimit (immediate)', () => {
    const { store, apiStub } = setup(false);
    store.setSpendLimit(200);
    expect((apiStub.updateCart as jasmine.Spy).calls.mostRecent().args[0]).toEqual({
      spendLimit: 200,
    });
    expect(store.spendLimit()).toBe(200);
  });

  it('should handle delayed update of spendLimit', fakeAsync(() => {
    const { store } = setup(true);
    store.setSpendLimit(300);
    // optimistic state applied immediately
    expect(store.spendLimit()).toBe(300);
    tick(100);
    expect(store.spendLimit()).toBe(300);
  }));
});
