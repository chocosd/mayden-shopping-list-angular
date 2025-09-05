import { Directive, ElementRef, HostListener, inject, output } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  public clickOutside = output<void>();

  private readonly elementRef = inject(ElementRef);

  @HostListener('document:click', ['$event.target'])
  public onClickOutside(targetElement: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);

    if (clickedInside) {
      return;
    }
    this.clickOutside.emit();
  }
}
