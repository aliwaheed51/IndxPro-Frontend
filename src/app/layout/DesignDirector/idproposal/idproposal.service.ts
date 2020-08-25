import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { IdproposalModel } from './idproposal.model';
import { DataService } from 'src/app/core/services/data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdproposalService extends BaseApiService<IdproposalModel> {
  constructor(protected dataService: DataService) {
    super('IDProposal', dataService);
  }

  Get(): Observable<IdproposalModel> {
    return this.dataService.get<IdproposalModel>(`IDProposal`);
  }

  
}
