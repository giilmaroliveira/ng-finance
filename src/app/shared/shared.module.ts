import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

const toastrConfig = {
  timeOut: 5000,
  positionClass: 'toast-top-right',
  preventDuplicates: true,
};

@NgModule({
  declarations: [
    FormFieldErrorComponent,
    BreadcrumbComponent,
    PageHeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(toastrConfig),
    RouterModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldErrorComponent,
    BreadcrumbComponent,
    PageHeaderComponent
  ],
  providers: [
    { provide: ToastrService, useClass: ToastrService }
  ]
})
export class SharedModule { }
