import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DepartmentModel } from './department.model';
import { DataService } from 'src/app/core/services/data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends BaseApiService<DepartmentModel> {
  constructor(protected dataService: DataService) {
    super('SecurityRole', dataService);
  }

  Get(): Observable<DepartmentModel[]> {
    return this.dataService.get<DepartmentModel[]>(`SecurityRole`);
  }

  
}
