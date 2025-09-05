import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NotificationVariant } from '../../models/notification-variant.type';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-notification',
  imports: [NgClass],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  public variant = input<NotificationVariant>('info');
  public message = input.required<string>();
  public modifierClass = input<string | string[], string[]>([], {
    transform: (value) => (Array.isArray(value) ? value : [value]),
  });

  protected readonly classes = computed(() => {
    const modifierClasses = (this.modifierClass() as string[]).map(
      (modifierClass) => `notification--${modifierClass}`,
    );

    return ['notification', `notification--${this.variant()}`, ...modifierClasses];
  });
}
