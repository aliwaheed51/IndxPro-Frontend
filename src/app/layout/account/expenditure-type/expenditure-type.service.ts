import { Injectable } from '@angular/core';
import { ExpenditureTypeModel } from './expenditure-type.model';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenditureTypeService extends BaseApiService<ExpenditureTypeModel>{

  constructor(protected dataService: DataService) {
    super('expenditureType', dataService);
  }

  Get(): Observable<ExpenditureTypeModel[]> {
    return this.dataService.get<ExpenditureTypeModel[]>(`expenditureType`);
  }

  GetExpenditureTypeDropDown(): Observable<ExpenditureTypeModel[]> {
    return this.dataService.get<ExpenditureTypeModel[]>(`expenditureType/getExpenditureTypeDropDown`);
  }
}
