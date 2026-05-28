import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCpfMask]',
  standalone: true
})
export class CpfMaskDirective {
  private ngControl = inject(NgControl);

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    let newVal = event.target.value.replace(/\D/g, '');
    
    if (newVal.length > 11) {
      newVal = newVal.substring(0, 11);
    }

    if (newVal.length <= 3) {

    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{3})(\d+)/, '$1.$2');
    } else if (newVal.length <= 9) {
      newVal = newVal.replace(/^(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    } else {
      newVal = newVal.replace(/^(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
    }

    this.ngControl.control?.setValue(newVal, { emitEvent: false });
  }
}