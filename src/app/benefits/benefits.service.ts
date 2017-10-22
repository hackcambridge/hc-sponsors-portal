import { Injectable } from '@angular/core';
import { SponsorshipBenefitModel } from 'app/benefits/sponsorship-benefit.model';

@Injectable()
/**
 * This service provides information about the benefits that the current
 * sponsor is entitled to based on their sponsorship package.
 */
export class BenefitsService {
    getSponsorBenefitDescriptions(): SponsorshipBenefitModel[] {
        // Hard coded for now
        return [
            {
                id: SponsorBenefitTypes.ProductDemoSlot,
                name: 'Product Demo',
                description: 'Demo your API'
            },
            {
                id: SponsorBenefitTypes.WorkshopSlot,
                name: 'Workshop Slot',
                description: 'Run a 30 minute workshop'
            },
            {
                id: SponsorBenefitTypes.BrandedSwag,
                name: 'Bring Branded Swag',
                description: 'You can bring unlimited swag to the event'
            }
        ];
    }

    getSponsorBenefits(): SponsorBenefitTypes[] {
        // TODO Hardcoded test data
        return [
            SponsorBenefitTypes.ThemedPrize,
            SponsorBenefitTypes.SideEvent,
            SponsorBenefitTypes.WorkshopSlot,
            SponsorBenefitTypes.OpeningCeremonyPresentation,
            SponsorBenefitTypes.StallInFoyer,
            SponsorBenefitTypes.LogoOnBanner
        ];
    }

    canRunWorkshopLikeEvent(): boolean {
        // TODO Hard coded for now.
        return false;
    }

    canListHardwareAndApis(): boolean {
        // TODO Hard coded for now.
        return true;
    }

    canBringSwag(): boolean {
        // TODO Hard coded for now
        return false;
    }

    canRunCompetitionAndEvents(): boolean {
        // TODO Hard coded for now.
        return true;
    }

    canRunOpeningCeremonyPresentation(): boolean {
        // TODO Hard coded or now
        return true;
    }
}

export enum SponsorBenefitTypes {
    // Tera sponsor benefits
    ThemedPrize = 'themed-prize',
    SideEvent = 'side-event',
    WorkshopSlot = 'workshop-slot',
    OpeningCeremonyPresentation = 'opening-ceremony',
    StallInFoyer = 'stall-in-foyer',
    LogoOnProjector = 'logo-on-projector',

    // Giga sponsor packages
    ProductDemoSlot = 'product-demo-slot',
    CVsBeforeEvent = 'cvs-before-event',
    AwardHardwareApiPrize = 'award-hardware-api-prize',
    LargeStall = 'large-stall',
    AdvertiseHardwareApiBeforeEvent = 'advertise-hardware-apis-before-event',

    // Mega sponsor packages
    CVsAfterEvent = 'cvs-after-event',
    SmallStall = 'small-stall',
    LogoOnBanner = 'logo-on-banner',
    BrandedSwag = 'swag',
    SendRecruiters = 'send-recruiters',

    // Kilo sponsor packages
    BringHardwareListApis = 'bring-hardware-list-apis',
    LogoOnWebsite = 'logo-on-website',
    SendMentors = 'send-mentors',
    AnnouncementOnSocialMedia = 'social-media'
}
