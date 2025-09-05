import { Component, effect, inject, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Edit2Icon } from 'lucide-angular';
import { FormElementType } from '../../../shared/forms/models/form-element-type.enum';
import {
  FormElementNumber,
  FormElementText,
} from '../../../shared/forms/models/form-element.interface';
import { ContentEditableComponent } from '../../../shared/ui/content-editable/content-editable.component';
import { ShoppingItem } from '../../models/shopping-item.interface';
import { ShoppingStore } from '../../store/shopping.store';

@Component({
  selector: 'app-shopping-item-center',
  imports: [ContentEditableComponent],
  templateUrl: './shopping-item-center.component.html',
  styleUrl: './shopping-item-center.component.scss',
})
export class ShoppingItemCenterComponent {
  public item = input.required<ShoppingItem>();

  protected priceElement: FormElementNumber | null = null;
  protected nameElement: FormElementText | null = null;

  protected readonly Edit2Icon = Edit2Icon;
  protected readonly store = inject(ShoppingStore);

  constructor() {
    effect(() => {
      const shoppingItem = this.item();

      this.createFormElements(shoppingItem);
    });
  }

  private createFormElements(current: ShoppingItem): void {
    this.nameElement = {
      name: 'name',
      type: FormElementType.Text,
      control: new FormControl<string>(current.name, { nonNullable: true }),
    };
    this.priceElement = {
      name: 'price',
      type: FormElementType.Number,
      control: new FormControl<number>(current.price, { nonNullable: true }),
    };
  }

  protected updateItemField(field: keyof ShoppingItem, value: Partial<ShoppingItem>): void {
    const id = this.item().id;

    if (!id) {
      return;
    }
    this.store.updateShoppingItem({ id, patch: value });
  }
}
