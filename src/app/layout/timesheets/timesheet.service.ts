import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { TimeSheetModel } from './timesheet.model';
import { DataService } from 'src/app/core/services/data.service';

@Injectable({
  providedIn: 'root',
})
export class TimeSheetService extends BaseApiService<TimeSheetModel> {
  staticData: TimeSheetModel[];
  constructor(protected dataService: DataService) {
    super('timeSheet', dataService);
    this.staticData = [
      {
        id: 1,
        company: 'Avengers',
        companyId: 1,
        employee: 'Nick Fury',
        project: 'SHIELD',
        projectId: 1,
        projectArea: 'Director',
        projectAreaId: 1,
        designStage: 'In Development',
        designStageId: 2,
        deliverable: 'Ships',
        deliverableId: 1,
        subDeliverable: 'Jets',
        subDeliverableId: 1,
        remarks: 'Super hero',
        checkin: this.GetDateTime(new Date()),
        checkout: this.GetDateTime(new Date()),
      },
      {
        id: 2,
        company: 'Avengers',
        companyId: 1,
        employee: 'Iron man',
        project: 'Stark Industries',
        projectId: 2,
        projectArea: 'Technical Lead',
        projectAreaId: 2,
        designStage: 'In Development',
        designStageId: 2,
        deliverable: 'Iron man suits',
        deliverableId: 2,
        subDeliverable: 'Mark 3',
        subDeliverableId: 2,
        remarks: 'Super hero',
        checkin: this.GetDateTime(new Date()),
        checkout: this.GetDateTime(new Date()),
      },
      {
        id: 3,
        company: 'Avengers',
        companyId: 1,
        employee: 'Thor',
        project: 'SHIELD',
        projectId: 1,
        projectArea: 'Asgard',
        projectAreaId: 3,
        designStage: 'In Development',
        designStageId: 2,
        deliverable: 'Hammer',
        deliverableId: 3,
        subDeliverable: 'Hammer & Axe',
        subDeliverableId: 3,
        remarks: 'Super hero',
        checkin: this.GetDateTime(new Date()),
        checkout: this.GetDateTime(new Date()),
      },
    ];
  }

  GetStaticData() {
    return this.staticData;
  }
  GetDateTime(date: Date) {
    let dateFormat = require('dateformat');
    var formatted = dateFormat(date, 'dS mmm , yyyy, h:MM TT');
    return formatted;
  }

  GetCompanies() {
    return [
      {
        id: '1',
        value: 'Avengers',
      },
      {
        id: '2',
        value: 'Super Leauge',
      },
    ];
  }

  GetProjects() {
    return [
      {
        id: '1',
        value: 'SHIELD',
      },
      {
        id: '2',
        value: 'Stark Industries',
      },
    ];
  }

  GetProjectAreas() {
    return [
      {
        id: '1',
        value: 'Director',
      },
      {
        id: '2',
        value: 'Technical Lead',
      },
      {
        id: '3',
        value: 'Asgard',
      },
    ];
  }

  GetDesignStages() {
    return [
      {
        id: '1',
        value: 'Open',
      },
      {
        id: '2',
        value: 'In Development',
      },
      {
        id: '3',
        value: 'In Review',
      },
    ];
  }

  GetDeliverables() {
    return [
      {
        id: '1',
        value: 'Ships',
      },
      {
        id: '2',
        value: 'Iron man suits',
      },
      {
        id: '3',
        value: 'Hammer',
      },
    ];
  }

  GetSubDeliverables() {
    return [
      {
        id: '1',
        value: 'Jets',
      },
      {
        id: '2',
        value: 'Mark 3',
      },
      {
        id: '3',
        value: 'Hammer & Axe',
      },
    ];
  }

  SaveData(data: any) {
    data as TimeSheetModel;
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

  GetDataById(id: number) {
    var data: any;
    this.staticData.forEach((item) => {
      if (item.id === id) {
        data = item;
      }
    });
    return data;
  }
}
