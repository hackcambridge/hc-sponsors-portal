import { SponsorshipTier } from 'app/sponsors/sponsorship-tier.enum';
import { SponsorshipBenefitModel } from 'app/benefits/sponsorship-benefit.model';

export class SponsorModel {
    name: string;
    tier: SponsorshipTier;
    maxRecruiters: number;
    benefits: SponsorshipBenefitModel[];
}
