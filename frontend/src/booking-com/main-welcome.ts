import {bootstrap,Component,NgIf} from 'angular2/angular2';

@Component({
    selector: 'welcome-app',
    templateUrl: 'booking-com/main-welcome.html',
    directives: [NgIf]
})

export class WelcomeApplication {

    public name : String = null;

    public handleClick() : void {
        this.name = "World";
    }

}

bootstrap(WelcomeApplication);
