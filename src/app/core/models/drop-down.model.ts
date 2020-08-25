export class DropDownModel {
  id?: number;
  value?: string;
  code?: string;
  extraData?: any;
  seqNo?: number;
  isStatic?: boolean;
  isDeleted?: boolean;
}

export class ProjectDropDown {
  id?: number;
  value?: string;
  code?: string;
  isStatic?: boolean;
  parentProjectId: number;
  attendanceLimit: number;
  countryId: number;
}
 