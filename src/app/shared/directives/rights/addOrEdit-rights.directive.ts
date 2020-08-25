import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { RightsService } from './rights.service';
import { Constant } from 'src/app/core/constants/constants';

@Directive({
  selector: '[addOrEditRights]'
})
export class AddOrEditRightsDirective {
  @Input() recordId: number;
  constructor(
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private rightsService: RightsService
  ) {}

  @Input() set addOrEditRights(screenCode: string) {
    const url = this.router.url;
    let rightsType = Constant.RightsType.Add;
    this.rightsService.hasRights(screenCode, url, rightsType, this.recordId)
      ? this.viewContainerRef.createEmbeddedView(this.templateRef)
      : this.viewContainerRef.clear();
  }
}
