/**
 * Created by Ciprian at 12/14/2017
 */
import {Artist} from "./artist";


export class Song {

    constructor(public id: string,
                public name: string,
                public artists: Array<Object>,
                public imageUrl: string) {

    }

    getArtist(): string {
        let songArtist = "";
        for (let artist of this.artists) {
            songArtist += artist['name'] + " "
        }
        return songArtist.trim();
    }
}
