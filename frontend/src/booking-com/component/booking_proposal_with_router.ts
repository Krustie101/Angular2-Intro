import {
    Component,
    EventEmitter,
    Input,
    Output,
    CORE_DIRECTIVES
} from 'angular2/angular2';

import {
    Router
} from 'angular2/router';


import {BookingProposal} from "../model/booking";
import {Hotel} from "../model/hotel";


@Component({
    selector: 'booking-proposal-viewer',
    template:`
        <div *ng-if="bookingProposal != null" >
            <div>{{bookingProposal.hotel.name}} - {{bookingProposal.hotel.city.name}} </div>
            <div>Price from: {{bookingProposal.priceFrom}}</div>
            <button type="button" (click)="handleClick()">Reserve Room</button>
        </div>
    `,
    directives: [CORE_DIRECTIVES]
})
export class BookingProposalViewerWithRouter  {

    @Input() public bookingProposal : BookingProposal;

    @Output() public reserveRoom : EventEmitter = new EventEmitter();

    constructor(private router : Router) {};

    public handleClick() : void {
       this.router.navigate(['/BookingReservation',
           {hotel:this.bookingProposal.hotel.name,checkIn:this.bookingProposal.criteria.checkIn,checkOut:this.bookingProposal.criteria.checkOut,persons:this.bookingProposal.criteria.persons}]);
    }

}


