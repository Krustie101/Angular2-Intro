import {Component, bootstrap, provide,Host} from 'angular2/angular2';
import {APP_BASE_HREF,ROUTER_PROVIDERS,ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {BookingSearchScreen} from './component/booking_search';
import {DummyBookingService,BookingService} from "./service/booking_service";

@Component({
    selector: 'app',
    templateUrl: 'booking-com/main.html',
    directives: [BookingSearchScreen]
})
export class Application {

    constructor() {
        console.log("Starting the application");
    }

}

bootstrap(Application,[
    HTTP_PROVIDERS,
    provide(BookingService,{useClass:DummyBookingService})
]);
