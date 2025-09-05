import { Component, DestroyRef, effect, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged, map } from 'rxjs';
import { FormElementNumber } from '../../models/form-element.interface';

@Component({
  selector: 'app-form-input-number',
  imports: [ReactiveFormsModule],
  templateUrl: './form-input-number.component.html',
  styleUrl: './form-input-number.component.scss',
})
export class FormInputNumberComponent {
  public element = input.required<FormElementNumber>();

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.listenToElementChanges();
  }

  private listenToElementChanges(): void {
    effect(() => {
      const control = this.element().control;
      control.valueChanges
        .pipe(
          distinctUntilChanged((a, b) => Number(a) === Number(b)),
          map((raw) => {
            const step = this.element().config?.step ?? 1;
            const num = Number(raw);

            if (Number.isNaN(num)) {
              return raw as number;
            }

            if (step >= 1) {
              return Math.round(num);
            }

            // Derive decimals from step, e.g. 0.01 -> 2
            const decimals = (step.toString().split('.')[1] || '').length;
            return Number(num.toFixed(decimals));
          }),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe((rounded) => {
          // Avoid loops by not emitting
          if (control.value !== rounded) {
            control.setValue(rounded as never, { emitEvent: false });
          }
        });
    });
  }
}
