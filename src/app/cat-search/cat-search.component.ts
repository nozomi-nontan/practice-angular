import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'

import { Cat } from '../cat';
import { CatService } from '../cat.service';

@Component({
  selector: 'app-cat-search',
  templateUrl: './cat-search.component.html',
  styleUrls: ['./cat-search.component.css']
})

export class CatSearchComponent implements OnInit {
  cats$: Observable<Cat[]>;

  private searchTerms = new Subject<string>();

  constructor(private catService: CatService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.cats$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.catService.searchCat(term)),
    );
  }

}
