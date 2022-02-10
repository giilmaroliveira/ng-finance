import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css'],
})
export class EntryFormComponent implements OnInit, AfterContentChecked {
  entryForm!: FormGroup;
  entry: Entry = new Entry();
  entryId?: number;
  pageTitle: string = '';
  categories: Category[] = [];

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ',',
  };

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    monthNamesShort: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
    today: 'Hoje',
    clear: 'Limpar',
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private entryService: EntryService,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.entryId = +id;
      this.loadEntry();
    }
    this.loadCategories();
    this.buildEntryForm();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

    if (this.entryId === undefined) {
      this.create(entry);
    } else {
      this.update(entry);
    }
  }

  // Private Methods
  private buildEntryForm(): void {
    this.entryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ['expense', [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });
  }

  private create(entry: Entry) {
    this.entryService.create(entry).subscribe(
      (response) => {
        this.toastr.success('Lançamento incluído com sucesso');
        this.router.navigate(['/entries']);
      },
      (error) => console.log('error => ', error)
    );
  }

  private update(entry: Entry) {
    this.entryService.update(entry).subscribe(
      (response) => {
        this.toastr.success('Lançamento editado com sucesso');
        this.router.navigate(['/entries']);
      },
      (error) => console.log('error => ', error)
    );
  }

  private loadEntry() {
    this.entryService.getById(this.entryId as number).subscribe(
      (response) => {
        this.entry = response;
        this.entryForm.patchValue(this.entry);
      },
      (error) => console.log('error => ', error)
    );
  }

  private setPageTitle(): void {
    if (this.entryId === undefined) {
      this.pageTitle = 'Cadastro de Novo Lançamento';
    } else {
      const name = this.entry.name || '';
      this.pageTitle = `Editando Lançamento: ${name}`;
    }
  }

  private loadCategories(): void {
    this.categoryService
      .getAll()
      .subscribe((categories) => (this.categories = categories));
  }
}
