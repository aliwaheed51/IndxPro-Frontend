import { Directive, OnInit, Input } from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';

@Directive({
  selector: '[gscKendoGridSettings]'
})
export class GscKendoGridSettingsDirective implements OnInit {
  @Input() screenCode: string;
  constructor(private grid: GridComponent) {}

  ngOnInit() {
    if (!this.screenCode) {
      throw new Error('Please provide sreencode for grid settings directive to work properly.');
    }
  }
}
