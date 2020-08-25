import { DropDownModel } from './../../../core/models/drop-down.model';
import { UtilityService } from './../../../core/services/utility.service';
import { FormBuilder,FormGroup  } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ssl, LoginPreferenceModel } from '../general-configuration/general-configuration.model';
import { GeneralConfigurationService } from '../general-configuration/general-configuration.service';

@Component({
  selector: 'app-login-preference',
  templateUrl: './login-preference.component.html'
})

export class LoginPreferenceComponent extends Destroyer implements OnInit {
  form: FormGroup;
  companyDataSource: DropDownModel[];
  showDetails: boolean;
  
  sslDataSource: ssl[] = [
    { value: true, viewValue: 'True' },
    { value: false, viewValue: 'False' },
  ];
 
  id: number;
  configurationId: number;
  loginPreference: LoginPreferenceModel;
  @Input() data: any;
  constructor(private service: GeneralConfigurationService, private formBuilder: FormBuilder, private activeModal: NgbActiveModal,
    private utils: UtilityService) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.getCompanyDropDown();
    if (this.data.id > 0) {
      this.onEdit(this.data.id);
    }
    else {
      this.configurationId = this.data.configurationId;
    }
  }

  initForm(): void {
   
     this.form = this.formBuilder.group({
      minPasswordLength: [''],
      requiredSpecialChar: [''],
      requiredAlphaNumber: [''],
      requiredCapital: [''],
      expiredDay: [''],
      maxLoginAttempt: [''],
      companyId: [''],
    });
  }

  close() {
    this.activeModal.close();
  }

  // onEdit(id: number): void {
  //   this.id = id;
  //   this.configurationId = this.data.configurationId;
  //   this.form.reset();
  //   this.subs = this.service.getOneById(this.id).subscribe((data:LoginPreferenceModel) => {
  //      this.showDetails = true;
  //     this.form.setValue({
         
  //     minPasswordLength: this.data.minPasswordLength,
  //     requiredSpecialChar: this.data.requiredSpecialChar,
  //     requiredAlphaNumber: this.data.requiredAlphaNumber,
  //     requiredCapital: this.data.requiredCapital,
  //     expiredDay: this.data.expiredDay,
  //     maxLoginAttempt: this.data.maxLoginAttempt,
  //     companyId:this.data.companyId
  //     });
  //     this.uploadSetting = this.data;
  //   });
  // }

  onEdit(id: number): void {
    this.configurationId = this.data.configurationId;
    
    this.id = id;
    this.form.reset();
    this.form.setValue({
      
      minPasswordLength: this.data.minPasswordLength,
      requiredSpecialChar: this.data.requiredSpecialChar,
      requiredAlphaNumber: this.data.requiredAlphaNumber,
      requiredCapital: this.data.requiredCapital,
      expiredDay: this.data.expiredDay,
      maxLoginAttempt: this.data.maxLoginAttempt,
      companyId:this.data.companyId
    });
     this.loginPreference = this.data;
  }
  
  onReset(): void {
    this.form.reset();
    if (this.id > 0) {
      this.onEdit(this.id);
    }
  }
  onSave() {
    const data = this.form.value;
    data.id = this.id;
    this.subs = this.service.saveLoginPreference(data).subscribe((res) => {
      this.utils.toast.recordSaved();
      this.activeModal.close(res);
    },
      failed => {
        this.utils.toast.error(failed.error.message[0], 'Error');
      });
    }

  private getCompanyDropDown(): void {
    this.subs = this.service.getCompanyDropDown().subscribe(res => {
        this.companyDataSource = res;
    });
  }
}
