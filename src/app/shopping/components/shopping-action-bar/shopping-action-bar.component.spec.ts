import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingStore } from '../../store/shopping.store';
import { ShoppingActionBarComponent } from './shopping-action-bar.component';

describe('ShoppingActionBarComponent', () => {
  let fixture: ComponentFixture<ShoppingActionBarComponent>;
  let component: ShoppingActionBarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingActionBarComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: ShoppingStore,
          useValue: {
            addShoppingItem: jasmine.createSpy('addShoppingItem'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingActionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submits a valid form and calls store.addShoppingItem', () => {
    const store = TestBed.inject(ShoppingStore) as unknown as {
      addShoppingItem: jasmine.Spy;
    };

    component['form']?.setValue({ name: 'Milk', quantity: 2, price: 1.5 });
    (component as any).onSubmit();
    expect(store.addShoppingItem).toHaveBeenCalledWith({ name: 'Milk', quantity: 2, price: 1.5 });
  });
});
