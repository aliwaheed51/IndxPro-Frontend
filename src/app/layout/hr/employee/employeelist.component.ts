import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { EmployeeModel } from './employee.model';
import { EmployeeService } from './employee.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormBuilder, Validators } from '@angular/forms';
import { process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
})
export class EmployeelistComponent extends MasterPage<EmployeeModel> implements OnInit {
  constructor(public service: EmployeeService, private formBuilder: FormBuilder, private utils: UtilityService,) { super(service); }
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridView: any[];
  gridData: EmployeeModel[];
  data: any;
  ngOnInit(): void {
    this.GetData();
    this.isSuperAdmin = this.utils.storage.CurrentUser.isSuperAdmin;
    this.initForm();
  }
  initForm(): void {
    this.form = this.formBuilder.group({
      employeeStatus: ['', Validators.required],
      employmentType: ['', Validators.required],
      departmentId: [''],
      address: ['', [Validators.required, Validators.email]],
      accountDetails: ['', Validators.required],
      costPerHour : [''],
      costPerHourProfit : ['']
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


  editClick(dataItem: any) {
    // this.utils.toast.warning("Module Under developement..");
    this.id = dataItem.id;
    this.form.reset();
    this.service.getOneById(this.id).subscribe((data) => {
      this.showDetails = true;
      this.data = data;
      if (data === null) {
        this.data = new EmployeeModel;
       
      }
     
      this.data.companyId = dataItem.companyId;
    });
  }

  addClick() {
    this.showDetails = true;
    this.data = null;
  }
  public hiddenColumns: string[] = [];
   
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
            field: 'users.firstName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'users.lastName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'employeeStatusText',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'employmentTypeText',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'address',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;

    
    this.dataBinding.skip = 0;
  }
  
}
