import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { ComponentTabItem } from '../../dynamic-loading/dynamic-loading.models';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translate3d(0%, 0, 0)'
        })
      ),
      state(
        'out',
        style({
          transform: 'translate3d(-100%, 0, 0)'
        })
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
})
export class MenubarComponent implements OnInit {
  @Output() itemClicked: EventEmitter<ComponentTabItem> = new EventEmitter();
  menuState: string = 'out';
  mainMenu = '';
  subMenu = '';
  constructor() { }

  ngOnInit(): void { }
  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  getMainValue(selected: string) {
    if (selected) {
      this.mainMenu = selected;
      this.subMenu = '';
    }
  }

  getSubValue(selected: string) {
    if (selected) {
      this.subMenu = selected;
    }
  }
}
