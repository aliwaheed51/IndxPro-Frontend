import { Injectable } from '@angular/core';
import { FinishTypesModel } from './finish-types.model';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class FinishTypesService extends BaseApiService<FinishTypesModel>{

  constructor(protected dataService: DataService) {
    super('finishTypes', dataService);
  }

  Get(): Observable<FinishTypesModel[]> {
    return this.dataService.get<FinishTypesModel[]>(`finishTypes`);
  }

  GetFinishTypesDropdown(): Observable<FinishTypesModel[]> {
    return this.dataService.get<FinishTypesModel[]>(`finishTypes/getFinishTypesDropdown`);
  }

}
