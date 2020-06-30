import { AlienOne } from './alien-one';
import { Alien } from './alien';
import { AlienState } from '../enums/alien-state';
import { Observable, of } from 'rxjs';

export class Aliens {

    aliens: Alien[][] = [];
    ctx: CanvasRenderingContext2D;
    moveRight: boolean;
    moveLeft: boolean;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.moveRight = true;
        this.moveLeft = false;
    }

    addAlienOne(offsetX: number) {
        this.aliens[0] = [];
        for (let i = 1; i < 12; i++) {
            this.aliens[0].push(new AlienOne(this.ctx, offsetX + (i * 32), 50, 16, 16));
        }
    }

    drawAlienOne(frameCount: number): Observable<number> {

        if (frameCount < 15) {
            this.aliens.forEach(row => row.forEach(alien => alien.draw(AlienState.FirstImage)));
        } else if (frameCount < 30) {
            this.aliens.forEach(row => row.forEach(alien => alien.draw(AlienState.SecondImage)));
        } else {
            this.aliens.forEach(row => {
                if (this.alienOneMoveRight(row)) {
                    // console.log('moveRight', this.moveRight, row[row.length - 1].x, this.ctx.canvas.width, row[row.length - 1].width);
                    row.forEach(alien => alien.move(alien.x + 5, alien.y));
                } else if (this.alienOneMoveLeft(row)) {
                    // console.log('moveLeft', this.moveLeft, row[0].x, row[0].width);
                    row.forEach(alien => alien.move(alien.x - 5, alien.y));
                } else if (this.alienOneMoveDown(row)) {
                    this.moveRight = false;
                    this.moveLeft = true;
                    row.forEach(alien => alien.move(alien.x, alien.y + 5));
                } else {
                    this.moveRight = true;
                    this.moveLeft = false;
                    row.forEach(alien => alien.move(alien.x, alien.y + 5));
                }
            });
            frameCount = 0;
        }

        return of(frameCount);
    }

    private alienOneMoveRight(row: Alien[]) {
        return this.moveRight && row[row.length - 1].x + (2 * row[row.length - 1].width) < this.ctx.canvas.width;
    }

    private alienOneMoveLeft(row: Alien[]) {
        return this.moveLeft && row[0].x > row[0].width;
    }

    private alienOneMoveDown(row: Alien[]) {
        return this.moveRight && row[row.length - 1].x + (2 * row[row.length - 1].width) > this.ctx.canvas.width;
    }
}
