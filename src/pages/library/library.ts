import {Component, ViewChild} from '@angular/core';
import {Gesture, NavController, Slides} from 'ionic-angular';
import {SwipeGestures} from "../../utils/gestures";

@Component({
    selector: 'page-library',
    templateUrl: 'library.html'
})
export class LibraryPage {

    @ViewChild('mySlider')
    slider: Slides;
    currentSegmentPage: string;
    pages: Array<string>;
    pagesToPagesIndex: Map<string, number>;

    constructor(public navCtrl: NavController) {
        this.pages = ["Playlists Page", "Generate Playlists", "Smart Playlists"];
        this.pagesToPagesIndex = new Map<string, number>();
        for (let pageIndex = 0; pageIndex < this.pages.length; pageIndex++) {
            this.pagesToPagesIndex.set(this.pages[pageIndex], pageIndex);
        }
        console.log(this.pagesToPagesIndex);
        console.log(this.pages)
        this.currentSegmentPage = this.pages[0];
    }

    onSegmentChanged(segmentButton) {
        console.log("Segment changed to", segmentButton.value);
        this.currentSegmentPage = segmentButton.value;
    }

    swipeEvent(event: Gesture) {
        console.log(event.direction);
        const currentPageIndex = this.pagesToPagesIndex.get(this.currentSegmentPage);
        if (event.direction == SwipeGestures.LEFT) {
            console.log("Left Swipe");
            this.setSegmentPage(currentPageIndex + 1);
        } else if (event.direction == SwipeGestures.RIGHT) {
            console.log("Right Swipe");
            this.setSegmentPage(currentPageIndex - 1);
        }
    }

    setSegmentPage(pageIndex: number) {
        if (pageIndex < 0 || pageIndex >= this.pages.length) {
            return;
        }
        this.currentSegmentPage = this.pages[pageIndex];
    }

}
