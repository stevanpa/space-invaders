import { Extent } from './extent';
import { AlienState } from '../enums/alien-state';

export abstract class Alien {

    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    x: number;
    y: number;
    extent: Extent;
    state: AlienState;

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.extent = new Extent(x, y, x + this.width, y + this.height);
        this.state = AlienState.FirstImage;
    }

    abstract draw(state: AlienState);

    move(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.extent = new Extent(x, y, x + this.width, y + this.height);
        this.draw(this.state);
    }
}
