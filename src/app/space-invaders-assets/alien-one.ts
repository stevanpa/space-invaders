import { Alien } from './alien';
import { AlienState } from '../enums/alien-state';

export class AlienOne extends Alien {

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
        super(ctx, x, y, width, height);
    }

    draw(state: AlienState) {
        this.state = state;
        const sWidth = this.width;
        const sHeight = this.height;
        const dx = this.x;
        const dy = this.y;
        const dWidth = this.width;
        const dHeight = this.height;

        const img = new Image(32, 16);
        img.src = '../../assets/alien-one.png';
        switch (this.state) {
            case AlienState.FirstImage:
                this.ctx.drawImage(img, 0, 0, sWidth, sHeight, dx, dy, dWidth, dHeight);
                break;
            default:
                this.ctx.drawImage(img, 16, 0, sWidth, sHeight, dx, dy, dWidth, dHeight);
                break;
        }
    }
}
