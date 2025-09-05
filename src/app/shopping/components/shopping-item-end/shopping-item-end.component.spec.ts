import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingStore } from '../../store/shopping.store';
import { ShoppingItemEndComponent } from './shopping-item-end.component';

describe('ShoppingItemEndComponent', () => {
  let fixture: ComponentFixture<ShoppingItemEndComponent>;
  let component: ShoppingItemEndComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingItemEndComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: ShoppingStore,
          useValue: {
            removeShoppingItem: jasmine.createSpy('removeShoppingItem'),
            removeOneFromShoppingItemQuantity: jasmine.createSpy(
              'removeOneFromShoppingItemQuantity',
            ),
            addOneToShoppingItemQuantity: jasmine.createSpy('addOneToShoppingItemQuantity'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingItemEndComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('item', {
      id: '1',
      name: 'Milk',
      quantity: 1,
      price: 1.5,
      order: 1,
      bought: false,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calls store methods by id', () => {
    const store = TestBed.inject(ShoppingStore) as any;
    (component as any).addOneToShoppingItemQuantity(component.item().id);
    (component as any).removeOneFromShoppingItemQuantity(component.item().id);
    (component as any).removeShoppingItem(component.item().id);
    expect(store.addOneToShoppingItemQuantity).toHaveBeenCalledWith('1');
    expect(store.removeOneFromShoppingItemQuantity).toHaveBeenCalledWith('1');
    expect(store.removeShoppingItem).toHaveBeenCalledWith('1');
  });
});
