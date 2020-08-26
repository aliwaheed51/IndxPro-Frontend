export class TimeSheetModel {
  id: number;
  company: string;
  companyId: number;
  employee: string;
  project: string;
  projectId: number;
  projectArea: string;
  projectAreaId: number;
  designStage: string;
  designStageId: number;
  deliverable: string;
  deliverableId: number;
  subDeliverable: string;
  subDeliverableId: number;
  remarks: string;
  checkin: number;
  checkout: number;
}
