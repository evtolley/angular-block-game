import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { timer, BehaviorSubject } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';
import { TargetService } from './target.service';
import { HorizontalDirection } from '../common/horizontal-directions.enum';

@Component({
    selector: 'target',
    templateUrl: './target.component.html',
    styleUrls: ['./target.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class TargetComponent implements OnInit, OnDestroy {

    constructor(private targetService: TargetService) {}

    componentIsActive = true;
    speed: number;
    leftMargin = 0;
    currentDirection = HorizontalDirection.Right;

    leftMargin$ = new BehaviorSubject<string>('0px');

    ngOnInit() {
        // TO DO: Remove hard coded speed
        this.speed = 2;

        timer(0, this.speed).pipe(
            takeWhile(() => this.componentIsActive),
            map(() => {
                if (this.targetService.shouldChangeDirection(this.leftMargin, 80, this.currentDirection)) {
                    this.currentDirection = this.targetService.changeDirection(this.currentDirection);
                }

                this.leftMargin = this.targetService.updateTargetLeftMargin(this.leftMargin, this.currentDirection);
                this.leftMargin$.next(`${this.leftMargin}px`);
            })
        ).subscribe();
    }

    ngOnDestroy() {
        this.componentIsActive = false;
    }
  }
