import { Injectable } from '@angular/core';
import { ExpenditureDetailModel } from './expenditure-detail.model';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenditureDetailService extends BaseApiService<ExpenditureDetailModel>{

  constructor(protected dataService: DataService) {
    super('expenditureDetail', dataService);
  }

  Get(): Observable<ExpenditureDetailModel[]> {
    return this.dataService.get<ExpenditureDetailModel[]>(`expenditureDetail`);
  }
}
