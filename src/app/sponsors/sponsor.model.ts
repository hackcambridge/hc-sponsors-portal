export class SponsorModel {
    name: string;
    priceGbp: number;
    tier: SponsorshipTier;
};

export enum SponsorshipTier {
    Tera = 'Tera',
    Giga = 'Giga',
    Mega = 'Mega',
    Kilo = 'Kilo',
    SponsoredMeal = 'Sponsored Meal'
}
