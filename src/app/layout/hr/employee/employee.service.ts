import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { EmployeeModel } from './employee.model';
import { DataService } from 'src/app/core/services/data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseApiService<EmployeeModel>{
  constructor(protected dataService: DataService) {
    super('employee', dataService);
  }

  Get(): Observable<EmployeeModel[]> {
    return this.dataService.get<EmployeeModel[]>(`Employee`);
  }
}
