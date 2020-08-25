import { DropDownModel } from './drop-down.model';
import { ScreenRightsModel } from './screen-rights-model';
import { GeneralSettingsModel } from './general-settings';
 
export interface CurrentUserModel {
  companyLogo: string;
  companyName: string;
  email: string;
  expiredAfter: string;
  firstName: string;
  lastName: string;
  loginReportId: number;
  refreshToken: string;
  roleId: [number];
  roleName: string;
  token: string;
  userId: number;
  userName: string;
  userPicUrl: string;
  rights: ScreenRightsModel[];
  generalSettings: GeneralSettingsModel;
  roles: DropDownModel[];
  isSuperAdmin?: boolean;
  roleTokenId:any;
  isAuthenticated:boolean;
  // claims: AppUserClaim[] ;
  isFirstTime :boolean;
  companyId : number;
}
