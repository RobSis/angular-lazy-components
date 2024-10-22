import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <div class="Basic">
      <h1>Component: Page B</h1>
      <h3>{{title}}</h3>
    </div>
  `
})
export class PageBComponent {
  @Input() title: any;
}
