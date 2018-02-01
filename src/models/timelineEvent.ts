/**
 * Created by Ciprian at 1/26/2018
 */

export class TimelineEvent {

    constructor(public entity: string,
                public date: Date,
                public title: string,
                public message: string) {

    }
}
