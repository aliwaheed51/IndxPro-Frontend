import { Injectable } from '@angular/core';
import { FinishDescriptionModel } from './finish-description.model';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class FinishDescriptionService extends BaseApiService<FinishDescriptionModel>{

  constructor(protected dataService: DataService) {
    super('finishDescription', dataService);
  }

  Get(): Observable<FinishDescriptionModel[]> {
    return this.dataService.get<FinishDescriptionModel[]>(`finishDescription`);
  }

}
