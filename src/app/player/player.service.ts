import { Injectable } from '@angular/core';
import { GameConstants } from '../common/game-constants';

@Injectable()
export class PlayerService {
    calculatePlayerCurrentLeftMargin(leftMargin: number, windowMousePosition: number): number {
        return windowMousePosition - leftMargin - (GameConstants.PLAYER_WIDTH / 2);
    }

    calculatePlayerMaxLeftMargin(windowOffset: number): number {
        return GameConstants.GAMEBOARD_WIDTH - (GameConstants.PLAYER_WIDTH / 2) + windowOffset;
    }

    calculatePlayerMinLeftMargin(windowOffset: number): number {
        return (GameConstants.PLAYER_WIDTH / 2) + windowOffset;
    }

    calculateShooterXPosition(windowOffset: number, windowMousePosition: number) {
        return windowMousePosition - windowOffset - (GameConstants.PROJECTILE_DIMENSIONS / 2);
    }
}
