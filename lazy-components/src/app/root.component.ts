import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { DynamicLoaderComponent } from "./dynamic/dynamic-loader";

@Component({
  standalone: true,
  imports: [DynamicLoaderComponent],
  template: `
    <div class="container">
      <dynamic-loader [content]="content"> </dynamic-loader>
    </div>
  `
})
export class RootComponent {
  @Input() content: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // refresh the content on navigation event
    this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationEnd) {
        await this.getContent(event.url);
      }
    });
  }

  async getContent(url: string) {
    // http://localhost:4200/pageA -> fetch http://localhost:8888/api/pageA
    this.http
      .get(
        `http://localhost:8888/api${url}`
      )
      .subscribe((content) => {
        this.content = content;
      });
  }
}
