import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { TimeSheetModel } from './timesheet.model';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root',
})
export class TimeSheetService extends BaseApiService<TimeSheetModel> {
  constructor(protected dataService: DataService) {
    super('timeSheet', dataService);
  }
}
