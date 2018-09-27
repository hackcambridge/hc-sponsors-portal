import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { BehaviorSubject ,  Observable } from 'rxjs';
import { SponsorshipTier } from 'app/sponsors/sponsorship-tier.enum';

@Injectable()
export class SponsorsService {
    private sponsorName$ = new BehaviorSubject<string>(undefined);
    private sponsorTier$ = new BehaviorSubject<SponsorshipTier>(undefined);

    constructor(private db: AngularFireDatabase) {}

    private getSponsorNameObject(guid: string): AngularFireObject<string> {
        return this.db.object(`sponsors/${guid}/name`);
    }

    private getSponsorTierObject(guid: string): AngularFireObject<SponsorshipTier> {
        return this.db.object(`sponsors/${guid}/tier`);
    }

    setSponsorGuid(guid: string): void {
        this.getSponsorNameObject(guid).valueChanges().subscribe(
            name => this.sponsorName$.next(name)
        );

        this.getSponsorTierObject(guid).valueChanges().subscribe(
            tier => this.sponsorTier$.next(tier)
        );
    }

    getSponsorName(): Observable<string> {
        return this.sponsorName$;
    }

    getSponsorTier(): Observable<string> {
        return this.sponsorTier$;
    }
}
