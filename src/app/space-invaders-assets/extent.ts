export class Extent {

    minx: number;
    miny: number;
    maxx: number;
    maxy: number;
    extent: [number, number, number, number];

    constructor(minx: number, miny: number, maxx: number, maxy: number) {

        this.minx = minx;
        this.miny = miny;
        this.maxx = maxx;
        this.maxy = maxy;
        this.extent = [minx, miny, maxx, maxy];
    }

    getTopLeft() {
        return [this.minx, this.miny];
    }

    getBottomRight() {
        return [this.maxx, this.maxy];
    }

    intersects(extent: Extent): boolean {

        return this.minx <= extent.maxx
            && this.maxx >= extent.minx
            && this.miny <= extent.maxy
            && this.maxy >= extent.miny;
    }
}
