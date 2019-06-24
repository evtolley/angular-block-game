import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class GameBoardService {
    calculateWindowOffset(xPosition: number) {
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        return scrollLeft + xPosition;
    }
}