import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample-ui',
  templateUrl: './sample-ui.component.html',
  styleUrls: ['./sample-ui.component.scss']
})
export class SampleUiComponent implements OnInit {
  IsHidden= true;

  onSelect(){
   this.IsHidden= !this.IsHidden;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
