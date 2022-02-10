import { Component, OnInit, Input } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `<p class="text-danger">{{ errorMessage }}</p>`,
  styleUrls: ['./form-field-error.component.css'],
})
export class FormFieldErrorComponent implements OnInit {
  @Input() formControl!: AbstractControl | null;

  constructor() {}

  ngOnInit(): void {}

  public get errorMessage(): string | null {
    if (this.formControl?.invalid && this.formControl?.touched) {
      return this.getErrorMessage();
    }
    return null;
  }

  private getErrorMessage(): string | null {
    if (this.formControl?.errors?.['required']) {
      return 'dado obrigatório';
    }
    return null;
  }
}
