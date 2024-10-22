import { Type } from '@angular/core';

export class AsyncComponentLoader {
  constructor(private loadFunc: () => Promise<Type<object>>) {}

  load() {
    console.log('load: ' + this.loadFunc);
    return this.loadFunc();
  }
}
