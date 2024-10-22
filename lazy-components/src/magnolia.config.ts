import { PageAComponent } from "./app/components/pageA.component";
import {AsyncComponentLoader} from "./app/dynamic/AsyncComponentLoader";
import {PageBComponent} from "./app/components/pageB.component";

export const config = {
  componentMapping: {
    "lazy-components:components/pageA": PageAComponent,
    // "lazy-components:components/pageB": PageBComponent,
    "lazy-components:components/pageB": new AsyncComponentLoader(() => import("src/app/components/pageB.component").then(m => m.PageBComponent))
  },
};
