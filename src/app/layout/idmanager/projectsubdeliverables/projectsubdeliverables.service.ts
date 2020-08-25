import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { ProjectsubdeliverablesModel } from './projectsubdeliverables.model';
import { DataService } from 'src/app/core/services/data.service';
import { Observable } from 'rxjs';
import { DropDownModel } from 'src/app/core/models/drop-down.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsubdeliverablesService  extends BaseApiService<ProjectsubdeliverablesModel>{
  constructor(protected dataService: DataService) {
    super('ProjectSubDeliverables', dataService);
  }

  Get(): Observable<ProjectsubdeliverablesModel> {
    return this.dataService.get<ProjectsubdeliverablesModel>(`ProjectSubDeliverables`);
  }

  GetprojectDeliverableDropDown(projectDeliverableId : number): Observable<DropDownModel[]> {
    return this.dataService.get<DropDownModel[]>(`ProjectDeliverables/GetprojectDeliverableDropDown/${projectDeliverableId}`);
  }
  
}