import { DropDownModel, ProjectDropDown } from './../../../core/models/drop-down.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { ManageUserModel } from './manage-user.model';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService extends BaseApiService<ManageUserModel> {
  users: ManageUserModel[];
  onUsersChanged: BehaviorSubject<any>;
  constructor(protected dataService: DataService) {
    super('user', dataService);
    this.onUsersChanged = new BehaviorSubject({});
  }

  getProjectsForDataEntry(): Observable<ProjectDropDown[]> {
    return this.dataService.get<ProjectDropDown[]>(`Project/GetProjectsForDataEntry`);
  }
//   getUsers(): Observable<ManageUserModel[]> {
//     return this.dataService.get<ManageUserModel[]>(`user`);
// }

getUsers(): Promise<ManageUserModel[]> {
  return new Promise((resolve, reject) => {
      this.dataService.get<ManageUserModel[]>('User').subscribe((response: any) => {
          this.users = response;
          this.onUsersChanged.next(this.users);
          resolve(response);
      }, reject);
  });
}
getManageUsers(): Observable<ManageUserModel[]> {
  return this.dataService.get<ManageUserModel[]>(`user`);
}
blockUnblockChange(id: number): Observable<ManageUserModel> {
  return this.dataService.get<any>(`User/GetBlockedUser/${id}`);
}
updateUser(id: number, user: ManageUserModel): Observable<any> {
  return this.dataService.put<any>(`User/${id}`, user);
}
addUser(user: ManageUserModel): Observable<ManageUserModel> {
  return this.dataService.post<ManageUserModel>('User', user);
}
getUser(id: number): Observable<ManageUserModel> {
  return this.dataService.get<ManageUserModel>(`User/${id}`);
}
}
