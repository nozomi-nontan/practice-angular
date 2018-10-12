import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

import { Cat } from '../cat';
import { CatService } from '../cat.service';

@Component({
    selector: 'app-cat-detail',
    templateUrl: './cat-detail.component.html',
    styleUrls: ['./cat-detail.component.css']
})
export class CatDetailComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private catService: CatService,
        private location: Location,
    ) { }
  @Input() cat; Cat;

    ngOnInit() {
        this.getCat();
        // this.catService.setScript();
    }

    // 描画後にScriptを読み込む
    ngAfterContentChecked() {
        this.catService.setScript();
    }

    getCat(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.catService.getCat(id).subscribe(cat => this.cat = cat);
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.catService.updateCat(this.cat).subscribe(() => this.goBack());
    }

}
