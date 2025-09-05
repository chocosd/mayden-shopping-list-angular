import { NgClass, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ButtonSize, ButtonType, ButtonVariant } from '../../models/button.type';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-button',
  imports: [NgClass, NgStyle],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  public modifierClass = input<string | string[], string[]>([], {
    transform: (value) => (Array.isArray(value) ? value : [value]),
  });
  public disabled = input<boolean>(false);
  public variant = input<ButtonVariant>('primary');
  public size = input<ButtonSize>('md');
  public type = input<ButtonType>('button');
  public styles = input<CSSStyleDeclaration>();

  public onClick = output<void>();

  protected readonly classes = computed(() => {
    const modifierClasses = (this.modifierClass() as string[]).map(
      (modifierClass) => `button--${modifierClass}`,
    );

    return ['button', `button--${this.variant()}`, `button--${this.size()}`, ...modifierClasses];
  });

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !this.disabled()) {
      console.log('Enter key pressed');
      this.onClick.emit();
    }
  }
}
