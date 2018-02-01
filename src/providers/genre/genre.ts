import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Constants} from "../../utils/constants";
import {APIUtils} from "../APIProvider";

/*
  Generated class for the GenreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GenreProvider {

    GENRES_URL = Constants.API_URL + "/genres";

    constructor(public http: HttpClient) {
        console.log('Hello GenreProvider Provider');
    }

    getTimeline(genreEntityId: string, startDate: number, endDate: number) {
        const id = encodeURI(APIUtils.extractId(genreEntityId));
        const url = `${this.GENRES_URL}/${id}/timeline?start_date=${startDate}&end_date=${endDate}`;
        console.log(url);

        return this.http.get(url, {
            observe: "response"
        });
    }

}
