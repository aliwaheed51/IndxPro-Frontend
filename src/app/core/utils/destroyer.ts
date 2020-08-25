import { Subscription } from "rxjs";
import { OnDestroy, Directive } from "@angular/core";
import { SubSink } from "subsink";

// TODO: Add Angular decorator.
@Directive({selector: '[Destroyer]'})
export class Destroyer implements OnDestroy {
  private subSink = new SubSink();
  set subs(value: Subscription) {
    this.subSink.sink = value;
  }
  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
