import { Injectable } from '@angular/core';
import { BeneficiaryNameModel } from './beneficiary-name.model';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryNameService extends BaseApiService<BeneficiaryNameModel>{

  constructor(protected dataService: DataService) {
    super('beneficiaryName', dataService);
  }

  Get(): Observable<BeneficiaryNameModel[]> {
    return this.dataService.get<BeneficiaryNameModel[]>(`beneficiaryName`);
  }

  GetBeneficiaryNameDropDownByExpenditureTypeAndBeneficiaryCat(beneficiaryCatId, expenditureTypeId): Observable<BeneficiaryNameModel[]> {
    return this.dataService.get<BeneficiaryNameModel[]>(`beneficiaryName/GetBeneficiaryNameDropDownByExpenditureTypeAndBeneficiaryCat/${expenditureTypeId}/${beneficiaryCatId}`);
  }
}
