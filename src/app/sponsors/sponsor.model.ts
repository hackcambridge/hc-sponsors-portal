import { SponsorshipBenefitModel } from 'app/benefits/sponsorship-benefit.model';

export class SponsorModel {
    name: string;
    tier: SponsorshipTier;
    maxRecruiters: number;
    benefits: SponsorshipBenefitModel[];
};

export enum SponsorshipTier {
    Tera = 'Tera',
    Giga = 'Giga',
    Mega = 'Mega',
    Kilo = 'Kilo',
    SponsoredMeal = 'Sponsored Meal'
}
