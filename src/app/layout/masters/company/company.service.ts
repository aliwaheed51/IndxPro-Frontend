import { Injectable } from '@angular/core';
import { CompanyModel } from './company.model';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';
import { DropDownModel } from 'src/app/core/models/drop-down.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService  extends BaseApiService<CompanyModel>{

  constructor(protected dataService: DataService) {
    super('company', dataService);
  }

  Get(): Observable<CompanyModel[]> {
    return this.dataService.get<CompanyModel[]>(`company`);
  }

  GetCompanyDropDown(): Observable<CompanyModel[]> {
    return this.dataService.get<CompanyModel[]>(`company/getCompanyDropDown`);
  }

  GetCompanyDropDownByUser(): Observable<DropDownModel[]> {
    return this.dataService.get<DropDownModel[]>(`company/GetCompanyDropDownByUser`);
  }
}
