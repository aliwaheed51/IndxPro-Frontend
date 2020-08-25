import { Injectable } from '@angular/core';
import { ClientModel } from './client.model';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { DataService } from 'src/app/core/services/data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService  extends BaseApiService<ClientModel>{
  asas  : ClientModel;
  constructor(protected dataService: DataService) {
    super('Client', dataService);
  }

  Get(): Observable<ClientModel> {
    return this.dataService.get<ClientModel>(`Client`);
  }

  GetOneById(id: number): Observable<ClientModel> {
    return this.dataService.get<ClientModel>(`Client`,id);
  }
}
