import { Type } from '@angular/core';

export class ComponentTabItem {
  constructor(public component: Type<any>, public componentId: string, public title: string, public selected: boolean, public data?: any) {}
}

export interface DynamicComponent {
  data: any;
}
