import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ShoppingItem } from '../../models/shopping-item.interface';
import { ShoppingItemCenterComponent } from '../shopping-item-center/shopping-item-center.component';
import { ShoppingItemEndComponent } from '../shopping-item-end/shopping-item-end.component';
import { ShoppingItemStartComponent } from '../shopping-item-start/shopping-item-start.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-shopping-item',
  imports: [
    LucideAngularModule,
    ShoppingItemStartComponent,
    ShoppingItemEndComponent,
    ShoppingItemCenterComponent,
  ],
  templateUrl: './shopping-item.component.html',
  styleUrl: './shopping-item.component.scss',
})
export class ShoppingItemComponent {
  public item = input.required<ShoppingItem>();

  protected onDragStart(event: DragEvent, item: ShoppingItem): void {
    const id = item.id;

    if (!id || !event.dataTransfer) {
      return;
    }

    event.dataTransfer.setData('text/plain', id);
    event.dataTransfer.effectAllowed = 'move';
  }

  protected onDragEnd(event: DragEvent, item: ShoppingItem): void {
    const id = item.id;

    if (!id || !event.dataTransfer) {
      return;
    }

    event.dataTransfer?.clearData();
  }
}
