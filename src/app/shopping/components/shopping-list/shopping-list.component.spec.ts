import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingStore } from '../../store/shopping.store';
import { ShoppingListComponent } from './shopping-list.component';

describe('ShoppingListComponent', () => {
  let fixture: ComponentFixture<ShoppingListComponent>;
  let component: ShoppingListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingListComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: ShoppingStore,
          useValue: {
            items: () => [
              { id: '1', name: 'A', quantity: 1, price: 1, order: 2, bought: false },
              { id: '2', name: 'B', quantity: 1, price: 1, order: 1, bought: false },
            ],
            loading: () => false,
            reorderItems: jasmine.createSpy('reorderItems'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
