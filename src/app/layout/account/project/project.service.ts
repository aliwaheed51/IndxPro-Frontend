import { Injectable } from '@angular/core';
import { ProjectModel } from './project.model';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseApiService<ProjectModel>{

  constructor(protected dataService: DataService) {
    super('project', dataService);
  }

  Get(): Observable<ProjectModel[]> {
    return this.dataService.get<ProjectModel[]>(`project`);
  }

  GetDepartmentDropDown(): Observable<any[]> {
    return this.dataService.get<any[]>(`department/getDepartmentDropDown`);
  }

  GetDepartmentDropDownByCompany(companyId : number): Observable<any[]> {
    return this.dataService.get<any[]>(`department/GetDepartmentDropDownByCompany/${companyId}`);
  }   

  GetClientDropDown(): Observable<any[]> {
    return this.dataService.get<any[]>(`client/getClientDropDown`);
  }

  GetClientDropDownByCompany(companyId : number): Observable<any[]> {
    return this.dataService.get<any[]>(`client/getClientDropDownByCompany/${companyId}`);
  }

  GetProjectDropDownByCompany(companyId : number): Observable<any[]> {
    return this.dataService.get<any[]>(`project/GetProjectDropDownByCompany/${companyId}`);
  }   

  GetProjectDropDown(): Observable<any[]> {
    return this.dataService.get<any[]>(`project/GetProjectDropDown`);
  }   
}
