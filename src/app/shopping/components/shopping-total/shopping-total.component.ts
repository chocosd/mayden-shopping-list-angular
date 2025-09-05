import { DecimalPipe } from '@angular/common';
import { Component, computed, effect, inject, Signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormElementType } from '../../../shared/forms/models/form-element-type.enum';
import { FormElementNumber } from '../../../shared/forms/models/form-element.interface';
import { ContentEditableComponent } from '../../../shared/ui/content-editable/content-editable.component';
import { ShoppingStore } from '../../store/shopping.store';

@Component({
  selector: 'app-shopping-total',
  imports: [ReactiveFormsModule, ContentEditableComponent, DecimalPipe],
  templateUrl: './shopping-total.component.html',
  styleUrl: './shopping-total.component.scss',
})
export class ShoppingTotalComponent {
  protected readonly shoppingStore = inject(ShoppingStore);
  protected readonly total: Signal<number> = this.shoppingStore.total;
  protected readonly spendLimit: Signal<number> = this.shoppingStore.spendLimit;

  protected readonly remaining = computed(() => this.spendLimit() - this.total());

  protected spendLimitElement: FormElementNumber = {
    name: 'spendLimit',
    type: FormElementType.Number,
    control: new FormControl<number>(0, { nonNullable: true }),
    validators: [
      { name: 'required', message: 'Spend limit is required' },
      { name: 'min', message: 'Minimum is 0' },
    ],
    config: { step: 1, min: 0 },
  };

  constructor() {
    effect(() => {
      const value = this.spendLimit();
      this.spendLimitElement.control.setValue(value, { emitEvent: false });
    });
  }

  protected onSpendLimitChange = (payload: Record<string, unknown>): void => {
    const value = Number(payload['spendLimit'] ?? this.spendLimit());
    if (!Number.isFinite(value)) {
      return;
    }
    this.shoppingStore.setSpendLimit(Math.max(0, Math.round(value)));
  };
}
