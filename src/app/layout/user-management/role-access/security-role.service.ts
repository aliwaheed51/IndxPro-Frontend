import { RolePermissionModel } from './role-access.model';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityRoleService extends BaseApiService<RolePermissionModel> {
  constructor(protected dataService: DataService) {
    super('securityrole', dataService);
  }
}



