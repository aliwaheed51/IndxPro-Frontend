import { DepartmentModel } from '../../user-management/department/department.model';
import { UserRole } from '../../user-management/manage-user/manage-user.model';
import { CompanyModel } from '../../general-configuration/general-configuration/general-configuration.model';

export class UserModel {
    id: number;
    userName: string;
    lastName: string;
    firstName: string;
    email: string;
    mobile: string;
    userType: string;
    fileModel: any;
    address: string;
    base64: string;
    extension: string;
    password: string;
    isEmailVerify: boolean;
    profilePic: string;
    fileName: string;
    isEmployee : boolean;
    userRole: UserRole[];
    company : CompanyModel[];
    // userCompany : UserCompany[];
}

export class UserCompany{
    userId : number;
    companyId : number;
    company : []
}