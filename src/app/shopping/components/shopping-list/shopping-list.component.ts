import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ShoppingStore } from '../../store/shopping.store';
import { ShoppingItemComponent } from '../shopping-item/shopping-item.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-shopping-list',
  imports: [ShoppingItemComponent],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss',
})
export class ShoppingListComponent {
  protected readonly shoppingStore = inject(ShoppingStore);
  protected readonly shoppingItems = this.shoppingStore.items;
  protected readonly isLoading = computed(() => this.shoppingStore.loading());

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();

    const draggedId = event.dataTransfer?.getData('text/plain');
    if (!draggedId) {
      return;
    }

    const target = (event.target as HTMLElement).closest('[data-id]') as HTMLElement | null;
    const targetId = target?.getAttribute('data-id');
    if (!targetId || targetId === draggedId) {
      return;
    }

    const items = this.shoppingStore.items();
    const fromIndex = items.findIndex((i) => i.id === draggedId);
    const toIndex = items.findIndex((i) => i.id === targetId);
    if (fromIndex < 0 || toIndex < 0) {
      return;
    }

    const [moved] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, moved);

    const reordered = items.map((item, index) => ({ ...item, order: index + 1 }));
    this.shoppingStore.reorderItems({ items: reordered });
  }
}
