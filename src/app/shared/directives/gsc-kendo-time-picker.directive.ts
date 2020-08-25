import { Directive } from '@angular/core';
import { TimePickerComponent } from '@progress/kendo-angular-dateinputs';
import { StorageService } from 'src/app/core/services/storage.service';

@Directive({
  selector: '[gscKendoTimePicker]'
})
export class GscKendoTimePickerDirective {
  constructor(private timePicker: TimePickerComponent, private storageService: StorageService) {
    this.timePicker.format = this.storageService.GeneralSettings.timeFormat;
  }
}
