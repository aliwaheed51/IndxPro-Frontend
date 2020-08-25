import { Injectable } from '@angular/core';
import { CompanyBankAccountModel } from './company-bank-account.model';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyBankAccountService extends BaseApiService<CompanyBankAccountModel>{

  constructor(protected dataService: DataService) {
    super('companyBankAccountDetail', dataService);
  }

  Get(): Observable<CompanyBankAccountModel[]> {
    return this.dataService.get<CompanyBankAccountModel[]>(`companyBankAccountDetail`);
  }

  GetCompanyBankAccountDetailDropDownByCompany(id): Observable<CompanyBankAccountModel[]> {
    return this.dataService.get<CompanyBankAccountModel[]>(`companyBankAccountDetail/getCompanyBankAccountDetailDropDownByCompany/${id}`);
  }

}
