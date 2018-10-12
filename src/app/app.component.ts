import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (private router: ActivatedRoute) {}

  title = 'I LOVE CAT!!!!!';
  setMenu(): string {
    return window.location.href.replace(/^.*.(\/.*.$)/, '$1');
  }
}
