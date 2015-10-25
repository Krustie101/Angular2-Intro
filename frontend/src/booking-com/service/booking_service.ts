import {Injectable } from 'angular2/angular2';
import {Http} from 'angular2/http';

import {BookingCriteria,BookingProposal} from '../model/booking'
import {BookingProposals} from '../component/booking_proposals';
import {Hotel} from '../model/hotel';
import {City} from '../model/location';
import {getDayDifference} from '../util/Utils'
/*
* We use an abstract class because interfaces cannot be tokens for dependency-providers for the moment.
**/
export abstract class BookingService {

    abstract findBookingProposals(bookingCriteria:BookingCriteria) : Array<BookingProposal>;

}

@Injectable()
export class DummyBookingService extends BookingService {

    private hotels : Array<Hotel> = [];

    private minimumPrices : any = {};


    constructor() {
        super();

        var city  = new City("Dublin","Ireland");

        var hotel = new Hotel("Jurys Inn Dublin Christchurch",city);
        this.hotels.push(hotel);
        this.minimumPrices[hotel.name] = '110';


        hotel  = new Hotel("The Abbey Hotel",city);
        this.hotels.push(hotel);
        this.minimumPrices[hotel.name] = '98';


        city  = new City("Killarney","Ireland");

        hotel = new Hotel("Gleneagle Hotel",city);
        this.hotels.push(hotel);
        this.minimumPrices[hotel.name] = '123';

        hotel = new Hotel("Old Weir Lodge",city);
        this.hotels.push(hotel);
        this.minimumPrices[hotel.name] = '75';

    }



    public findBookingProposals(bookingCriteria:BookingCriteria) : Array<BookingProposal> {

        var nights : number = getDayDifference(bookingCriteria.checkIn,bookingCriteria.checkOut);

        return this.hotels
            .filter((hotel) => hotel.city.name.toLowerCase().indexOf(bookingCriteria.location.toLowerCase()) >= 0)
            .map((hotel) => {
                var minimumPrice : number = nights * bookingCriteria.persons * this.minimumPrices[hotel.name];
                return new BookingProposal(hotel,bookingCriteria,minimumPrice);
            });
    }


}

// TODO: implement booking service that fetches data from spring boot service. It is not difficult and you could show some rx code but we need to setup the server.
// Oh, and the return type will have to become an observable or promise because is is an asynchronous operation.
// And it is Sunday.

@Injectable()
export class RestBookingService extends BookingService {

    constructor(private http:Http) {
        super();
        // by prefxing http with private, it becomes a member variable.
    }

    public findBookingProposals(bookingCriteria:BookingCriteria) : Array<BookingProposal> {
        return null;
    }
}