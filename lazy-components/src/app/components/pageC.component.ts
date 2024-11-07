import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'page-c',
  template: `
    <div class="PageC">
      <h1>Component: Page C (lazy-loaded by router)</h1>
    </div>
  `
})
export class PageCComponent {
}
