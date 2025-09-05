import { Component, DestroyRef, effect, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { GripVerticalIcon, LucideAngularModule } from 'lucide-angular';
import { debounceTime } from 'rxjs';

import { FormInputCheckboxComponent } from '../../../shared/forms/components/form-input-checkbox/form-input-checkbox.component';
import { FormElementType } from '../../../shared/forms/models/form-element-type.enum';
import {
  FormElementCheckbox,
  FormElementNumber,
  FormElementText,
} from '../../../shared/forms/models/form-element.interface';
import { ShoppingItem } from '../../models/shopping-item.interface';
import { ShoppingStore } from '../../store/shopping.store';

@Component({
  selector: 'app-shopping-item-start',
  imports: [FormInputCheckboxComponent, LucideAngularModule],
  templateUrl: './shopping-item-start.component.html',
  styleUrl: './shopping-item-start.component.scss',
})
export class ShoppingItemStartComponent {
  public item = input.required<ShoppingItem>();

  protected boughtElement: FormElementCheckbox | null = null;
  protected priceElement: FormElementNumber | null = null;
  protected nameElement: FormElementText | null = null;

  private readonly destroyRef = inject(DestroyRef);
  private readonly store = inject(ShoppingStore);

  protected readonly GripVerticalIcon = GripVerticalIcon;

  constructor() {
    effect(() => {
      const shoppingItem = this.item();

      this.createBoughtFormElement(shoppingItem);
      this.listenToBoughtFormElementChanges();
    });
  }

  private listenToBoughtFormElementChanges(): void {
    this.boughtElement?.control.valueChanges
      .pipe(debounceTime(100), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        const id = this.item().id;
        if (!id) {
          return;
        }

        this.store.updateShoppingItem({ id, patch: { bought: !!value } });
      });
  }

  private createBoughtFormElement(current: ShoppingItem): void {
    this.boughtElement = {
      name: 'bought',
      type: FormElementType.Checkbox,
      control: new FormControl<boolean>(current.bought, { nonNullable: true }),
    };
  }
}
