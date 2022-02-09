import { Entry } from './../shared/entry.model';
import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { EntryService } from './../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css'],
})
export class EntryListComponent implements OnInit {
  constructor(
    private entryService: EntryService,
    private toastr: ToastrService
  ) {}

  entries: Entry[] = [];

  ngOnInit(): void {
    this.getAll();
  }

  remove(entry: Entry) {
    this.entryService.delete(entry.id as number).subscribe(
      (response) => {
        this.toastr.success('Lançamento excluído com sucesso');
        this.getAll();
      },
      (error) => console.log('error => ', error)
    );
  }

  getAll() {
    this.entryService.getAll().subscribe(
      (response) => {
        this.entries = response;
      },
      (error) => console.log('error => ', error)
    );
  }
}
