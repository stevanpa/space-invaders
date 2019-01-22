import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
    selector: 'app-game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

    canvas: HTMLCanvasElement;
    width = 480;
    height = 320;
    ctx: CanvasRenderingContext2D;

    x = this.width / 2;
    y = this.height - 30;
    dx = 2;
    dy = -2;
    ballRadius = 10;
    ballColour = '#0095DD';

    paddleHeight = 10;
    paddleWidth = 75;
    paddleX: number;
    rightPressed = false;
    leftPressed = false;

    bricks = [];
    brickRowCount = 3;
    brickColumnCount = 5;
    brickWidth = 75;
    brickHeight = 20;
    brickPadding = 10;
    brickOffsetTop = 30;
    brickOffsetLeft = 30;

    score = 0;
    lives = 3;

    constructor(private element: ElementRef) {
    }

    ngOnInit() {
        this.canvas = this.element.nativeElement.firstChild;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');
        console.log(this.ctx);

        this.paddleX = (this.width - this.paddleWidth) / 2;

        for (let c = 0; c < this.brickColumnCount; c++) {
            this.bricks[c] = [];
            for (let r = 0; r < this.brickRowCount; r++) {
                this.bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }

        addEventListener('keydown', (e) => this.keyDownHandler(e), false);
        addEventListener('keyup', (e) => this.keyUpHandler(e), false);
        this.draw();
    }

    private changeColour() {
        return `#${this.hexValue()}${this.hexValue()}${this.hexValue()}`;
    }

    private hexValue(): any {
        return ('0' + String(Math.floor(Math.random() * 256).toString(16))).substr(-2);
    }

    private keyDownHandler(e: KeyboardEvent) {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
            this.rightPressed = true;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
            this.leftPressed = true;
        }
    }

    private keyUpHandler(e: KeyboardEvent) {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
            this.rightPressed = false;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
            this.leftPressed = false;
        }
    }

    private collisionDetection() {
        for (let c = 0; c < this.brickColumnCount; c++) {
            for (let r = 0; r < this.brickRowCount; r++) {
                const brick = this.bricks[c][r];
                if (brick.status === 1) {
                    if (this.x > brick.x && this.x < brick.x + this.brickWidth
                        &&
                        this.y > brick.y && this.y < brick.y + this.brickHeight) {
                        this.dy = -this.dy;
                        brick.status = 0;
                        this.ballColour = this.changeColour();
                        this.score++;
                        if (this.score === this.brickRowCount * this.brickColumnCount) {
                            alert('You won, Congratualtions!');
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }

    drawLives() {
        this.ctx.font = '16px Arial';
        this.ctx.fillStyle = '#0095DD';
        this.ctx.fillText(`Lives: ${this.lives}`, this.width - 65, 20);
    }

    drawScore() {
        this.ctx.font = '16px Arial';
        this.ctx.fillStyle = '#0095DD';
        this.ctx.fillText(`Score: ${this.score}`, 8, 20);
    }

    drawBricks() {
        for (let c = 0; c < this.brickColumnCount; c++) {
            for (let r = 0; r < this.brickRowCount; r ++) {
                if (this.bricks[c][r].status === 1) {
                    const brickX = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
                    const brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
                    this.bricks[c][r].x = brickX;
                    this.bricks[c][r].y = brickY;
                    this.ctx.beginPath();
                    this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
                    this.ctx.fillStyle = '#0095DD';
                    this.ctx.fill();
                    this.ctx.closePath();
                }
            }
        }
    }

    drawBall() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.ballColour;
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawPaddle() {
        this.ctx.beginPath();
        this.ctx.rect(this.paddleX, this.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
        this.ctx.fillStyle = '#0095DD';
        this.ctx.fill();
        this.ctx.closePath();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawBricks();
        this.drawBall();
        this.drawPaddle();
        this.drawScore();
        this.drawLives();
        this.collisionDetection();

        if (this.x + this.dx < this.ballRadius || this.x + this.dx > this.width - this.ballRadius) {
            this.dx = -this.dx;
        }

        if (this.y + this.dy < this.ballRadius) {
            this.dy = -this.dy;
        } else if (this.y + this.dy > this.height - this.ballRadius) {
            if (this.x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
                this.dy = -this.dy;
            } else {
                this.lives--;
                if (!this.lives) {
                    alert('Game over');
                    document.location.reload();
                } else {
                    this.x = this.width / 2;
                    this.y = this.height - 30;
                    this.dx = 2;
                    this.dy = -2;
                    this.paddleX = (this.width - this.paddleWidth) / 2;
                }
            }
        }

        this.x += this.dx;
        this.y += this.dy;

        if (this.rightPressed && this.paddleX < this.width - this.paddleWidth) {
            this.paddleX += 7;
        }

        if (this.leftPressed && this.paddleX > 0) {
            this.paddleX -= 7;
        }

        requestAnimationFrame(() => this.draw());
    }

}
