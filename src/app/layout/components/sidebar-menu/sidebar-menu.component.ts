import { UtilityService } from 'src/app/core/services/utility.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ComponentTabItem } from '../../dynamic-loading/dynamic-loading.models';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {
  @Output() itemClicked: EventEmitter<ComponentTabItem> = new EventEmitter();
  @Output() hideMenu: EventEmitter<void> = new EventEmitter();
  @Output() mainMenu: EventEmitter<string> = new EventEmitter();
  @Output() subMenu: EventEmitter<string> = new EventEmitter();

  modules = [];

  selectedModule: any;
  menuItems: ComponentTabItem[] = [];

  visability: boolean;
  target: any;
  currentModules: ComponentTabItem[] = [];
  currentOpenItems: any[] = [];

  constructor(private utils: UtilityService) {}

  ngOnInit(): void {
    const rights = this.utils.storage.CurrentUser.roleId;
    this.modules = [
      {
        id: 'mnu_usermanagement',
        name: 'User Management',
        icon: 'k-i-arrow-60-right',
        active: this.utils.storage.CurrentUser.isSuperAdmin,
      },
      {
        id: 'mnu_master',
        name: 'Masters',
        icon: 'k-i-arrow-60-right				',
        active: this.utils.storage.CurrentUser.isSuperAdmin,
      },
      {
        id: 'mnu_hr',
        name: 'HR',
        icon: 'k-i-arrow-60-right',
        active: rights.indexOf(1) !== -1,
      },
      {
        id: 'mnu_account',
        name: 'Account',
        icon: 'k-i-arrow-60-right',
        active: rights.indexOf(3) !== -1,
      },
      {
        id: 'mnu_designdirector',
        name: 'Design Director',
        icon: 'k-i-arrow-60-right',
        active: rights.indexOf(11) !== -1,
      },
      {
        id: 'mnu_idmanager',
        name: 'ID Manager',
        icon: 'k-i-arrow-60-right',
        active: rights.indexOf(2) !== -1,
      },
      {
        id: 'mnu_controlitems',
        name: 'Control Items',
        icon: 'k-i-arrow-60-right',
        active: this.utils.storage.CurrentUser.isSuperAdmin,
      },
      {
        id: 'mnu_timeSheets',
        name: 'Time Sheets',
        icon: 'k-i-arrow-60-right',
        active: this.utils.storage.CurrentUser.isSuperAdmin,
      },
    ];
    this.loadCurrentModule();
  }

  showDivs() {
    this.visability = true;
  }

  async loadCurrentModule() {
    await import('src/app/layout/masters/masters.module').then((result) =>
      result.menuItems.length
        ? result.menuItems.map((item) => this.currentModules.push(item))
        : ''
    );
    await import(
      'src/app/layout/user-management/user-management.module'
    ).then((result) =>
      result.menuItems.length
        ? result.menuItems.map((item) => this.currentModules.push(item))
        : ''
    );
    await import(
      'src/app/layout/general-configuration/general-configuration.module'
    ).then((result) =>
      result.menuItems.length
        ? result.menuItems.map((item) => this.currentModules.push(item))
        : ''
    );
    await import('src/app/layout/hr/hr.module').then((result) =>
      result.menuItems.length
        ? result.menuItems.map((item) => this.currentModules.push(item))
        : ''
    );
    await import('src/app/layout/account/account.module').then((result) =>
      result.menuItems.length
        ? result.menuItems.map((item) => this.currentModules.push(item))
        : ''
    );
    await import(
      'src/app/layout/DesignDirector/designdirector.module'
    ).then((result) =>
      result.menuItems.length
        ? result.menuItems.map((item) => this.currentModules.push(item))
        : ''
    );
    await import('src/app/layout/idmanager/idmanager.module').then((result) =>
      result.menuItems.length
        ? result.menuItems.map((item) => this.currentModules.push(item))
        : ''
    );
    await import(
      'src/app/layout/control-items/control-items.module'
    ).then((result) =>
      result.menuItems.length
        ? result.menuItems.map((item) => this.currentModules.push(item))
        : ''
    );
    await import('src/app/layout/timesheets/timesheets.module').then((result) =>
      result.menuItems.length
        ? result.menuItems.map((item) => this.currentModules.push(item))
        : ''
    );

    if (this.currentModules) {
      this.currentOpenItems =
        localStorage.getItem('currentOpenMenu') !== null
          ? JSON.parse(localStorage.getItem('currentOpenMenu'))
          : [];
      if (this.currentOpenItems.length) {
        this.currentOpenItems.map((x) => {
          this.loadItem(
            this.currentModules.find((y) => y.componentId === x.componentId)
          );
        });
      }
    }
  }

  async loadLazyModue(moduleToLoad: any) {
    let module: any;
    this.selectedModule = moduleToLoad;
    this.visability = false;
    if (moduleToLoad.id === 'mnu_master') {
      module = await import('src/app/layout/masters/masters.module');
    } else if (moduleToLoad.id === 'mnu_usermanagement') {
      module = await import(
        'src/app/layout/user-management/user-management.module'
      );
    } else if (moduleToLoad.id === 'mnu_configuration') {
      module = await import(
        'src/app/layout/general-configuration/general-configuration.module'
      );
    } else if (moduleToLoad.id === 'mnu_hr') {
      module = await import('src/app/layout/hr/hr.module');
    } else if (moduleToLoad.id === 'mnu_account') {
      module = await import('src/app/layout/account/account.module');
    } else if (moduleToLoad.id === 'mnu_designdirector') {
      module = await import(
        'src/app/layout/DesignDirector/designdirector.module'
      );
    } else if (moduleToLoad.id === 'mnu_idmanager') {
      module = await import('src/app/layout/idmanager/idmanager.module');
    } else if (moduleToLoad.id === 'mnu_controlitems') {
      module = await import(
        'src/app/layout/control-items/control-items.module'
      );
    } else if (moduleToLoad.id === 'mnu_timeSheets') {
      module = await import('src/app/layout/timesheets/timesheets.module');
    }

    if (module) {
      this.visability = true;
      const rights = this.utils.storage.Rights;
      const allItems = module.menuItems as ComponentTabItem[];
      // this.menuItems = allItems.filter((item) => rights.some((t) => t.screenCode === item.componentId));
      this.menuItems = allItems;
    }
    this.mainMenu.emit(this.selectedModule.name);
  }

  loadItem(item: ComponentTabItem) {
    const exists = this.currentOpenItems.find(
      (t) => t.componentId === item.componentId
    );
    if (exists) {
      exists.selected = true;
      this.currentOpenItems
        .filter((t) => t.componentId !== item.componentId)
        .forEach((tab) => (tab.selected = false));
    } else {
      this.currentOpenItems.forEach((tab) => (tab.selected = false));
      item.selected = true;
      this.currentOpenItems.push(item);
    }
    var resultItems = this.currentOpenItems.reduce((unique, o) => {
      if (!unique.some((obj) => obj.componentId === o.componentId)) {
        unique.push(o);
      }
      return unique;
    }, []);
    localStorage.setItem('currentOpenMenu', JSON.stringify(resultItems));
    this.visability = false;
    this.itemClicked.emit(item);
    this.subMenu.emit(item.title);
    this.hideMenu.emit();
  }
}
