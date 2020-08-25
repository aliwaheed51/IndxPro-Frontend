import { CompanyModel, NumberFormatModel, EmailTemplateModel, EmailSettingModel, UploadSettingModel, LoginPreferenceModel, GeneralSettingsModel } from './general-configuration.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';
import { DropDownModel } from 'src/app/core/models/drop-down.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralConfigurationService extends BaseApiService<CompanyModel> {
  constructor(protected dataService: DataService) {
    super('company', dataService);
  }

  getNumberFormats(): Observable<NumberFormatModel[]> {
    return this.dataService.get<NumberFormatModel[]>(`numberformat`
    );
  }

  getEmailTemplate(): Observable<EmailTemplateModel[]> {
    return this.dataService.get<EmailTemplateModel[]>(`emailtemplate`);
  }

  getSettings(): Observable<EmailSettingModel[]> {
    return this.dataService.get<EmailSettingModel[]>(`emailsetting`);
  }

  getUploadSettings(): Observable<UploadSettingModel[]> {
    return this.dataService.get<UploadSettingModel[]>(`uploadsetting`);
  }

  getLoginPreference(): Observable<LoginPreferenceModel[]> {
    return this.dataService.get<LoginPreferenceModel[]>(`loginpreference`);
  }
  
  getGeneralSetting(): Observable<GeneralSettingsModel> {
    return this.dataService.get<GeneralSettingsModel>(`appsetting/GetGeneralSettings`);
  }

  saveNumberFormat(data: NumberFormatModel): Observable<NumberFormatModel> {
    if (data.id > 0) {
      return this.dataService.put<NumberFormatModel>('numberformat', data);
    } else {
      return this.dataService.post<NumberFormatModel>('numberformat', data);
    }
  }

  getCompanyDropDown(): Observable<DropDownModel[]> {
    return this.dataService.get<DropDownModel[]>(
        'Company/GetCompanyDropDown'
    );
  }

  getEmailSettingDropDown(): Observable<DropDownModel[]> {
    return this.dataService.get<DropDownModel[]>(
        'EmailSetting/GetEmailFromDropDown'
    );
  }

  saveCompany(data: CompanyModel): Observable<CompanyModel> {
    if (data.id > 0) {
      return this.dataService.put<CompanyModel>('Company', data);
    } else {
      return this.dataService.post<CompanyModel>('Company', data);
    }
  }

  saveGeneralSettings(data: GeneralSettingsModel) {
    return this.dataService.post(
        `AppSetting/SaveGeneralSettings`,
        data
    );
  }

  getGeneralSettings(): Observable<GeneralSettingsModel> {
    return this.dataService.get<GeneralSettingsModel>(
        `AppSetting/GetGeneralSettings`
    );
}

  saveEmailTemplate(data: EmailTemplateModel): Observable<EmailTemplateModel> {
    if (data.id > 0) {
      return this.dataService.put<EmailTemplateModel>('emailtemplate', data);
    } else {
      return this.dataService.post<EmailTemplateModel>('emailtemplate', data);
    }
  }

  saveEmailSetting(data: EmailSettingModel): Observable<EmailSettingModel> {
    if (data.id > 0) {
      return this.dataService.put<EmailSettingModel>('emailsetting', data);
    } else {
      return this.dataService.post<EmailSettingModel>('emailsetting', data);
    }
  }

  saveUploadSetting(data: UploadSettingModel): Observable<UploadSettingModel> {
    if (data.id > 0) {
      return this.dataService.put<UploadSettingModel>('uploadsetting', data);
    } else {
      return this.dataService.post<UploadSettingModel>('uploadsetting', data);
    }
  }

  saveLoginPreference(data: LoginPreferenceModel): Observable<LoginPreferenceModel> {
    if (data.id > 0) {
      return this.dataService.put<LoginPreferenceModel>('loginpreference', data);
    } else {
      return this.dataService.post<LoginPreferenceModel>('loginpreference', data);
    }
  }
}