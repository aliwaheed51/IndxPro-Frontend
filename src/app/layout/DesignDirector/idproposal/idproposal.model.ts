import { BaseMasterModel } from '../../masters/masters.models';

export class IdproposalDataModel extends BaseMasterModel {

    companyId : number;
    projectId : number;
    proposalId : string;
    paymentTerms : string;
    proposalStatus : number;
    proposalDate : Date;
    proposalValidDate : Date;
    currency : string;
}

export class IdproposalModel {
    code:boolean;
    message:string;
    result:any;
}

