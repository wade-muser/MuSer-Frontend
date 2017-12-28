/**
 * Created by Ciprian at 12/28/2017
 */


export class Event {

    constructor(public id: string,
                public title: string,
                public imageUrl: string,
                public startDate: Date,
                public endDate: Date,
                public city: string) {

    }
}
