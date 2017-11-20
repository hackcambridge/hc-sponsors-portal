import { Injectable } from '@angular/core';
import { SponsorshipBenefitModel } from 'app/benefits/sponsorship-benefit.model';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
/**
 * This service provides information about the benefits that the current
 * sponsor is entitled to based on their sponsorship package.
 */
export class BenefitsService {
    constructor(private db: AngularFireDatabase,
                private sponsorsService: SponsorsService) {}

    getSponsorBenefitDescriptions(magicLink: string): Observable<SponsorshipBenefitModel[]> {
        return this.sponsorsService.getSponsorGuid(magicLink).flatMap(
            guid => this.db.list('/sponsors/' + guid + '/benefits').valueChanges()
        );
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

    canAwardThemedPrize(): boolean {
        // TODO Hard coded for now
        return true;
    }

    canRunHardwareApiPrize(): boolean {
        // TODO hard coded for now
        return true;
    }

    canRunSideEvent(): boolean {
        // TODO hard coded for now
        return true;
    }

    getMaxNumberOfRecruiters(): number {
        // TODO hard coded for now
        return 5;
    }

    hasWorkshopSlot(): boolean {
        // TODO hard coded for now
        return true;
    }

    hasProductDemoSlot(): boolean {
        // TODO hard coded for now
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
