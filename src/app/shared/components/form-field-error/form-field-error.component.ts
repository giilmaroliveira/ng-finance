import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `<p class="text-danger">{{ errorMessage }}</p>`,
  styleUrls: ['./form-field-error.component.css'],
})
export class FormFieldErrorComponent implements OnInit {
  @Input() form!: AbstractControl;

  constructor() {}

  ngOnInit(): void {}

  public get errorMessage(): string | null {
    if (this.form?.invalid && this.form?.touched) {
      return this.getErrorMessage();
    }
    return null;
  }

  private getErrorMessage(): string | null {
    if (this.form?.errors?.['required']) {
      return 'dado obrigatório';
    }

    if (this.form?.errors?.['minlength']) {
      const { requiredLength } = this.form?.errors?.['minlength'];
      return `deve ter no mínimo ${requiredLength} caracteres`
    }

    if (this.form?.errors?.['maxlength']) {
      const { requiredLength } = this.form?.errors?.['maxlength'];
      return `deve ter no máximo ${requiredLength} caracteres`
    }

    if (this.form?.errors?.['email']) {
      return 'formato de e-mail inválido';
    }

    return null;
  }
}
