import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';
import { CompanyDepartmentModel } from './company-department.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyDepartmentService extends BaseApiService<CompanyDepartmentModel> {
  constructor(protected dataService: DataService) {
    super('Department', dataService);
  }

  Get(): Observable<CompanyDepartmentModel[]> {
    return this.dataService.get<CompanyDepartmentModel[]>(`Department`);
  }
}
