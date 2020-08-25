import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleUiComponent } from './sample-ui.component';

describe('SampleUiComponent', () => {
  let component: SampleUiComponent;
  let fixture: ComponentFixture<SampleUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
