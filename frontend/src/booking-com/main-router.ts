import {Component, bootstrap, provide,Host} from 'angular2/angular2';
import {APP_BASE_HREF,ROUTER_PROVIDERS,ROUTER_DIRECTIVES,RouteConfig} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {BookingSearchScreenWithRouter} from './component/booking_search_with_router';
import {BookingReservationScreen} from './component/booking_reservation_with_router';
import {DummyBookingService,BookingService} from "./service/booking_service";

@Component({
    selector: 'router-app',
    templateUrl: 'booking-com/main-router.html',
    directives: [ROUTER_DIRECTIVES]

})
@RouteConfig ([
    {path:'/',component:BookingSearchScreenWithRouter,as:'BookingSearch'},
    {path:'/reservation/criteria',component:BookingReservationScreen,as:'BookingReservation'}
])
export class Application {

    constructor() {
        console.log("Starting the application");
    }

}

bootstrap(Application,[
    ROUTER_PROVIDERS,provide(APP_BASE_HREF,{useValue:'/app/root'}),
    HTTP_PROVIDERS,
    provide(BookingService,{useClass:DummyBookingService})
]);
