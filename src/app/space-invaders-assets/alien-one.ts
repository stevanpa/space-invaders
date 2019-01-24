import { Alien } from './alien';
import { AlienState } from '../enums/alien-state';

export class AlienOne extends Alien {

    // frameCount = 0;

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
        super(ctx, x, y, width, height);
        // this.draw(AlienState.FirstImage);
    }

    draw(state: AlienState) {
        this.state = state;
        // this.frameCount ++;
        // if (this.frameCount < 15) {
        //     return;
        // }
        // if (state > AlienState.SecondImage) {
        //     this.state = AlienState.FirstImage;
        // }
        const sWidth = this.width;
        const sHeight = this.height;
        const dx = this.x;
        const dy = this.y;
        const dWidth = this.width;
        const dHeight = this.height;

        // this.ctx.clearRect(dx, dy, dWidth, dHeight);

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

        // this.frameCount = 0;
        // this.state ++;
    }
}
