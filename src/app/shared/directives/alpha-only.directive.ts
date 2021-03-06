import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[alphaOnly]'
})
export class AlphaOnlyDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event) {
    const originalValue = this.elementRef.nativeElement.value;
    this.elementRef.nativeElement.value = originalValue.replace(/[^a-zA-Z ]*/g, '');
    if (originalValue !== this.elementRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
