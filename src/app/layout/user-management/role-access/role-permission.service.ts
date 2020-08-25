import { RolePermissionModel, SecurityRoleModel } from './role-access.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionService extends BaseApiService<SecurityRoleModel> {
  constructor(protected dataService: DataService) {
    super('securityrole', dataService);
  }
  
  get(id: number): Observable<RolePermissionModel[]> {
    return this.dataService.get<RolePermissionModel[]>(
        `RolePermission/${id}`
    );
  }
  
  savePermission(data: RolePermissionModel[]): Observable<RolePermissionModel[]> {
    {
      return this.dataService.post<RolePermissionModel[]>(
        'RolePermission',
        data
      );
    }
  }
  updatePermission(data: RolePermissionModel[]): Observable<RolePermissionModel[]> {
      return this.dataService.put<RolePermissionModel[]>(
        'RolePermission',
        data
      )
  }
}
 