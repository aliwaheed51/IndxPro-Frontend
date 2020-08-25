import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { IdproposalModel } from './idproposal.model';
import { UserService } from '../../masters/user/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { UtilityService } from 'src/app/core/services/utility.service';
import { IdproposalService } from './idproposal.service';
import { process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-idproposallist',
  templateUrl: './idproposallist.component.html',
 
})
export class IdproposallistComponent extends MasterPage<IdproposalModel> implements OnInit {
  constructor(public service: IdproposalService, private formBuilder: FormBuilder, private utils: UtilityService,) { super(service); }
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridView: any[];
  gridData: IdproposalModel[];
  data: any;
  ngOnInit(): void {
    this.GetData();

    this.initForm();
  }
  initForm(): void {
    this.form = this.formBuilder.group({
      companyId: ['', Validators.required],
      projectId: [''],
      paymentTerms: [''],
      proposalStatus: [''],
      proposalDate: [''],
      proposalValidDate: [''],
      currency: [''],
    });
  }

  GetData() {
    this.service.Get().subscribe(result => {
      if (result.result != null && result.result.length > 0) {
        this.gridData = result.result;
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
      this.data = data.result;
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
            field: 'project.projectName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'company.companyName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'proposalId',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'paymentTerms',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'proposalStatus',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'proposalValidDate',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'currency',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;
    this.dataBinding.skip = 0;
  }
}
