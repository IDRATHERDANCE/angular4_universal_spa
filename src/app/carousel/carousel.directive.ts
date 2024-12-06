import { Component, Input, EventEmitter, Output, OnChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'carousel-directive',
    templateUrl: './carousel.directive.html',
    styleUrls: ['./carousel.directive.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CarouselComponent implements OnChanges {

    @Input() carouselObject: any;
    @Output() whichPhoto = new EventEmitter<number>();

    public carousel: any = {};
    private _counter = 0;
    public translateCarousel = '';
    public noMorePhotosLeft = true;
    public noMorePhotosRight = true;
    private _carouselLength = 0;

    constructor() { }

    ngOnChanges() {
        if (this.carouselObject) {
            this.carousel = this.carouselObject;
            this.photo_carouselLengthFn(this.carouselObject.length);
            this.noMorePhotosLeft = true;
        }
    }

    photo_carouselLengthFn(photoLenght: any) {
        this.noMorePhotosRight = (photoLenght <= 4) ? true : false;
        this._carouselLength = photoLenght;
    }

    leftCarouselArrow() {
        this._counter--;
        this.moveCarousel(this._counter);
    }

    rightCarouselArrow() {
        this._counter++;
        this.moveCarousel(this._counter);
    }

    moveCarousel(_counter: any) {

        let multiplyer = 1;
        const length: any = this._carouselLength;
        if (length === 5) {
            multiplyer = 1;
            if (_counter === 0) {
                this.noMorePhotosLeft = true;
                this.noMorePhotosRight = false;
            }
            if (_counter === 1) {
                this.noMorePhotosRight = true;
                this.noMorePhotosLeft = false;
            }
        }
        if (length > 5) {
            multiplyer = 2;

            if (_counter === 0) {
                this.noMorePhotosLeft = true;
                this.noMorePhotosRight = false;
            } else {
                this.noMorePhotosLeft = false;
            }

            const oddCorrect = this.isOdd(length) ? .5 : 0;

            if (((this._carouselLength - 4) / 2) - oddCorrect === _counter) {
                this.noMorePhotosRight = true;
                multiplyer = this.isOdd(length) ? 2.25 : 2;
            } else {
                this.noMorePhotosRight = false;
            }
        }

        const moveTimes = _counter * multiplyer * -26.5;
        this.translateCarousel = `translateX(${moveTimes}%)`;

    }

    isOdd(num: any) { return num % 2; }


    popUpActivate(index: number) {
        this.whichPhoto.emit(index);
    }

}
