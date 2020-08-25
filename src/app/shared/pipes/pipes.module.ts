import { NgModule } from '@angular/core';

import { GroupByPipe } from './groupBy.pipe';
import { DateFormat } from './dateFormat.pipe';
import { DateTimeFormat } from './dateFormatTime.pipe';
import { TimeFormat } from './timeFormat.pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [GroupByPipe, DateFormat, DateTimeFormat, TimeFormat, FilterPipe],
  imports: [],
  exports: [GroupByPipe, DateFormat, DateTimeFormat, TimeFormat, FilterPipe]
})
export class PipesModule {}
