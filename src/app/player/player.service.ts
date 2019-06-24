import { Injectable } from '@angular/core';

@Injectable()
export class PlayerService {
    calculatePlayerPosition(leftMargin: number, windowMousePosition: number) : string {
        return windowMousePosition - leftMargin + 'px';
    }
}