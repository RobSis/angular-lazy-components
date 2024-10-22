import {
  Input,
  Component,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  OnDestroy,
  ComponentRef,
  Type
} from '@angular/core';
import { AsyncComponentLoader } from "./AsyncComponentLoader";
import { PageAComponent } from "../components/pageA.component";
import { PageBComponent } from "../components/pageB.component";

export const ComponentMapping =  {
  "lazy-components:components/pageA": PageAComponent,
  // "lazy-components:components/pageB": PageBComponent,
  "lazy-components:components/pageB": new AsyncComponentLoader(() => import("src/app/components/pageB.component").then(m => m.PageBComponent))
};

// loads the correct component based on the template
// e.g.:
//{
//  "title": "Article Headline",
//  "author": "foo",
//  "text": "...",
//  "mgnl:template": "component-library:Article"
//} -> use component called Article to render this content.
@Component({
  standalone: true,
  selector: 'dynamic-loader',
  template: `
    <ng-container #child></ng-container>
  `
})
export class DynamicLoaderComponent implements OnChanges, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  @ViewChild('child', { static: false, read: ViewContainerRef }) child: ViewContainerRef;
  @Input() index? = 0;

  @Input() content: any = {};
  componentRefs: ComponentRef<any>[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.reloadComponent(changes['content'].currentValue);
  }

  ngOnDestroy(): void {
    this.componentRefs.forEach(componentRef => componentRef.destroy());
  }

  // find out which component to instantiate based on the content property
  private reloadComponent(content: object): void {
    if (!content) {
      return;
    }

    // Get the component class from mapping and create the instance
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const componentClassLoader = ComponentMapping[content["mgnl:template"]];
    if (componentClassLoader instanceof AsyncComponentLoader) {
      console.log('asynchronously load the component (lazy components)');
      setTimeout(() =>
        (componentClassLoader as AsyncComponentLoader)
          .load()
          .then((componentClass) => {
              return this.loadComponent(componentClass, this.child, content)
            }
          )
      );
    } else {
      console.log('normally imported component');
      setTimeout(() => this.loadComponent(componentClassLoader, this.child, content));
    }
  }

  // instantiate the component object and populate it with properties
  private loadComponent(componentClass: Type<object>, viewContainerRef: ViewContainerRef, content: object): void {
    // Get the view container and set content
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentClass);
    // pass the properties to the component
    Object.entries(content).map(([key, value]) => {
        componentRef.setInput(key, value);
      }
    );
    this.componentRefs.push(componentRef);
  }
}
