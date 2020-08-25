import { Injectable } from '@angular/core';
import { BeneficiaryCategoryModel } from './beneficiary-category.model';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryCategoryService extends BaseApiService<BeneficiaryCategoryModel>{

  constructor(protected dataService: DataService) {
    super('beneficiaryCategory', dataService);
  }

  Get(): Observable<BeneficiaryCategoryModel[]> {
    return this.dataService.get<BeneficiaryCategoryModel[]>(`beneficiaryCategory`);
  }

  GetBeneficiaryCategoryDropDown(): Observable<BeneficiaryCategoryModel[]> {
    return this.dataService.get<BeneficiaryCategoryModel[]>(`beneficiaryCategory/getBeneficiaryCategoryDropDown`);
  }

}
