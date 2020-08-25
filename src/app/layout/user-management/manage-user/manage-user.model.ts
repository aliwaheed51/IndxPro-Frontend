import { FileModel } from '../../general-configuration/general-configuration/general-configuration.model';

 
export interface ManageUserModel {
    id: number;
    userName: string;
    lastName: string;
    firstName: string;
    middleName: string;
    email: string;
    phone: string;
    validFrom?: Date;
    validTo?: Date;
    userRoles: UserRole[];
    isActive?: boolean;
    profilePic?: string;
    profilePicPath?: string;
    fileModel: FileModel;
    logo?: string;
    companyId: number;
}

export class UserRole {
    userId?: number;
    userRoleId?: number;
}



