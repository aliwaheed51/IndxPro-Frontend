import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { RightsService } from './rights.service';
import { Constant } from 'src/app/core/constants/constants';

@Directive({
  selector: '[deleteRights]'
})
export class DeleteRightsDirective {
  constructor(
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private rightsService: RightsService
  ) {}

  @Input() set deleteRights(screenCode: string) {
    this.rightsService.hasRights(screenCode, this.router.url, Constant.RightsType.Delete)
      ? this.viewContainerRef.createEmbeddedView(this.templateRef)
      : this.viewContainerRef.clear();
  }
}
