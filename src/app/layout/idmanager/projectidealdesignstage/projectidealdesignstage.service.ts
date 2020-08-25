import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { ProjectidealdesignstageModel } from './projectidealdesignstagegns.model';
import { DataService } from 'src/app/core/services/data.service';
import { Observable } from 'rxjs';
import { DropDownModel } from 'src/app/core/models/drop-down.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectidealdesignstageService extends BaseApiService<ProjectidealdesignstageModel>{
  constructor(protected dataService: DataService) {
    super('ProjectIDealDesignStage', dataService);
  }

  Get(): Observable<ProjectidealdesignstageModel> {
    return this.dataService.get<ProjectidealdesignstageModel>(`ProjectIDealDesignStage`);
  }

  GetprojectIdealDesignStageDropDown(companyId : number): Observable<DropDownModel[]> {
    return this.dataService.get<DropDownModel[]>(`ProjectIDealDesignStage/GetprojectIdealDesignStageDropDown/${companyId}`);
  }
  
}