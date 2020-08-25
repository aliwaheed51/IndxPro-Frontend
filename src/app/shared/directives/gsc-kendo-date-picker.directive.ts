import { Directive } from '@angular/core';
import { DatePickerComponent } from '@progress/kendo-angular-dateinputs';
import { StorageService } from 'src/app/core/services/storage.service';

@Directive({
  selector: '[gscKendoDatePicker]'
})
export class GscKendoDatePickerDirective {
  constructor(private datePicker: DatePickerComponent, private storageService: StorageService) {
    this.datePicker.format = this.storageService.GeneralSettings.dateFormat;
  }
}
