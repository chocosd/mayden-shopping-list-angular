import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
  let fixture: ComponentFixture<NotificationComponent>;
  let component: NotificationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('variant', 'info');
    fixture.componentRef.setInput('message', 'Hello world');
    fixture.componentRef.setInput('modifierClass', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default variant to "info"', () => {
    expect(component.variant()).toBe('info');
    expect(component.message()).toBe('Hello world');
    expect(component.modifierClass()).toEqual([]);
  });

  it('should accept a message input', () => {
    fixture.componentRef.setInput('message', 'Hello world');
    fixture.detectChanges();
    expect(component.message()).toBe('Hello world');
  });

  it('should compute base classes with default inputs', () => {
    const classes = component['classes']();
    expect(classes).toContain('notification');
    expect(classes).toContain('notification--info');
  });

  it('should include modifier classes when provided as string', () => {
    fixture.componentRef.setInput('modifierClass', 'large');
    fixture.detectChanges();
    const classes = component['classes']();
    expect(classes).toContain('notification--large');
  });

  it('should include multiple modifier classes when provided as array', () => {
    fixture.componentRef.setInput('modifierClass', ['large', 'shadow']);
    fixture.detectChanges();
    const classes = component['classes']();
    expect(classes).toContain('notification--large');
    expect(classes).toContain('notification--shadow');
  });

  it('should update classes when variant changes', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();
    const classes = component['classes']();
    expect(classes).toContain('notification--success');
  });
});
