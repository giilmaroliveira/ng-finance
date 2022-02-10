import { ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule,
    ToastrModule.forRoot(toastrConfig)
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: ToastrService, useClass: ToastrService }
  ]
})
export class SharedModule { }
