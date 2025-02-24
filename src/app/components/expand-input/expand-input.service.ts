import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class ExpandInputService {
    public isExtended = false;

    constructor() {
    }
}
