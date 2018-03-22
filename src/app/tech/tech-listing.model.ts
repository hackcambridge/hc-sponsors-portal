export class TechListingModel {
    name: string;
    description: string;
    type: TechListingType;
    link: string;

    constructor() {
        this.name = '';
        this.description = '';
        this.type = TechListingType.API;
        this.link = '';
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
