import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-idprojectpricing',
  templateUrl: './idprojectpricing.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./idprojectpricing.component.scss']
})
export class IdProjectPricing implements OnInit {
  constructor() { }
  public listItems: Array<string> = ["NOVOTEL Kinshasa", "CTC Congo", "ROTANA TANMIA HOTEL", "AQBURA RESORT PH 1", "HH Project Hotel Building", "Dusit Princess Nairobi", "NOVOTEL Lubumbashi", "Movenpick Salalah", "Khor Fakkan", "Beach Restaurant Movenpick Salalah"];
  ngOnInit(): void { }
}