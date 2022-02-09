import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastrModule, ToastrService } from 'ngx-toastr';

const toastrConfig = {
  timeOut: 5000,
  positionClass: 'toast-top-right',
  preventDuplicates: true,
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot(toastrConfig)
  ],
  exports: [
    CommonModule
  ],
  providers: [
    { provide: ToastrService, useClass: ToastrService }
  ]
})
export class SharedModule { }
