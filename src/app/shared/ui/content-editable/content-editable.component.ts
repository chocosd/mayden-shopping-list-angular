import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  HostListener,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CheckIcon, Edit2Icon, LucideAngularModule } from 'lucide-angular';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { FormElementComponent } from '../../forms/components/form-element/form-element.component';
import { FormElementType } from '../../forms/models/form-element-type.enum';
import { FormElement } from '../../forms/models/form-element.interface';
import { ButtonComponent } from '../button/button.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-content-editable',
  imports: [
    ReactiveFormsModule,
    LucideAngularModule,
    FormElementComponent,
    ButtonComponent,
    ClickOutsideDirective,
  ],
  templateUrl: './content-editable.component.html',
  styleUrl: './content-editable.component.scss',
})
export class ContentEditableComponent {
  readonly value = input.required<string | number | boolean>();
  readonly element = input.required<FormElement>();
  readonly disabled = input<boolean>(false);

  readonly onContentEditableChange = output<Record<string, unknown>>();

  protected isHovering = signal(false);
  protected isEditing = signal(false);

  protected readonly Edit2Icon = Edit2Icon;
  protected readonly CheckIcon = CheckIcon;
  protected readonly FormElementType = FormElementType;

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      if (this.element()) {
        this.listenToElementChanges();
      }
    });
  }

  private listenToElementChanges(): void {
    (this.element()?.control as FormControl<unknown>).valueChanges
      .pipe(debounceTime(100), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  protected startEditing(): void {
    if (!this.element()) {
      return;
    }

    this.resetFormElementValue();
    this.isEditing.set(true);
  }

  protected stopEditing(): void {
    if (!this.isEditing()) {
      return;
    }

    this.isEditing.set(false);
    this.resetFormElementValue();
  }

  protected resetFormElementValue(): void {
    this.element()?.control?.setValue(this.value() as never);
  }

  protected commit(): void {
    const el = this.element();

    if (!el) {
      this.isEditing.set(false);
      return;
    }

    this.onContentEditableChange.emit({ [el.name]: el.control.value });
    this.isEditing.set(false);
  }

  @HostListener('keydown.enter', ['$event'])
  protected onEnter(event: Event | null): void {
    event?.preventDefault();
    this.commit();
  }
}
