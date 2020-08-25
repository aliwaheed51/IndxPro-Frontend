import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { RightsService } from './rights.service';
import { Constant } from 'src/app/core/constants/constants';

@Directive({
  selector: '[editRights]'
})
export class EditRightsDirective {
  constructor(
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private rightsService: RightsService
  ) {}

  @Input() set editRights(screenCode: string) {
    this.rightsService.hasRights(screenCode, this.router.url, Constant.RightsType.Edit)
      ? this.viewContainerRef.createEmbeddedView(this.templateRef)
      : this.viewContainerRef.clear();
  }
}
