import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dinamic-styles';
  cssUrl:string
  constructor(public sanitizer: DomSanitizer) {
    this.cssUrl = '\assets\containerIndex.css';
  }
}
