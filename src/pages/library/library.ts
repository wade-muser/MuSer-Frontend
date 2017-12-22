import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
    selector: 'page-library',
    templateUrl: 'library.html'
})
export class LibraryPage {

    constructor(public navCtrl: NavController) {

    }

    delete(chip: Element) {
        chip.remove();
    }

}
