import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DropDownModel } from 'src/app/core/models/drop-down.model';
import { Observable } from 'rxjs';
import { ProjectdeliverablesModel } from './projectdeliverables.model';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectdeliverablesService extends BaseApiService<ProjectdeliverablesModel>{
  constructor(protected dataService: DataService) {
    super('ProjectDeliverables', dataService);
  }

  Get(): Observable<ProjectdeliverablesModel> {
    return this.dataService.get<ProjectdeliverablesModel>(`ProjectDeliverables`);
  }

  GetProjectDeliverablesDropDown(projectIDealDesignStageId : number): Observable<DropDownModel[]> {
    return this.dataService.get<DropDownModel[]>(`ProjectDeliverables/GetProjectDeliverablesDropDown/${projectIDealDesignStageId}`);
  }
  
}