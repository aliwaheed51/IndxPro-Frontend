import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from './user.model';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { UserService } from './user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/core/services/utility.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',

})
export class UserlistComponent extends MasterPage<UserModel> implements OnInit {
  constructor(public service: UserService, private formBuilder: FormBuilder, private utils: UtilityService,) { super(service); }
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridView: any[];
  gridData: UserModel[];
  data: any;
  ngOnInit(): void {
    this.GetData();

    this.initForm();
  }
  initForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      userName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: [''],
      email: ['', [Validators.required, Validators.email]],
      companyId: ['', Validators.required],
      userType: [''],
      address: [''],
      password: ['', Validators.required],
      isEmailVerify: [false],
      isEmployee : [false],
      userRoleId : ['']
    });
  }

  GetData() {
    this.service.Get().subscribe(result => {
      if (result.length > 0) {
        this.gridData = result;
        this.gridView = this.gridData;
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


  public onFilter(inputValue: string): void {
    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'firstName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'lastName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'mobile',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'email',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'userName',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;


    this.dataBinding.skip = 0;
  }
}
