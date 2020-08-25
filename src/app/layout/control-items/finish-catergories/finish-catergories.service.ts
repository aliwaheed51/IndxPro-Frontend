import { Injectable } from '@angular/core';
import { FinishCatergoriesModel } from './finish-catergories.model';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class FinishCatergoriesService extends BaseApiService<FinishCatergoriesModel>{

  constructor(protected dataService: DataService) {
    super('finishCatergories', dataService);
  }

  Get(): Observable<FinishCatergoriesModel[]> {
    return this.dataService.get<FinishCatergoriesModel[]>(`finishCatergories`);
  }

  GetFinishCategoriesDropdownByFinishType(type): Observable<FinishCatergoriesModel[]> {
    return this.dataService.get<FinishCatergoriesModel[]>(`finishCatergories/getFinishCategoriesDropdownByFinishType/${type}`);
  }

}
