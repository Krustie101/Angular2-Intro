import {
    Component,
    Input,
    CORE_DIRECTIVES
} from 'angular2/angular2';
import {BookingProposal} from '..//model/booking';
import {BookingProposalViewer} from "./booking_proposal";

@Component({
    selector: 'booking-proposals',
    template:`
         <table  class="table-bordered">
                <tr *ng-for="#proposal of proposals;#i=index">
                    <td>{{i+1}}</td>
                    <td><booking-proposal-viewer [booking-proposal]="proposal" (reserve-room)="reserveRoom($event)"/></td>
                </tr>
         </table>
    `,
    inputs: ['proposals'],
    directives: [BookingProposalViewer,CORE_DIRECTIVES]
})
export class BookingProposals {

    public proposals : Array<BookingProposal> = [];

    public reserveRoom(proposal:BookingProposal) : void {
        alert('Reserve room in hotel:' + proposal.hotel.name)
    }


}