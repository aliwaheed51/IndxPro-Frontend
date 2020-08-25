import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { ItemTypeService } from './item-type.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { ItemTypeModel } from './item-type.model';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process, GroupDescriptor } from '@progress/kendo-data-query';

@Component({
  selector: 'app-item-typeList',
  templateUrl: './item-typeList.component.html',
})
export class ItemTypeListComponent extends MasterPage<ItemTypeModel>
  implements OnInit {
  public groups: GroupDescriptor[] = [
    { field: 'specificationTypeName' },
    { field: 'itemType' },
    { field: 'itemCategoryName' },
  ];
  constructor(
    public service: ItemTypeService,
    private formBuilder: FormBuilder,
    private utils: UtilityService
  ) {
    super(service);
  }
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridView: any[];
  gridData: ItemTypeModel[];
  data: any;
  ngOnInit(): void {
    this.GetData();
  }

  GetData() {
    // this.service.Get().subscribe((result) => {
    //   if (result) {
    //     this.gridData = result;
    //     for (const item of this.gridData) {
    //       item.specificationTypeName =
    //         item.specificationTypes.specificationName;
    //     }
    //      this.gridView= this.gridData;
    //   }
    // });
    this.gridData = this.service.GetStaticData();
    this.gridView = this.gridData;
  }

  onBack(): void {
    this.showDetails = false;
    this.GetData();
  }

  editClick(id: any) {
    // this.id = id;
    // this.service.getOneById(this.id).subscribe((data) => {
    //   this.showDetails = true;
    //   this.data = data;
    // });
    this.data = this.service.GetStaticDataById(id);
    this.showDetails = true;
  }

  addClick() {
    this.showDetails = true;
    this.data = null;
  }

  onDelete(id: number) {
    //this.utils.toast.recordDeleted();
    //this.service.delete(id).subscribe(
    //   () => {
    //     this.utils.toast.recordDeleted();
    //     this.GetData();
    //   },
    //   (failed) => {
    //     this.utils.toast.error(failed.error.message[0], 'Error');
    //   }
    // );
    this.service.DeleteStaticDataById(id);
    this.utils.toast.recordDeleted();
    this.GetData();
  }

  public onFilter(inputValue: string): void {
    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'specificationTypeName',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'itemType',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'itemCatogories',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'itemDescription',
            operator: 'contains',
            value: inputValue,
          },
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }
  public groupChange(groups: GroupDescriptor[]): void {
    this.groups = groups;
    this.GetData();
  }
}
