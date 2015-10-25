import {
    Component
} from 'angular2/angular2';
import {BookingFilterTemplateDriven,BookingFilterViewer} from './booking_filter_template_driven'
import {BookingFilterWithFormModel} from './booking_filter_form_model'
import {BookingProposals} from './booking_proposals'
import {BookingService} from "../service/booking_service";
import {BookingCriteria} from "../model/booking";
import {BookingProposal} from "../model/booking";


@Component({
    selector: 'booking-search',
    template:`
        <table>
            <tr>
                <td  style="padding:20px"><booking-filter-template-driven #filter (search-booking)="searchBookings($event)" /></td>
                <td  style="padding:20px"><booking-filter-viewer [criteria]="filter.criteria" /></td>
            </tr>
            <tr>
                <td colspan="2"  style="padding:20px" ><booking-proposals [proposals]="bookingProposals" /></td>
            </tr>
        </table>
    `,
    directives: [BookingFilterTemplateDriven,BookingFilterWithFormModel,BookingFilterViewer,BookingProposals]
})
export class BookingSearchScreen {

    public bookingProposals : Array<BookingProposal> = [];

    constructor(private bookingService:BookingService) {}

    public searchBookings(criteria:BookingCriteria) : void {
        this.bookingProposals = this.bookingService.findBookingProposals(criteria);
    }

}