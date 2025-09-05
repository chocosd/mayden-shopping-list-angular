import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingStore } from '../../store/shopping.store';
import { ShoppingItemComponent } from './shopping-item.component';

describe('ShoppingItemComponent', () => {
  let fixture: ComponentFixture<ShoppingItemComponent>;
  let component: ShoppingItemComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingItemComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: ShoppingStore,
          useValue: {
            updateShoppingItem: jasmine.createSpy('updateShoppingItem'),
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ShoppingItemComponent);
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
});
