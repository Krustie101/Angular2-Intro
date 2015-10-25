import {
    Component,
    CORE_DIRECTIVES
} from 'angular2/angular2';
import {
    RouteParams,Router,
    ROUTER_DIRECTIVES
} from 'angular2/router';
import {BookingProposal} from "../model/booking";


@Component({
    selector: 'booking-reservation-router',
    template:`
        <div>
            <div>Hotel:{{hotel}}</div>
            <div>Check In:{{checkIn}}</div>
            <div>Check Out:{{checkOut}}</div>
            <div>Persons:{{persons}}</div>
            <a [router-link]="['/BookingSearch']" >New Search</a>
        </div>
    `,
    directives: [CORE_DIRECTIVES,ROUTER_DIRECTIVES]
})
export class BookingReservationScreen {

    public hotel : string;

    public checkIn : string;

    public checkOut : string;

    public persons : string;

    constructor(routeParams:RouteParams) {
        this.hotel = routeParams.get("hotel");
        this.checkIn = routeParams.get("checkIn");
        this.checkOut = routeParams.get("checkOut");
        this.persons = routeParams.get("persons");
    }

}