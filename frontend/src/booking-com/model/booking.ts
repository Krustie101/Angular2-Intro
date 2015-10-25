import {Hotel} from "./hotel";

export class BookingCriteria {

    public persons : number;
    public location : string;
    public checkIn : string;
    public checkOut : string;

}

export class BookingProposal {

    public criteria : BookingCriteria;
    public hotel: Hotel;
    public priceFrom : number;

    constructor(
        hotel:Hotel,
        criteria:BookingCriteria,
        priceFrom:number
    ){
        this.hotel = hotel;
        this.priceFrom = priceFrom;
        this.criteria = criteria;
    };

}