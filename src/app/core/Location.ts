import { Location } from "./CoreModels";

export class LocationForm {
    constructor(
        public name?: string,
        public type?: string,
        public file?: string,
        public location?: Location
    ) { }

}