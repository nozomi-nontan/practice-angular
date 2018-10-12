import { Component, OnInit, Input, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

import { Cat } from '../cat';
import { CatService } from '../cat.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    cats: Cat[] = [];

    constructor(private catService: CatService, private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.getCats();
    }

    // 描画後にScriptを読み込む
    ngAfterContentChecked() {
        this.catService.setScript();
    }


    getCats(): void {
        this.catService.getCats().subscribe(cats => this.cats = cats.slice(0, 6));
    }

}
