import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {LibraryPage} from '../pages/library/library';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {DiscoverPage} from '../pages/discover/discover';
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {PresentationPage} from "../pages/presentation/presentation";
import {RegisterProvider} from '../providers/register/register';
import {HttpClientModule} from "@angular/common/http";
import {LoginProvider} from '../providers/login/login';
import {IonicStorageModule} from "@ionic/storage";
import {AuthorizationProvider} from '../providers/authorization/authorization';
import {ArtistPage} from "../pages/artist/artist";
import {ArtistProvider} from '../providers/artist/artist';
import {AlbumProvider} from '../providers/album/album';
import {AlbumPage} from "../pages/album/album";
import {SongPage} from "../pages/song/song";
import {InAppBrowser} from "@ionic-native/in-app-browser";


@NgModule({
    declarations: [
        MyApp,
        LibraryPage,
        HomePage,
        TabsPage,
        DiscoverPage,
        LoginPage,
        RegisterPage,
        PresentationPage,
        ArtistPage,
        AlbumPage,
        SongPage,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        LibraryPage,
        HomePage,
        TabsPage,
        DiscoverPage,
        LoginPage,
        RegisterPage,
        PresentationPage,
        ArtistPage,
        AlbumPage,
        SongPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        RegisterProvider,
        LoginProvider,
        AuthorizationProvider,
        ArtistProvider,
        AlbumProvider,
        InAppBrowser,
    ]
})
export class AppModule {
}
