import { Injectable } from '@angular/core';
import { Constant } from 'src/app/core/constants/constants';
import { StorageService } from 'src/app/core/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class RightsService {
  constructor(private storageService: StorageService) {}

  hasRights(screenCode: string, url: string, rightsType: string, recorId: number = 0): boolean {
    const rights = this.storageService.Rights;
    if (!rights) {
      return false;
    }

    if (recorId > 0) {
      rightsType = Constant.RightsType.Edit;
    }

    if (!screenCode) {
      return false;
    }

    return rights.some((item) => {
      return item.screenCode === screenCode && item[rightsType];
    });
  }
}
