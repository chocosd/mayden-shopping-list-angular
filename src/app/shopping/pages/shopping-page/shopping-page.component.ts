import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormElementType } from '../../../shared/forms/models/form-element-type.enum';
import { FormElementText } from '../../../shared/forms/models/form-element.interface';
import { ContentEditableComponent } from '../../../shared/ui/content-editable/content-editable.component';
import { NotificationComponent } from '../../../shared/ui/notification/notification.component';
import { ShoppingStore } from '../../../shopping/store/shopping.store';
import { ShoppingActionBarComponent } from '../../components/shopping-action-bar/shopping-action-bar.component';
import { ShoppingListComponent } from '../../components/shopping-list/shopping-list.component';
import { ShoppingTotalComponent } from '../../components/shopping-total/shopping-total.component';

@Component({
  selector: 'app-shopping-page',
  imports: [
    ShoppingListComponent,
    ShoppingActionBarComponent,
    ShoppingTotalComponent,
    ContentEditableComponent,
    ReactiveFormsModule,
    NotificationComponent,
  ],
  templateUrl: './shopping-page.component.html',
  styleUrl: './shopping-page.component.scss',
})
export class ShoppingPageComponent {
  protected readonly shoppingStore = inject(ShoppingStore);

  protected readonly title = this.shoppingStore.title;

  protected readonly titleElement: FormElementText = {
    name: 'title',
    type: FormElementType.Text,
    control: new FormControl<string>('', { nonNullable: true }),
    label: 'Title',
  };

  protected readonly notice = this.shoppingStore.notice;

  protected onTitleChange(payload: Record<string, unknown>): void {
    const title = String(payload['title'] ?? '');

    this.shoppingStore.setTitle(title);
  }
}
