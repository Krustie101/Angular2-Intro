export function isBlank(value:any) {

    if (value == null) {
        return true;
    }

    if (typeof value === 'string') {
        return (<string> value).trim() == '';
    }
    if (typeof value === 'number') {
        return isNaN(<number> value);
    }

    return false;

}

export function getDayDifference(fromDateString:string,toDateString:string) : number {

    var date1 : Date = new Date(fromDateString);
    var date2 : Date = new Date(toDateString);
    return (Date.UTC(date2.getFullYear(),date2.getMonth(),date2.getDate())
        - Date.UTC(date1.getFullYear(),date1.getMonth(),date1.getDate())) /86400000;

}