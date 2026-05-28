import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPhoneMask]',
  standalone: true
})
export class PhoneMaskDirective {
  private ngControl = inject(NgControl);

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    let newVal = event.target.value.replace(/\D/g, '');

    if (newVal.length > 11) {
      newVal = newVal.substring(0, 11);
    }

    if (newVal.length <= 2) {

    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{2})(\d+)/, '($1) $2');
    } else if (newVal.length <= 10) {
      newVal = newVal.replace(/^(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
    } else {
      newVal = newVal.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    this.ngControl.control?.setValue(newVal, { emitEvent: false });
  }
}