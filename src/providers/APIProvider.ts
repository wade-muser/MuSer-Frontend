/**
 * Created by Ciprian at 1/30/2018
 */

export class APIUtils {

    constructor() {

    }

    static extractId(url: string): string {
        return url.substring(url.indexOf("#") + 1, url.length);
    }
}
