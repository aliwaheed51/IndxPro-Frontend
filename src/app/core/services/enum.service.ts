import { DataService } from 'src/app/core/services/data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnumModel } from '../models/enum-model';

@Injectable({
  providedIn: 'root'
})
export class EnumService {
  ctrlName = 'Enums';
  constructor(private data: DataService) {}

  getDateFormats(): Observable<EnumModel[]> {
    return this.data.get<EnumModel[]>(`${this.ctrlName}/DateFormats`);
  }

  getTimeFormats(): Observable<EnumModel[]> {
    return this.data.get<EnumModel[]>(`${this.ctrlName}/TimeFormats`);
  }
 
  getComparisonList(): Observable<EnumModel[]> {
    return this.data.get<EnumModel[]>(`${this.ctrlName}/ComparisonList`);
  }

  ComparisonWitohutCheckList(): Observable<EnumModel[]> {
    return this.data.get<EnumModel[]>(`${this.ctrlName}/ComparisonWitohutCheckList`);
  }

  EditCheckRuleBy(): Observable<EnumModel[]> {
    return this.data.get<EnumModel[]>(`${this.ctrlName}/EditCheckRuleBy`);
  }

  ProjectScheduleOperator(): Observable<EnumModel[]> {
    return this.data.get<EnumModel[]>(`${this.ctrlName}/ProejctScheduleOperator`);
  }

  HolidayType(): Observable<EnumModel[]> {
    return this.data.get<EnumModel[]>(`${this.ctrlName}/HolidayType`);
  }
}
