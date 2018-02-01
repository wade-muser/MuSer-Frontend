/**
 * Created by Ciprian at 1/9/2018
 */
import {Song} from "./song";

export class Playlist {
    constructor(public id: string,
                public name: string,
                public songs: Array<Song>) {

    }
}
