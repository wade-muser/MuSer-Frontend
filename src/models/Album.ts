/**
 * Created by Ciprian at 12/28/2017
 */
import {Artist} from "./Artist";


export class Album {
    constructor(public id: string,
                public name: string,
                public imageUrl: string,
                public artist: Artist) {

    }
}
