 
export interface LocationModel {
  id: number;
  address: string;
  countryId?: number;
  stateId?: number;
  cityId?: number;
  cityAreaId?: number;
  zip?: string;
  countryName?: string;
  stateName?: string;
  cityName?: string;
  cityAreaName?: string;
}

export class CompanyModel  {
  id?: number;
  companyCode?: string;
  companyName?: string;
  phone1?: string;
  phone2?: string;
  locationId?: number;
  logo?: string;
  logoPath?: string;
  location: LocationModel;
  stateId: number;
  countryId: number;
  cityId:number;
  address: string;
  fileModel: FileModel;
}
export class NumberFormatModel{
  id?: number;
  configurationId?:number;
  keyName?: string;
  prefixFormat?: string;
  yearFormat?: number;
  monthFormat?: string;
  startNumber?: number;
  companyId?: number;
  separateSign?: number;
  resetYear?: boolean;
  hint?: string;
  numberLength?: number;
  isManual: boolean;
}

export class EmailTemplateModel {
  id?: number;
  keyName?: string;
  eMailSettingId?: number;
  subjectName?: string;
  bcc?: string;
  body?: boolean;
  companyId?: number;
}

export class EmailSettingModel {
  id?: number;
  emailFrom?: string;
  portName?: string;
  domainName?: string;
  emailPassword?: string;
  mailSsl?: boolean;
  companyId?: number;
}

export class UploadSettingModel {
  id?: number;
  imagePath?: string;
  documentPath?: string;
  companyId?: number;
  imageUrl?: string;
  documentUrl?: string;
  dataRecycleDays?: number;
}

export class LoginPreferenceModel {
  id?: number;
  minPasswordLength?: number;
  requiredSpecialChar?: boolean;
  requiredAlphaNumber?: boolean;
  requiredCapital?: boolean;
  expiredDay?: number;
  maxLoginAttempt?: number;
  companyId?: number;
}

export interface ssl {
  value: boolean;
  viewValue: string;
}

export class GeneralSettingsModel {
  dateFormat?: string;
  timeFormat?: string;
  idle?: string;
  timeout?: string;
  ping?: string;
  signalrUrl?: string;
}

export class FileModel
{
  base64 : string;
  extension : string
}
export class LocationModel
{}

