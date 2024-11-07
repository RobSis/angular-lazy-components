import {
  OnSameUrlNavigation,
  RouterFeatures,
  Routes,
  withEnabledBlockingInitialNavigation,
  withRouterConfig
} from '@angular/router';

import { RootComponent } from './root.component';

export const routes: Routes = [
  {
    // lazy-loading in Router - supported
    path: 'pageC',
    loadComponent: () => import('./components/pageC.component').then(m => m.PageCComponent)
  },
  {
    path: '**',
    component: RootComponent,
    pathMatch: 'full'
  }
];

const config = {
  onSameUrlNavigation: 'reload' as OnSameUrlNavigation
};

export const routerFeatures: RouterFeatures[] = [
  withEnabledBlockingInitialNavigation(),
  withRouterConfig(config)
];
