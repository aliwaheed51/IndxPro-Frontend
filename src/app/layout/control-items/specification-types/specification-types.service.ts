import { Injectable } from '@angular/core';
import { SpecificationTypesModel } from './specification-types.model';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class SpecificationTypesService extends BaseApiService<SpecificationTypesModel>{

  constructor(protected dataService: DataService) {
    super('specificationTypes', dataService);
  }

  Get(): Observable<SpecificationTypesModel[]> {
    return this.dataService.get<SpecificationTypesModel[]>(`specificationTypes`);
  }

  GetSpecificationTypesDropdown(): Observable<SpecificationTypesModel[]> {
    return this.dataService.get<SpecificationTypesModel[]>(`specificationTypes/getSpecificationTypesDropdown`);
  }

}
