import {
    Component,
    Input,
    CORE_DIRECTIVES
} from 'angular2/angular2';
import {BookingProposal} from '..//model/booking';
import {BookingProposalViewerWithRouterLink} from "./booking_proposal_with_routerlink";
import {BookingProposalViewerWithRouter} from "./booking_proposal_with_router";

@Component({
    selector: 'booking-proposals-router',
    template:`
         <table  class="table-bordered">
                <tr *ng-for="#proposal of proposals;#i=index">
                    <td>{{i+1}}</td>
                    <td><booking-proposal-viewer [booking-proposal]="proposal"/></td>
                </tr>
         </table>
    `,
    inputs: ['proposals'],
    // You can replace BookingProposalViewerWithRouter by BookingProposalViewerWithRouterLink to check routing with a router link
    // Alternatively you could use the current booking_proposals.ts and inject the router in the BookingSearchScreen like in BookingProposalViewerWithRouter
    directives: [BookingProposalViewerWithRouter,CORE_DIRECTIVES]
})
export class BookingProposalsWithRouter {

    public proposals : Array<BookingProposal> = [];

}