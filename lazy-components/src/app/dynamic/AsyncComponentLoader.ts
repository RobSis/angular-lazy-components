import { Type } from '@angular/core';

export class AsyncComponentLoader {
  constructor(private loadFunc: () => Promise<Type<object>>) {}

  load() {
    console.log('load: ' + this.loadFunc);
    // legacy:
    // load: ()=>__webpack_require__.e(366).then(__webpack_require__.bind(__webpack_require__,4366)).then(m=>m.PageBComponent)
    // new builder:
    // load: ()=>import("./chunk-CWC6WKNZ.mjs").then(o=>o.PageBComponent)
    return this.loadFunc();
  }
}
