export class SecurityRoleModel {
  id?: number;
  roleShortName?: string;
  roleName?: string;
}

export class RolePermissionModel {
  userRoleId: number;
  appScreenId: number;
  screenCode: string;
  screenName: string;
  parentAppScreenId?: number;
  rolePermissionId?: number;
  isAll: boolean;
  isView: boolean;
  isAdd: boolean;
  isEdit: boolean;
  isDelete: boolean;
  isExport: boolean;   
  canView: boolean;
  canAdd: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canExport: boolean;
  canAll: boolean;  
  // securityRole:SecurityRoleModel[]
}
