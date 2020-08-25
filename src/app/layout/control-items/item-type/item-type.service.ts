import { Injectable } from '@angular/core';
import { ItemTypeModel } from './item-type.model';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root',
})
export class ItemTypeService extends BaseApiService<ItemTypeModel> {
  staticData: ItemTypeModel[];
  constructor(protected dataService: DataService) {
    super('itemType', dataService);
    this.staticData = [
      {
        id: 1,
        itemType: 'Text1',
        specificationTypeName: 'Specification Types List 3',
        itemDescription: 'Item Desc',
        itemCategories: 'Test',
        itemCategoryName: 'Test',
        itemCategoryID: 1,
        specificationTypeID: 13,
        specificationTypes: 'spec Types',
      },
      {
        id: 2,
        itemType: 'Text2',
        specificationTypeName: 'Specification Types List 2',
        itemDescription: 'Item Desc',
        itemCategories: 'Test',
        itemCategoryName: 'Test',
        itemCategoryID: 1,
        specificationTypeID: 11,
        specificationTypes: 'spec Types',
      },
      {
        id: 3,
        itemType: 'Text3',
        specificationTypeName: 'Specification Types List 1',
        itemDescription: 'Item Desc',
        itemCategories: 'Test',
        itemCategoryName: 'Test',
        itemCategoryID: 1,
        specificationTypeID: 12,
        specificationTypes: 'spec Types',
      },
      {
        id: 4,
        itemType: 'Text4',
        specificationTypeName: 'Specification Types List 3',
        itemDescription: 'Item Desc',
        itemCategories: 'Test2',
        itemCategoryName: 'Test2',
        itemCategoryID: 2,
        specificationTypeID: 13,
        specificationTypes: 'spec Types',
      },
      {
        id: 5,
        itemType: 'Text5',
        specificationTypeName: 'Specification Types List 12',
        itemDescription: 'Item Desc',
        itemCategories: 'Test2',
        itemCategoryName: 'Test2',
        itemCategoryID: 2,
        specificationTypeID: 11,
        specificationTypes: 'spec Types',
      },
      {
        id: 6,
        itemType: 'Text6',
        specificationTypeName: 'Specification Types List 11',
        itemDescription: 'Item Desc',
        itemCategories: 'Test3',
        itemCategoryName: 'Test3',
        itemCategoryID: 3,
        specificationTypeID: 12,
        specificationTypes: 'spec Types',
      },
    ];
  }

  Get(): Observable<ItemTypeModel[]> {
    return this.dataService.get<ItemTypeModel[]>(`itemType`);
  }
  GetStaticData() {
    return this.staticData;
  }
  GetStaticDataById(id: number) {
    var data: any;
    this.staticData.forEach((item) => {
      if (item.id === id) {
        data = item;
      }
    });
    return data;
  }
  GetItemCategories() {
    return [
      {
        categoryCode: '001',
        categoryName: 'Test',
        categoryId: 1,
      },
      {
        categoryCode: '002',
        categoryName: 'Test2',
        categoryId: 2,
      },
      {
        categoryCode: '003',
        categoryName: 'Test3',
        categoryId: 3,
      },
    ];
  }
  SaveStaticData(data: any) {
    data as ItemTypeModel;
    if (!data.id) {
      this.staticData.push(data);
    } else {
      this.staticData.forEach((item, index) => {
        if (item.id === data.id) {
          this.staticData[index] = data;
        }
      });
    }
  }
  DeleteStaticDataById(id: number) {
    this.staticData.forEach((item, index) => {
      if (item.id === id) {
        this.staticData.splice(index, 1);
      }
    });
  }
}
