import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply variant and size classes', () => {
    fixture.componentRef.setInput('variant', 'accent');
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button');
    expect(btn.className).toContain('button--accent');
    expect(btn.className).toContain('button--lg');
  });

  it('should emit on click', () => {
    let clicked = false;
    component.onClick.subscribe(() => (clicked = true));
    const btn = fixture.nativeElement.querySelector('button');
    btn.click();
    expect(clicked).toBeTrue();
  });
});
