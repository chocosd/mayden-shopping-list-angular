import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingStore } from '../../store/shopping.store';
import { ShoppingItemCenterComponent } from './shopping-item-center.component';

describe('ShoppingItemCenterComponent', () => {
  let fixture: ComponentFixture<ShoppingItemCenterComponent>;
  let component: ShoppingItemCenterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingItemCenterComponent],
      providers: [
        {
          provide: ShoppingStore,
          useValue: { updateShoppingItem: jasmine.createSpy('updateShoppingItem') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingItemCenterComponent);
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

  it('creates form elements with initial values', () => {
    expect(component['nameElement']?.control.value).toBe('Milk');
    expect(component['priceElement']?.control.value).toBe(1.5);
  });

  it('calls store.updateShoppingItem on updateItemField', () => {
    const store = TestBed.inject(ShoppingStore) as unknown as {
      updateShoppingItem: jasmine.Spy;
    };
    (component as any).updateItemField('name', { name: 'Bread' });
    expect(store.updateShoppingItem).toHaveBeenCalledWith({ id: '1', patch: { name: 'Bread' } });
  });
});
