import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormElementType } from '../../../shared/forms/models/form-element-type.enum';
import { ShoppingStore } from '../../../shopping/store/shopping.store';
import { ShoppingPageComponent } from './shopping-page.component';

// Create a mock ShoppingStore
class MockShoppingStore {
  title = signal('My Shopping List');
  notice = signal({ variant: 'info', message: 'Welcome!' });
  setTitle = jasmine.createSpy('setTitle');
}

describe('ShoppingPageComponent', () => {
  let fixture: ComponentFixture<ShoppingPageComponent>;
  let component: ShoppingPageComponent;
  let store: MockShoppingStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingPageComponent, ReactiveFormsModule],
      providers: [{ provide: ShoppingStore, useClass: MockShoppingStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(ShoppingStore) as unknown as MockShoppingStore;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should provide a titleElement form config', () => {
    const element = component['titleElement'];

    expect(element.name).toBe('title');
    expect(element.type).toBe(FormElementType.Text);
    expect(element.control instanceof FormControl).toBeTrue();
    expect(element.label).toBe('Title');
  });

  it('should expose title signal from the store', () => {
    expect(component['title']()).toBe('My Shopping List');
  });

  it('should expose notice signal from the store', () => {
    expect(component['notice']()).toEqual({
      variant: 'info',
      message: 'Welcome!',
    });
  });

  it('should call store.setTitle when onTitleChange is invoked', () => {
    component['onTitleChange']({ title: 'New Title' });
    expect(store.setTitle).toHaveBeenCalledWith('New Title');
  });

  it('should coerce missing title to empty string', () => {
    component['onTitleChange']({});
    expect(store.setTitle).toHaveBeenCalledWith('');
  });
});
