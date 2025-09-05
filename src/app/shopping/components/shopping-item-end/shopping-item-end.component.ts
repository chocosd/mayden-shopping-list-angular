import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { LucideAngularModule, MinusIcon, PlusIcon, TrashIcon } from 'lucide-angular';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ShoppingItem } from '../../models/shopping-item.interface';
import { ShoppingStore } from '../../store/shopping.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-shopping-item-end',
  imports: [ButtonComponent, LucideAngularModule],
  templateUrl: './shopping-item-end.component.html',
  styleUrl: './shopping-item-end.component.scss',
})
export class ShoppingItemEndComponent {
  public item = input.required<ShoppingItem>();

  protected readonly PlusIcon = PlusIcon;
  protected readonly TrashIcon = TrashIcon;
  protected readonly MinusIcon = MinusIcon;

  private readonly store = inject(ShoppingStore);

  protected removeShoppingItem(id: string | undefined): void {
    if (!id) {
      return;
    }

    this.store.removeShoppingItem(id);
  }

  protected removeOneFromShoppingItemQuantity(id: string | undefined): void {
    if (!id) {
      return;
    }
    this.store.removeOneFromShoppingItemQuantity(id);
  }

  protected addOneToShoppingItemQuantity(id: string | undefined): void {
    if (!id) {
      return;
    }
    this.store.addOneToShoppingItemQuantity(id);
  }
}
