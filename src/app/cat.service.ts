import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Cat } from './cat';
import { MessageService } from './message.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class CatService {
    private catsUrl = 'api/cats';

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) { }


    getCats(): Observable<Cat[]> {
        return this.http.get<Cat[]>(this.catsUrl).pipe(
            tap(cats => this.log('fetched cats')),
            catchError(this.handleError('getCats', []))
        );
    }

    getCat(id: number): Observable<Cat> {
        const url = `${this.catsUrl}/${id}`;
        return this.http.get<Cat>(url).pipe(
            tap(_ => this.log(`fetched cat id="${id}`)),
            catchError(this.handleError<Cat>(`getCat id=${id}`))
        );
    }

    getCatNo404<Data>(id: number): Observable<Cat> {
        const url = `${this.catsUrl}/?id=${id}`;
        return this.http.get<Cat[]>(url)
            .pipe(
                map(cats => cats[0]), // {0|1} 要素の配列を返す
                tap(c => {
                    const outcome = c ? `fetched` : `did not find`;
                    this.log(`${outcome} cat id=${id}`);
                    }),
                catchError(this.handleError<Cat>(`getCat id=${id}`))
            );
    }

    /**
     * [setScript scriptタグを再描画するたびに読み込ませるため]
     */
    setScript(): void {
        var div = document.getElementById("div");
        var script = document.createElement('script');
        script.async = true;
        script.setAttribute('src',"https://platform.twitter.com/widgets.js");
        script.setAttribute('charset','utf-8');
        div.parentNode.insertBefore(script,div.nextSibling);
    }

    private log(message: string) {
        this.messageService.add(`HerCatoService: ${message}`);
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: リモート上のロギング基盤にエラーを送信する
            console.error(error); // かわりにconsoleに出力

            // TODO: ユーザーへの開示のためにエラーの変換処理を改善する
            this.log(`${operation} failed: ${error.message}`);

            // 空の結果を返して、アプリを持続可能にする
            return of(result as T);
        };
  }

    updateCat (cat: Cat): Observable<any> {
        return this.http.put(this.catsUrl, cat, httpOptions).pipe(
            tap(_ => this.log(`updated cat id=${cat.id}`)),
            catchError(this.handleError<any>('updateCat'))
        );
    }

    addCat (cat: Cat): Observable<Cat> {
        return this.http.post<Cat>(this.catsUrl, cat, httpOptions).pipe(
            tap((cat: Cat) => this.log(`add cat w/ id=${cat.id}`)),
            catchError(this.handleError<Cat>('addCat'))
        );
    }

    deleteCat (cat: Cat| number): Observable<Cat> {
        const id = typeof cat === 'number'? cat : cat.id;
        const url = `${this.catsUrl}/${id}`;

        return this.http.delete<Cat>(url, httpOptions).pipe(
            tap(_ => this.log(`delete cat id=${id}`)),
            catchError(this.handleError<Cat>('deleteCat'))
        );
    }

    searchCat (term: string): Observable<Cat[]> {
        if(!term.trim) {
            return of([]);
        }

        return this.http.get<Cat[]>(`${this.catsUrl}/?name=${term}`).pipe(
            tap(_ => this.log(`found cats matching "${term}"`)),
            catchError(this.handleError<Cat[]>('SearchingCat', []))
        );
    }
}
