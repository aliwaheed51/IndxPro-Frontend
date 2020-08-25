import { BaseMasterModel } from './../masters.models';
 
export class TestModel extends BaseMasterModel {
    id: number;
    testGroupId: number;
    testName: string;
    anticoagulant: string;
    notes?: string;
 
}

