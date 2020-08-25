import { DropDownModel } from './../../../core/models/drop-down.model';
import { UtilityService } from './../../../core/services/utility.service';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadSettingModel } from '../general-configuration/general-configuration.model';
import { GeneralConfigurationService } from '../general-configuration/general-configuration.service';

@Component({
  selector: 'app-upload-setting',
  templateUrl: './upload-setting.component.html'
})

export class UploadSettingComponent extends Destroyer implements OnInit {
  form: FormGroup;
  companyDataSource: DropDownModel[];
  id: number;
  configurationId: number;
  uploadSetting: UploadSettingModel;
  @Input() data: any;
  constructor(private service: GeneralConfigurationService,
     private formBuilder: FormBuilder, private activeModal: NgbActiveModal,
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
      imagePath: ['', Validators.required],
      documentPath: ['', Validators.required],
      companyId: ['', Validators.required],
      imageUrl: ['', Validators.required],
      documentUrl: ['', Validators.required],
      dataRecycleDays: ['', Validators.required],
    });
  }

  close() {
    this.activeModal.close();
  }

  onReset(): void {
    this.form.reset();
    if (this.id > 0) {
      this.onEdit(this.id);
    }
  }
  
  onEdit(id: number): void {
    this.configurationId = this.data.configurationId;
    this.id = id;
    this.form.reset();
    this.form.setValue({
      imagePath: this.data.imagePath, 
      documentPath: this.data.documentPath,
      imageUrl: this.data.imageUrl,
      documentUrl: this.data.documentUrl,
      companyId: this.data.companyId,
      dataRecycleDays:this.data.dataRecycleDays
    });
     this.uploadSetting = this.data;
  }

  onSave() {
    const save = this.form.value;
    save.id = this.id;
    this.subs = this.service.saveUploadSetting(save).subscribe((res) => {
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
