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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginProvider} from '../providers/login/login';
import {IonicStorageModule} from "@ionic/storage";
import {AuthorizationProvider} from '../providers/authorization/authorization';
import {ArtistPage} from "../pages/artist/artist";
import {ArtistProvider} from '../providers/artist/artist';
import {AlbumProvider} from '../providers/album/album';
import {AlbumPage} from "../pages/album/album";
import {SongPage} from "../pages/song/song";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {SplashPage} from "../pages/splash/splash";
import {LogoutProvider} from '../providers/logout/logout';
import {AuthInterceptor} from "../providers/authorization/AuthInterceptor";
import {DiscoverProvider} from '../providers/discover/discover';
import {PlaylistProvider} from '../providers/playlist/playlist';
import {GenrePage} from "../pages/genre/genre";
import {EventsProvider} from '../providers/events/events';
import {SongsProvider} from '../providers/songs/songs';
import {GenreProvider} from '../providers/genre/genre';

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
        SplashPage,
        GenrePage,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
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
        SplashPage,
        GenrePage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        RegisterProvider,
        LoginProvider,
        AuthorizationProvider,
        ArtistProvider,
        AlbumProvider,
        InAppBrowser,
        LogoutProvider,
        DiscoverProvider,
        PlaylistProvider,
        EventsProvider,
        SongsProvider,
        GenreProvider,
    ]
})
export class AppModule {
}
