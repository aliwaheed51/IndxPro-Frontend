import { Component, OnInit } from '@angular/core';
import { ComponentTabItem } from '../dynamic-loading.models';
import { SelectEvent } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-dynamic-container',
  templateUrl: './dynamic-container.component.html'
})
export class DynamicContainerComponent implements OnInit {
  tabItems: ComponentTabItem[] = [];
  menuItems: ComponentTabItem[] = [];
  constructor() {}

  ngOnInit(): void {
    this.initiazeMenuItems();
  }
  public onTabSelect(e: SelectEvent) {
    for (let i = 0; i < this.tabItems.length; i++) {
      this.tabItems[i].selected = (i === e.index) ? true : false;
    }
    localStorage.setItem("currentOpenMenu", JSON.stringify(this.tabItems));
  }

  initiazeMenuItems() {
    // this.menuItems.push(new ComponentTabItem(CountryComponent, 'country', 'Country', null));
    // this.menuItems.push(new ComponentTabItem(StateComponent, 'state', 'State', null));
    // this.menuItems.push(new ComponentTabItem(CityComponent, 'city', 'City', null));
    // this.menuItems.push(new ComponentTabItem(AreaComponent, 'are', 'Area', null));
  }

  addTabItem(newItem: ComponentTabItem) {
    const exists = this.tabItems.find((t) => t.componentId === newItem.componentId);
    if (exists) {
      exists.selected = true;
      this.tabItems.filter((t) => t.componentId !== newItem.componentId).forEach((tab) => (tab.selected = false));
    } else {
      this.tabItems.forEach((tab) => (tab.selected = false));
      newItem.selected = true;
      this.tabItems.push(newItem);
    }
  }

  removeTabItem(removeItem: ComponentTabItem) {
    if (removeItem.selected) {
      let i = this.tabItems.indexOf(removeItem);
      if (i < this.tabItems.length - 1) {
        i += 1;
      } else {
        i -= 1;
      }

      const id = this.tabItems[i].componentId;
      const exists = this.tabItems.find((t) => t.componentId === id);
      exists.selected = true;
    }
    this.tabItems = this.tabItems.filter((item) => item !== removeItem);
    localStorage.setItem("currentOpenMenu", JSON.stringify(this.tabItems));
  }

  // async loadLazyModue(id: string) {
  //   let module: any;
  //   if (id === 'lazy') {
  //     module = await import('src/app/dynamic-loading/component/lazy/lazy.module');
  //   } else if (id === 'lazy2') {
  //     module = await import('src/app/dynamic-loading/component/lazy2/lazy2.module');
  //   }
  //   if (module) {
  //     const items: ComponentTabItem[] = module.menuItems as ComponentTabItem[];
  //     this.menuItems.push(...items);
  //   }
  // }
}
