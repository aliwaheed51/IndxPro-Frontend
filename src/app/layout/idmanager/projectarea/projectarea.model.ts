import { BaseMasterModel } from '../../masters/masters.models';

export class BaseProjectareaModel extends BaseMasterModel {
    companyId : number;
    projectId: number
    areaName: string;
    areaBudget: number;
    areaWidth: number;
    areaLength: number;
    areaHeight: number;
    areaDiameter: number;
    areaFloor: number;
    areaQuantity: number;
}

export class ProjectareaModel {
    code:boolean;
    message:string;
    result:any;
}