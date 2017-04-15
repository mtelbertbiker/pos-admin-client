import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  private isOpen = false;
  @HostBinding('class.open') get opened() {
    return this.isOpen;
  }
  @HostListener('mouseenter') open() {
    this.isOpen = true;
  }
  @HostListener('click') clickopen() {
    this.isOpen = true;
  }
  @HostListener('mouseleave') close() {
    this.isOpen = false;
  }
}
