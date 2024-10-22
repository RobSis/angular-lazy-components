import {
  OnSameUrlNavigation,
  PreloadAllModules,
  RouterFeatures,
  Routes,
  withEnabledBlockingInitialNavigation,
  withPreloading,
  withRouterConfig
} from '@angular/router';

import { RootComponent } from './root.component';

export const routes: Routes = [
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
  withPreloading(PreloadAllModules), // <- comment this line for activate lazy load
  // withHashLocation()
  withEnabledBlockingInitialNavigation(),
  withRouterConfig(config)
];
