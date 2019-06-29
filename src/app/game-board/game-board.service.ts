import { Injectable, ComponentRef } from '@angular/core';

@Injectable()
export class GameBoardService {
    calculateWindowOffset(xPosition: number): number {
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        return scrollLeft + xPosition;
    }

  destroyChildElement(component: ComponentRef<any>) {
    component.destroy();
  }
}
