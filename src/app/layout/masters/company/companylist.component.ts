import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { CompanyService } from './company.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { CompanyModel } from './company.model';

@Component({
  selector: 'app-companylist',
  templateUrl: './companylist.component.html',

})
export class CompanylistComponent extends MasterPage<CompanyModel> implements OnInit {
  constructor(public service: CompanyService, private formBuilder: FormBuilder, private utils: UtilityService,) { super(service); }
  gridData: CompanyModel[];
  data: any;
  ngOnInit(): void {
    this.GetData();
    this.initForm();
  }
  initForm(): void {
    this.form = this.formBuilder.group({
      companyName: ['', Validators.required],
      officeNoAndBuilding: [''],
      city: ['', Validators.required],
      country: ['', Validators.required,],
      email: ['', Validators.email],
      phone: [''],
      mobile: [''],
      contactName: [''],
      contactTitle: [''],
      isActive: [false]
    });
  }

  GetData() {
    this.service.Get().subscribe(result => {
      if (result.length > 0) {
        this.gridData = result;
      }
    });
  }

  onBack(): void {
    this.showDetails = false;
    this.GetData();
  }


  editClick(id: any) {
    this.id = id;
    this.form.reset();
    this.service.getOneById(this.id).subscribe((data) => {
      this.showDetails = true;
      this.data = data;
    });
  }

  addClick() {
    this.showDetails = true;
    this.data = null;
  }

  onDelete(id: number) {
    this.service.delete(id).subscribe(
      () => {
        this.utils.toast.recordDeleted();
        this.GetData();
      },
      (failed) => {
        this.utils.toast.error(failed.error.message[0], 'Error');
      }
    );
  }
}
