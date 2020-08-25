import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { DropDownModel, ProjectDropDown } from '../models/drop-down.model';
import { map } from 'rxjs/operators';
import { AuditReasonModel } from 'src/app/shared/components/audit/audit.models';
import { LoginPreferenceModel } from 'src/app/layout/general-configuration/general-configuration/general-configuration.model';

@Injectable({
  providedIn: 'root'
})
export class DropDownService {
  constructor(private data: DataService) { }

  private filterDeleted(data?: DropDownModel[], idToInclude?: number): DropDownModel[] {
    if (!data || !data.length) {
      return data;
    }

    const filteredData = data.filter((t) => t.id === idToInclude || !t.isDeleted);
    return filteredData;
  }

  private getData(url: string, idToInclude?: any): Observable<DropDownModel[]> {
    return this.data.get<DropDownModel[]>(url).pipe(map((data) => this.filterDeleted(data, idToInclude)));
  }
 

  getSecurityRoles() {
    return this.getData(`SecurityRole/GetSecurityRoleDropDown`);
  }

   
  getClients() {
    return this.getData(`Client/GetClientDropDown`);
  }
 

  getDropDownData(url: string, idToInclude?: any) {
    return this.getData(url, idToInclude);
  }
 
  usersByRole(roleId: number, idToInclude?: any) {
    return this.getData(`User/GetUserNameByRoleId/${roleId}`, idToInclude);
  }
 

  userTypes() {
    return this.getData('SecurityRole/GetSecurityRoleDropDown');
  }
   
  securityRoles() {
    return this.getData(`SecurityRole/GetSecurityRoleDropDown`);
  }
 

  
  getCompanies(): Observable<any> {
    return this.data.get<any>(`Company/GetCompanyDropDown`);
  }
 
  userNameValidate(userName: string): Observable<string> {
    return this.data.post<string>(`UserOtp/ForgotPassword/${userName}`, null);
  }

  changePassword(entity: any): Observable<void> {
    return this.data.post<void>('users/ChangePassword', entity).pipe();
  }
   

}
