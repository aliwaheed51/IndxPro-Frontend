import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { CompanyDepartmentService } from './company-department.service';
import { CompanyDepartmentModel } from './company-department.model';
import { FormBuilder, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/core/services/utility.service';
import { process } from '@progress/kendo-data-query';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
@Component({
  selector: 'app-company-departmentlist',
  templateUrl: './company-departmentlist.component.html',
  
})
export class CompanyDepartmentlistComponent extends MasterPage<CompanyDepartmentModel> implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  constructor(public service: CompanyDepartmentService, private formBuilder: FormBuilder, private utils: UtilityService,) { super(service); }
  gridData: CompanyDepartmentModel[];
  public gridView: any[];

  data : any;
  ngOnInit(): void {
    this.GetData();
    this.initForm();
  }
  initForm(): void {
    this.form = this.formBuilder.group({
      departmentName: ['', Validators.required],
      companyId :  ['', Validators.required],
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
  public onFilter(inputValue: string): void {
    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'companyName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'departmentName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'company.companyName',
            operator: 'contains',
            value: inputValue
          },
          
        ],
      }
    }).data;


    this.dataBinding.skip = 0;
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
        this.GetData() ;
      },
      (failed) => {
        this.utils.toast.error(failed.error.message[0], 'Error');
      }
    );
  }

  onBack(): void {
    this.showDetails = false;
    this.GetData();
  }

}
