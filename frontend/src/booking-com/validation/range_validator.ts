import {provide,AbstractControl,ControlGroup,Directive,Validators,NG_VALIDATORS} from 'angular2/angular2';
import {isBlank,getDayDifference} from '../util/Utils';


// TODO 1: what is the best way to add a range validator. This seems to be problematic, when one component is changed only that component is checked so can be marked as invalid.
// Should it not be possible to add a validator on form/control group level.
// TODO 2 : what is the best way to add context information?
//
export class RangeValidator {

    private _fromControl : AbstractControl;

    private _toControl : AbstractControl;

    constructor() {
        console.log("tt");
    }



    public set fromControl(ctrl:AbstractControl) {
        if (this._fromControl == ctrl) return;
        this._fromControl = ctrl;
        if (ctrl != null) {
            var validator : Function = (control:AbstractControl) => RangeValidator.validateFrom(control,this);
            RangeValidator.configureValidator(ctrl,validator);
        }

    }

    public get fromControl() : AbstractControl {
        return this._fromControl;
    }

    public set toControl(ctrl:AbstractControl) {
        if (this._toControl == ctrl) return;
        this._toControl = ctrl;
        if (ctrl != null) {
            var validator : Function = (control:AbstractControl) => RangeValidator.validateTo(control,this);
            RangeValidator.configureValidator(ctrl,validator);
        }
    }

    private static configureValidator(ctrl:AbstractControl,validator:Function) {
        if (ctrl.validator == null) {
            ctrl.validator = validator;
        } else {
            // this seems fishy, how to remove a validator? Should they not have gone for a collection of validators?
            ctrl.validator = Validators.compose([ctrl.validator,validator]);
        }
    }

    public get toControl() : AbstractControl {
        return this._toControl;
    }

    // instead of an instance method, we use a static method that passes the RangeValidator. Otherwise there are issues with 'this' when the validator is called. Is there a better way
    public static validateFrom(control:AbstractControl,validator:RangeValidator) : any {
        var error : any = null;
        if (RangeValidator.isRangeInvalid(control,validator.toControl)) {
            error = validator.createError(true);
        }
        return error;
    }

    public static validateTo(control:AbstractControl,validator:RangeValidator) : any {
        var error : any = null;
        if (RangeValidator.isRangeInvalid(validator.fromControl,control)) {
            error = validator.createError(false);
        }
        return error;
    }

    private createError(from:Boolean) : any {

        /* For now we keep our error object simple, we could also add the two invalid fields (checkin,checkout)
         In a real word app, we probably also would like to mark the fields in error. Leave that for later.
         An error object can be pretty arbitrary, as long as it is not null, angular 2 is happy.
         It will depend on the chosen validation framework (does not exist for the moment) how infomation in the error object should be configured so that the
         framework can use it in order to to mark errors / show error messages.
         We could even add more context information to this validator, like an error key.
         */
        var error : any = {
            'daterange-empty' : true,
        };
        return;

    }

    private static isRangeInvalid(fromControl:AbstractControl,toControl:AbstractControl) : boolean {
        if (fromControl == null || toControl == null) return false;
        var fromValue : string = fromControl.value;
        var toValue : string = toControl.value;
        if (isBlank(fromValue) || isBlank(toValue)) return false;
        var difference : number = getDayDifference(fromValue,toValue);
        return difference <= 0;
    }



}