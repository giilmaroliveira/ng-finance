import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';

import { EntriesRoutingModule } from './entries-routing.module';

import { EntryListComponent } from './entry-list/entry-list.component';

@NgModule({
  declarations: [
    EntryListComponent
  ],
  imports: [
    SharedModule,
    EntriesRoutingModule
  ]
})
export class EntriesModule { }
