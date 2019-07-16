import { Injectable } from "@angular/core";
import { GameConstants } from "../common/game-constants.enum";
import { HorizontalDirection } from "../common/horizontal-directions.enum";

@Injectable()
export class TargetService {

    shouldChangeDirection(currentLeftMargin: number, targetWidth: number, currentDirection: HorizontalDirection): boolean {
        if (currentLeftMargin <= 0 && currentDirection === HorizontalDirection.Left) {
            return true;
        }

        if (currentLeftMargin + targetWidth === GameConstants.GAMEBOARD_WIDTH && currentDirection === HorizontalDirection.Right) {
            return true;
        }

        return false;
    }

    changeDirection(direction: HorizontalDirection): HorizontalDirection {
        if (direction === HorizontalDirection.Left) {
            return HorizontalDirection.Right;
        }

        return HorizontalDirection.Left;
    }

    updateTargetLeftMargin(currentLeftMargin: number, currentDirection: HorizontalDirection): number {
        if (currentDirection === HorizontalDirection.Left) {
            return currentLeftMargin - 1;
        }

        return currentLeftMargin + 1;
    }
}
