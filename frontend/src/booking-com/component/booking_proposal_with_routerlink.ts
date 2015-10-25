
import {
    Component,
    EventEmitter,
    Input,
    Output,
    CORE_DIRECTIVES
} from 'angular2/angular2';

import {
    ROUTER_DIRECTIVES
} from 'angular2/router';


import {BookingProposal} from "../model/booking";
import {Hotel} from "../model/hotel";


@Component({
    selector: 'booking-proposal-viewer',
    template:`
        <div *ng-if="bookingProposal != null" >
            <div>{{bookingProposal.hotel.name}} - {{bookingProposal.hotel.city.name}} </div>
            <div>Price from: {{bookingProposal.priceFrom}}</div>
        </div>
        <a [router-link]="['/BookingReservation',{hotel:bookingProposal.hotel.name,checkIn:bookingProposal.criteria.checkIn,checkOut:bookingProposal.criteria.checkOut,persons:bookingProposal.criteria.persons}]">Reserve Room</a>
    `,
    directives: [CORE_DIRECTIVES,ROUTER_DIRECTIVES]
})
export class BookingProposalViewerWithRouterLink {

    @Input() public bookingProposal : BookingProposal;

}


