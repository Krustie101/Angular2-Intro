
import {
    provide,
    Component,
    ControlGroup,
    EventEmitter,
    Form,
    FormBuilder,
    Input,
    NgModel,
    Output,
    QueryList,
    Validators,
    ViewQuery,
    FORM_DIRECTIVES
} from 'angular2/angular2';

import {BookingCriteria} from "../model/booking";
import {RangeValidator} from "../validation/range_validator"




@Component({
    selector: 'booking-filter-form-model',
    template:`<div>
            <form [ng-form-model]="criteriaForm" class="form-inline" role="form" novalidate>
                <div class="form-group">
                    <label>Location:</label>
                    <input type="text" ng-control="location"
                        [(ng-model)]="criteria.location"
                        class="form-control">
                </div>
                <div class="form-group">
                    <label for="check-in">Check In:</label>
                    <input type="date"
                        ng-control="checkIn"
                        [(ng-model)]="criteria.checkIn"
                        class="form-control" id="check-in">
                </div>
                <div class="form-group">
                    <label for="check-out">Check Out:</label>
                    <input type="date"
                        ng-control="checkIn"
                        [(ng-model)]="criteria.checkOut"
                        class="form-control" id="check-out">
                </div>
                <div class="form-group">
                    <label for="persons">Persons:</label>
                    <input type="text"
                        ng-control="persons"
                        [(ng-model)]="criteria.persons"
                        class="form-control" id="persons"  >
                </div>
                <div class="form-group">
                   <button type="button" class="btn btn-default" (click)="search()">Find Booking</button>
                </div>
                <div class="form-group">
                   <button type="button" class="btn btn-default" (click)="clear()">Clear Filter</button>
                </div>
            </form>
        </div>
    `,
    directives: [FORM_DIRECTIVES],
    providers: [FormBuilder]
})
export class BookingFilterWithFormModel {

    @Input() public criteria : BookingCriteria= new BookingCriteria();

    @Output() public searchBooking : EventEmitter = new EventEmitter();

    public criteriaForm : ControlGroup;

    constructor(formBuilder:FormBuilder) {
        this.criteriaForm = formBuilder.group({
            location : ["",Validators.compose([Validators.required,Validators.minLength(3)])],
            checkIn : ["",Validators.required],
            checkOut: ["",Validators.required],
            persons : ["",Validators.required]
        });
        // TODO: at range validation in a sane way (also for template driven form)

    }


    public clear() : void {
        this.criteria = new BookingCriteria();
    }

    public search() : void {
        if (this.criteriaForm.valid) {
            this.searchBooking.next(this.criteria);
        }
    }

}
