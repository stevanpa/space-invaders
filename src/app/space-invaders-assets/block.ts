import { BlockState } from '../enums/block-state';
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
        // console.log(this.extent);
    }

    draw() {
        const sWidth = this.width;
        const sHeight = this.height;
        const dx = this.x;
        const dy = this.y;
        const dWidth = this.width;
        const dHeight = this.height;

        const img = new Image(212, 32);
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
                // this.ctx.strokeStyle = 'red';
                // this.ctx.lineWidth = 2;
                // this.ctx.strokeRect(this.extent.minx, this.extent.miny,
                //     this.extent.maxx - this.extent.minx, this.extent.maxy - this.extent.miny);
                break;
        }
    }
}
