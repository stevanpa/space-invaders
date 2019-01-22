import { BlockState } from '../enums/BlockState';
import { Extent } from './extent';

export class Block {

    ctx: CanvasRenderingContext2D;
    width = 44;
    height = 32;
    x: number;
    y: number;
    extent: Extent;
    state: BlockState;

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.extent = new Extent(x, y, x + this.width, y + this.height);
        this.state = BlockState.New;
        this.draw();
    }

    private draw() {
        const sWidth = this.width;
        const sHeight = this.height;
        const dx = this.x;
        const dy = this.y - this.height;
        const dWidth = this.width;
        const dHeight = this.height;

        const img = new Image();
        img.src = '../../assets/friendly-blocks.png';
        switch (this.state) {
            case BlockState.FirstDamage:
                this.ctx.drawImage(img, 124, 0, sWidth, sHeight, dx, dy, dWidth, dHeight);
                break;
            case BlockState.SecondDamage:
                this.ctx.drawImage(img, 168, 0, sWidth, sHeight, dx, dy, dWidth, dHeight);
                break;
            case BlockState.ThirdDamage:
                this.ctx.drawImage(img, 88, 0, sWidth, sHeight, dx, dy, dWidth, dHeight);
                break;
            case BlockState.FourthDamage:
                this.ctx.drawImage(img, 44, 0, sWidth, sHeight, dx, dy, dWidth, dHeight);
                break;
            default:
                this.ctx.drawImage(img, 0, 0, sWidth, sHeight, dx, dy, dWidth, dHeight);
                break;
        }
    }

    updateState() {
        this.draw();
    }
}
