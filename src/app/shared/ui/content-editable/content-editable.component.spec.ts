import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { FormElementType } from '../../forms/models/form-element-type.enum';
import { ContentEditableComponent } from './content-editable.component';

describe('ContentEditableComponent', () => {
  let fixture: ComponentFixture<ContentEditableComponent>;
  let component: ContentEditableComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentEditableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentEditableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('value', 'Hello');
    fixture.componentRef.setInput('element', {
      name: 'title',
      type: FormElementType.Text,
      control: new FormControl('Hello'),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render value', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Hello');
  });
});
