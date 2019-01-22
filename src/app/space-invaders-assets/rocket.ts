import { Extent } from './extent';

export class Rocket {

    ctx: CanvasRenderingContext2D;
    width = 3;
    height = 5;
    x: number;
    y: number;
    extent: Extent;
    private color = `rgb(0, 255, 33)`;

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.extent = new Extent(x, y, x + this.width, y + this.height);
        this.draw();
    }

    updateRocket(dy: number) {
        this.y -= dy;
        this.extent.miny = this.y;
        this.extent.maxy = this.y + this.height;
        this.draw();
    }

    private draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
