import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingStore } from '../../store/shopping.store';
import { ShoppingTotalComponent } from './shopping-total.component';

describe('ShoppingTotalComponent', () => {
  let fixture: ComponentFixture<ShoppingTotalComponent>;
  let component: ShoppingTotalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingTotalComponent],
      providers: [
        {
          provide: ShoppingStore,
          useValue: {
            total: () => 10,
            spendLimit: () => 20,
            setSpendLimit: jasmine.createSpy('setSpendLimit'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute the remaining spend', () => {
    const label = fixture.nativeElement.querySelector(
      '.shopping-total__remaining .shopping-total__value',
    );
    expect(label.textContent).toContain('10');
  });
});
