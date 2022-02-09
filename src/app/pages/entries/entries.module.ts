import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';

import { EntriesRoutingModule } from './entries-routing.module';

import { EntryListComponent } from './entry-list/entry-list.component';

import { CalendarModule } from 'primeng/calendar';
import { IMaskModule} from 'angular-imask';

@NgModule({
  declarations: [
    EntryListComponent
  ],
  imports: [
    SharedModule,
    EntriesRoutingModule,
    CalendarModule,
    IMaskModule
  ]
})
export class EntriesModule { }
