import { Component, OnInit, ElementRef } from '@angular/core';
import { Tower } from '../../space-invaders-assets/tower';
import { Block } from '../../space-invaders-assets/block';
import { BlockState } from '../../enums/BlockState';

@Component({
    selector: 'app-game-board-space-invaders',
    templateUrl: './game-board-space-invaders.component.html',
    styleUrls: ['./game-board-space-invaders.component.css']
})
export class GameBoardSpaceInvadersComponent implements OnInit {

    canvas: HTMLCanvasElement;
    width = 480;
    height = 320;
    ctx: CanvasRenderingContext2D;

    tower: Tower;
    blocks: Block[] = [];

    score = 0;
    lives = 3;

    constructor(private element: ElementRef) { }

    ngOnInit() {
        this.canvas = this.element.nativeElement.firstChild;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');
        console.log(this.ctx);

        this.tower = new Tower(this.ctx, this.canvas.width, this.canvas.height);
        this.blocks.push(new Block(this.ctx, 66, 280));
        this.blocks.push(new Block(this.ctx, 166, 280));
        this.blocks.push(new Block(this.ctx, 266, 280));
        this.blocks.push(new Block(this.ctx, 366, 280));

        addEventListener('keydown', (e) => this.keyDownHandler(e), false);
        addEventListener('keyup', (e) => this.keyUpHandler(e), false);
        this.draw();
    }

    private keyDownHandler(e: KeyboardEvent) {
        if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'd') {
            this.tower.rightPressed = true;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft' || e.key === 'a') {
            this.tower.leftPressed = true;
        }

        if (e.key === ' ' && this.tower.rockets.length < 3) {
            this.tower.newRocket();
        }
    }

    private keyUpHandler(e: KeyboardEvent) {
        if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'd') {
            this.tower.rightPressed = false;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft' || e.key === 'a') {
            this.tower.leftPressed = false;
        }
    }

    private collisionDetectionBlocks() {
        this.blocks.forEach(block => {
            let intersects = false;
            this.tower.rockets = this.tower.rockets.filter(rocket => {
                intersects = block.extent.intersects(rocket.extent);
                return !intersects;
            });
            if (intersects) {
                block.state ++;
            }
        });
        this.blocks = this.blocks.filter(block => block.state < 5);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.tower.updateRockets();
        this.tower.updatePosition();
        this.blocks.forEach(block => block.updateState());

        this.collisionDetectionBlocks();

        requestAnimationFrame(() => this.draw());
    }

}
