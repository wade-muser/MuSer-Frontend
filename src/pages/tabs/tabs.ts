import {Component} from '@angular/core';

import {LibraryPage} from '../library/library';
import {HomePage} from '../home/home';
import {DiscoverPage} from '../discover/discover';

@Component({
    templateUrl: 'tabs.html',
})
export class TabsPage {

    homePage = HomePage;
    discoverPage = DiscoverPage;
    libraryPage = LibraryPage;

    constructor() {

    }
}
