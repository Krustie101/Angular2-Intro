
import {
    provide,
    Component,
    EventEmitter,
    Input,
    MinLengthValidator,
    MaxLengthValidator,
    NgForm,
    NgModel,
    Output,
    QueryList,
    RequiredValidator,
    ViewQuery,
    FORM_DIRECTIVES
} from 'angular2/angular2';

import {BookingCriteria} from "../model/booking";

@Component({
    selector: 'booking-filter-template-driven',
    template:`<div>
            <form  #f="form" class="form-inline" role="form" novalidate>  <!--  By adding #f, we give this form a name we can refer to. You should read #f="form" as : export f as NgForm -->
                                                                                                    <!-- novalidate : disable built in html form validation -->
                                                                                                    <!--  class="form-inline", role="form" have nothing to do with angular 2, it is here for bootstrap -->
                <div class="form-group"> <!--  class="form-group" has nothing to do with angular 2, it is here for bootstrap -->
                    <label>Location:</label>
                    <input type="text" ng-control="location"
                        [ng-model]="criteria.location" (ng-model-change)="criteria.location=$event"
                        required  minlength="2"
                        class="form-control">
                        <!-- Because ng-model is present, we do not need ng-control but we use it to give it a name inside the form. This will allow to look it up in the form-model that is behind the scenes (when needed, e.g. during validation) -->
                        <!-- [ng-model] & (ng-model-change) are both here to show where [(ng-control)] comes from -->
                        <!--  class="form-control" has nothing to do with angular 2, it is here for bootstrap -->
                </div>
                <div class="form-group">
                    <label>Check In:</label>
                    <input type="date" ng-control="checkIn"
                        [(ng-model)]="criteria.checkIn"
                        required
                        class="form-control">
                </div>
                <div class="form-group">
                    <label>Check Out:</label>
                    <input type="date"  ng-control="checkOut"
                        [(ng-model)]="criteria.checkOut"
                        required
                        class="form-control">
                </div>
                <div class="form-group">
                    <label>Persons:</label>
                    <input type="text" ng-control="persons"
                        [(ng-model)]="criteria.persons"
                        required
                        class="form-control">
                </div>
                <div class="form-group">
                   <button type="button"  class="btn btn-default" (click)="search(f)">Find Booking</button> <!-- Alternative to validity check in search method, add [disabled]="!f.valid" -->
                </div>
                <!--div class="form-group">
                   <button type="button" class="btn btn-default" (click)="clear()">Clear Filter</button>
                </div-->
            </form>
        </div>
    `,
    directives: [FORM_DIRECTIVES,MaxLengthValidator,MinLengthValidator,RequiredValidator]
})
export class BookingFilterTemplateDriven {

    @Input() public criteria : BookingCriteria= new BookingCriteria();

    @Output() public searchBooking : EventEmitter = new EventEmitter();

    constructor(@ViewQuery(NgModel) private ngModels : QueryList<NgModel>) {}

    public clear() : void {
        this.criteria = new BookingCriteria();
    }

    public search(f:NgForm) : void {
        if (f.valid) {
            this.searchBooking.next(this.criteria);
        } else {
            alert('Correct your criteria')
        }
    }

}


@Component({
    selector: 'booking-filter-viewer',
    template:`
    <div>
        Selected criteria: <br />
        Location: {{criteria.location}} </br>
        Check In: {{criteria.checkIn}}</br>
        Check Out: {{criteria.checkOut}}</br>
        Person: {{criteria.persons}}
    </div>
    `,
    inputs: ['criteria']
})
export class BookingFilterViewer {

    private _criteria : BookingCriteria;


    public get criteria() : BookingCriteria {
        return this._criteria;
    }

    public set criteria(value:BookingCriteria) {
        this._criteria = value;
    }

}
