
import {
    Component,
    EventEmitter,
    Input,
    Output,
    CORE_DIRECTIVES
} from 'angular2/angular2';

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
export class BookingProposalViewer  {

    @Input() public bookingProposal : BookingProposal;

    @Output() public reserveRoom : EventEmitter = new EventEmitter();

    public handleClick() : void {
        this.reserveRoom.next(this.bookingProposal);
    }

}


