/**
 * Created by Johan on 17/10/2015.
 */
import {Hotel} from 'hotel';


export class RoomType {

    constructor(
        public name : string,
        public persons : number,
        public price : number,
        public totalNumber : number,
        public reserved : number,
        public hotel : Hotel
    ){
        // Members defined via constructor, nothing to do
    };


}


