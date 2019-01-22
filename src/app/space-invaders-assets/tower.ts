import { Rocket } from './rocket';

export class Tower {

    ctx: CanvasRenderingContext2D;
    canvasWidth: number;
    canvasHeight: number;
    towerExplodedX = 26;
    towerHeight = 16;
    towerWidth = 26;
    towerX: number;
    towerExploded = false;
    rockets: Rocket[] = [];
    rightPressed = false;
    leftPressed = false;

    constructor(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.towerX = (this.canvasWidth - this.towerWidth) / 2;
    }

    draw() {
        const img = new Image();
        img.src = '../../assets/friendly-ship.png';
        if (this.towerExploded) {
            this.ctx.drawImage(img, this.towerExplodedX, 0, this.towerWidth, this.towerHeight,
                this.towerX, this.canvasHeight - this.towerHeight, this.towerWidth, this.towerHeight);
        } else {
            this.ctx.drawImage(img, 0, 0, this.towerWidth, this.towerHeight,
                this.towerX, this.canvasHeight - this.towerHeight, this.towerWidth, this.towerHeight);
        }
    }

    updatePosition() {
        this.draw();

        if (this.rightPressed && this.towerX < this.canvasWidth - this.towerWidth) {
            this.towerX += 7;
        }

        if (this.leftPressed && this.towerX > 0) {
            this.towerX -= 7;
        }
    }

    newRocket() {
        this.rockets.push(new Rocket(this.ctx, this.towerX - 1 + this.towerWidth / 2, this.canvasHeight));
    }

    updateRockets() {
        this.rockets = this.rockets.filter(rocket => rocket.y > 0);
        this.rockets.forEach(rocket => rocket.updateRocket(7));
    }
}
