import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CompanyModel } from './company.model';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { CompanyService } from './company.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FileModel } from '../../general-configuration/general-configuration/general-configuration.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',

})
export class CompanyComponent extends MasterPage<CompanyModel> implements OnInit {
  profilePicPath: any;
  fileModel: FileModel;
  companies: any;
  @Input() data: any;
  @Output() backClick: EventEmitter<any> = new EventEmitter();
  public mask: string = "(999) 00-000-00-00";
  constructor(public service: CompanyService, private utils: UtilityService, private formBuilder: FormBuilder) {
    super(service);
  }
 
  ngOnInit(): void {
   
    this.initForm();
    if (this.data != null && this.data.id > 0)
      this.setdata(this.data);
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      companyName: ['', Validators.required],
      officeNoAndBuilding: [''],
      city: ['', Validators.required],
      country: ['',Validators.required,],
      email: ['', Validators.email],
      phone: [''],
      mobile: [''],
      contactName: [''],
      contactTitle: [''],
      isActive: [false]
    });
  }
 
  onEdit(id: number): void {
    this.id = id;
    this.form.reset();
    this.subs = this.service.getOneById(this.id).subscribe((data) => {
      this.showDetails = true;
      this.setdata(data);
    });
  }
  setdata(data: any): void {
    
    this.id = data.id;
    this.form.setValue({
      companyName: data.companyName,
      officeNoAndBuilding: data.officeNoAndBuilding,
      city: data.city,
      country: data.country,
      email: data.email,
      phone: data.phone,
      mobile: data.mobile,
      contactName:  data.contactName,
      contactTitle:  data.contactTitle,
      isActive: data.isActive,
    });
    this.profilePicPath = this.data.logo;
  }

  onSave(): void {
    
    const data = this.form.value;
    data.id = this.id;
   
    data.extension = this.fileModel != null || this.fileModel != undefined ? this.fileModel.extension : "";
     
    if (this.id > 0) {
      data.base64 = this.fileModel != null || this.fileModel != undefined ?
        this.fileModel.base64 : "";
      data.logo = this.data.fileName;
    }
    else
      data.base64 = this.fileModel != null || this.fileModel != undefined ? this.fileModel.base64 : "";
    this.subs = this.service.save(data, this.id).subscribe((res) => {
      this.showDetails = false;
      this.utils.toast.recordSaved();
      this.backClick.emit();
    });
  }

  fileChange(files: File[]) {
    if (files && files[0]) {

      const mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }
      const name = files[0].name;
      const lastDot = name.lastIndexOf('.');
      const extension = name.substring(lastDot + 1);
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (event) => {
        this.profilePicPath = reader.result;
        this.fileModel = {
          base64: reader.result,
          extension: extension
        } as FileModel;
        this.form.markAsDirty();
      };
    }
  }

  onReset(): void {
    this.form.reset();
    if (this.id > 0) {
      this.onEdit(this.id);
    }
  }

  onBack() {
    this.showDetails = false;
  }

}
