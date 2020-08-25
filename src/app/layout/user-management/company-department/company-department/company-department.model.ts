import { BaseMasterModel } from 'src/app/layout/masters/masters.models';
import { CompanyModel } from 'src/app/layout/general-configuration/general-configuration/general-configuration.model';

 
export class CompanyDepartmentModel extends BaseMasterModel {
    id?: number;
    departmentName?: string;
    companyID : number;
    company : CompanyModel;
}