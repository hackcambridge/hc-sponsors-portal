export class TechListingModel {
    name: string;
    description: string;
    type: TechListingType;

    constructor() {
        this.name = '';
        this.description = '';
        this.type = TechListingType.API;
    }
}

export enum TechListingType {
    API = 'api',
    Hardware = 'hardware',
    SDK = 'sdk',
    Framework = 'framework',
    Tooling = 'tooling',
    Other = 'other'
}
