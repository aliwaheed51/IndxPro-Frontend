import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemTypeModel } from './item-type.model';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { ItemTypeService } from './item-type.service';
import { SpecificationTypesService } from '../specification-types/specification-types.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-type',
  templateUrl: './item-type.component.html',
})
export class ItemTypeComponent extends MasterPage<ItemTypeModel>
  implements OnInit {
  specificationTypes: any;
  itemCategories: any;
  @Input() data: any;
  @Output() backClick: EventEmitter<any> = new EventEmitter();
  public mask: string = '(999) 00-000-00-00';
  public default = { value: 'Select item...', id: '' };
  public defaultCategory = { categoryName: 'Select item...', categoryCode: '' };
  constructor(
    public specificationTypesService: SpecificationTypesService,
    public service: ItemTypeService,
    private utils: UtilityService,
    private formBuilder: FormBuilder
  ) {
    super(service);
  }

  ngOnInit(): void {
    this.initForm();
    if (this.data != null && this.data.id > 0) {
      this.setdata(this.data);
    }
    this.getSpecificationTypes();
    this.getItemCategories();
  }

  getSpecificationTypes(): void {
    this.specificationTypesService
      .GetSpecificationTypesDropdown()
      .subscribe((result) => {
        if (result) {
          this.specificationTypes = result;
        }
      });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      specificationTypeID: ['', Validators.required],
      itemType: ['', Validators.required],
      itemCategoryID: ['', Validators.required],
      itemDescription: ['', Validators.required],
    });
  }

  onEdit(id: number): void {
    // this.id = id;
    // this.form.reset();
    // this.subs = this.service.getOneById(this.id).subscribe((data) => {
    //   this.showDetails = true;
    //   this.setdata(data);
    // });
    this.id = id;
    this.form.reset();
    this.showDetails = true;
    this.setdata(this.service.GetStaticDataById(this.id));
  }
  setdata(data: any): void {
    this.id = data.id;
    this.form.setValue({
      specificationTypeID: data.specificationTypeID,
      itemType: data.itemType,
      itemCategoryID: data.itemCategoryID,
      itemDescription: data.itemDescription,
    });
  }

  onSave(): void {
    const data = this.form.value;
    data.id = this.id;
    this.specificationTypes.forEach((item) => {
      if (data.specificationTypeID === item.id) {
        data.specificationTypeName = item.value;
      }
    });
    this.itemCategories.forEach((item) => {
      if (data.itemCategoryID === item.categoryId) {
        data.itemCategoryName = item.categoryName;
      }
    });
    //this.subs = this.service.save(data, this.id).subscribe((res) => {

    this.service.SaveStaticData(data);
    this.showDetails = false;
    this.utils.toast.recordSaved();
    this.backClick.emit();
    //});
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

  getItemCategories(): void {
    this.itemCategories = this.service.GetItemCategories();
  }
}
