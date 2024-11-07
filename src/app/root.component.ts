import { AfterViewInit, Component, ComponentRef, OnDestroy, Type, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <div class="container">
      <ng-container #child></ng-container>
    </div>
  `
})
export class RootComponent implements AfterViewInit, OnDestroy {
  @ViewChild('child', { static: false, read: ViewContainerRef }) child: ViewContainerRef;
  componentRefs: ComponentRef<any>[] = [];

  ngAfterViewInit(): void {
    let content = { 'title': 'Render with component PageA' };
    const promise = import("./components/pageA.component").then(m => m.PageAComponent);
    promise.then(componentClass => {
      console.log('This clause is never called when prerendering with the new builder, but works on the legacy webpack prerender.')
      this.loadComponent(componentClass, this.child, content)
    });
  }

  // instantiate the component object and populate it with properties
  private loadComponent(componentClass: Type<object>, viewContainerRef: ViewContainerRef, content: object): void {
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentClass);
    Object.entries(content).map(([key, value]) => {
        componentRef.setInput(key, value);
      }
    );
    this.componentRefs.push(componentRef);
  }

  ngOnDestroy(): void {
    this.componentRefs.forEach(componentRef => componentRef.destroy());
  }
}
