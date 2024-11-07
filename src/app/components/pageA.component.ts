import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'page-a',
  template: `
    <div class="PageA">
      <h1>Component: Page A</h1>
      <h3>{{title}}</h3>
    </div>
  `
})
export class PageAComponent {
  @Input() title: any;
}
