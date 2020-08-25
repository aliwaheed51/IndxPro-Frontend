import { UserModel } from '../../masters/user/user.model';

export class EmployeeModel {

    id  : number;
    usersId : number;
    employeeStatus: number;
    employmentType : number;
    departmentId : number;
    address : string;
    accountDetails : string;
    resume : string;

    cvBase64 : string;
    cvextension : string;
    base64 : string;
    extension : string;
    costPerHour : number;
    costPerHourProfit : number;
    users : UserModel;
    employeeStatusText: string;
    employmentTypeText : string;
}
