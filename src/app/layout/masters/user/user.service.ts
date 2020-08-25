import { Injectable } from '@angular/core';
import { UserModel } from './user.model';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService  extends BaseApiService<UserModel>{
  asas  : UserModel;
  constructor(protected dataService: DataService) {
    super('users', dataService);
  }

  Get(): Observable<UserModel[]> {
    return this.dataService.get<UserModel[]>(`Users`);
  }
}
