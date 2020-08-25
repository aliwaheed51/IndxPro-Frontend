import { TestModel } from './test.model';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class TestService extends BaseApiService<TestModel> {
  constructor(protected dataService: DataService) {
    super('test', dataService);
  }
}
