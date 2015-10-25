import {City} from './location'
import {RoomType} from './room';


export class Hotel {

    public name : string;

    public city : City;

    public roomTypes : Array<RoomType> = [];

    constructor(
        name:string,
        city:City
    ) {
        this.name = name;
        this.city = city;
    }


}

