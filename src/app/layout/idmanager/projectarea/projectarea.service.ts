import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { ProjectareaModel } from './projectarea.model';
import { DataService } from 'src/app/core/services/data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectareaService extends BaseApiService<ProjectareaModel>{
  constructor(protected dataService: DataService) {
    super('ProjectArea', dataService);
  }

  Get(): Observable<ProjectareaModel> {
    return this.dataService.get<ProjectareaModel>(`ProjectArea`);
  }

  
}