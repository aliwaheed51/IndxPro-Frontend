import { DropDownModel } from './../../../core/models/drop-down.model';
import { Observable } from 'rxjs';
import { AppScreenModel } from './app-screen.model';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AppScreenService extends BaseApiService<AppScreenModel> {
  constructor(protected dataService: DataService) {
    super('appScreen', dataService);
  }
  getAppScreenDropDown(): Observable<DropDownModel[]> {
    return this.dataService.get<DropDownModel[]>(
        'appScreen/GetAppScreenParentFromDropDown'
    );
  }
}
