import { DropDownModel } from './../models/drop-down.model';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { EnumService } from './enum.service';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { DropDownService } from './drop-down.service';
import { FormGroup } from '@angular/forms';
import { Constant } from '../constants/constants';
import { ToasterService } from './toaster.service';
import { BaseSettingsModel } from '../models/base-settings.model';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor(
    public data: DataService,
    public dropDown: DropDownService,
    public toast: ToasterService,
    public enums: EnumService,
    public storage: StorageService,
    private http: HttpClient
  ) {
    this.loadBaseSettings();
  }

  confirmDelete(): boolean {
    if (!confirm(Constant.message.deleteConfirmation)) {
      return false;
    }

    return true;
  }

  validForm(fg: FormGroup, valid: boolean): boolean {
    Object.keys(fg.controls).forEach((controlName: string) => {
      const control = fg.get(controlName);
      if (control instanceof FormGroup) {
        valid = this.validForm(control, valid);
      } else {
        if (control.errors) {
          control.markAsTouched();
          valid = false;
        }
      }
    });

    return valid;
  }

  public getTimeZone(): string {
    return /\((.*)\)/.exec(new Date().toString())[1];
  }

  public toBoolean(value: any) {
    if (!value) {
      return value;
    }

    if (typeof value === 'string') {
      value = value.trim().toLowerCase();
    }
    switch (value) {
      case true:
      case 'true':
      case 1:
      case '1':
      case 'on':
      case 'yes':
        return true;
      default:
        return false;
    }
  }

  private loadBaseSettings(): void {
    this.http.get<BaseSettingsModel>('assets/base-settings.json').subscribe((settings) => {
      this.storage.setBaseSettings(settings);
    });
  }
}
