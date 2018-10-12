import { Component, OnInit } from '@angular/core';

import { Cat } from '../cat';
import { CatService } from '../cat.service';

@Component({
    selector: 'app-cats',
    templateUrl: './cats.component.html',
    styleUrls: ['./cats.component.css']
})

export class CatsComponent implements OnInit {
    SelectedCat: Cat;
    cats: Cat[];

    constructor(private catService: CatService) { }

    ngOnInit() {
        this.getCats();
    }

    onSelect(cat: Cat): void {
        this.SelectedCat = cat;
    }

    getCats(): void {
        this.catService.getCats().subscribe(cats => this.cats = cats);
    }

    add(name: string, status: string, comment: string, no: string, user: string, userId: string, date: string): void {
        name = name.trim();
        if (!name) { return; }
        this.catService.addCat({ name, status, comment, no, user, userId, date } as Cat)
            .subscribe(cat => {
            this.cats.push(cat);
        });
    }

    delete(cat: Cat): void {
        this.cats = this.cats.filter(c => c !== cat);
        this.catService.deleteCat(cat).subscribe();
    }

}
