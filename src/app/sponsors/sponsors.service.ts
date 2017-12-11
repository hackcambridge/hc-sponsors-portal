import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SponsorshipTier } from 'app/sponsors/sponsorship-tier.enum';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SponsorsService {
    private sponsorName$ = new BehaviorSubject<string>(undefined);
    private sponsorTier$ = new BehaviorSubject<SponsorshipTier>(undefined);

    constructor(private db: AngularFireDatabase) {}

    private getSponsorNameObject(guid: string): AngularFireObject<string> {
        return this.db.object(`sponsors/${guid}/name`);
    }

    setSponsorGuid(guid: string, onSet: (name: string) => void): void {
        this.getSponsorNameObject(guid).valueChanges<string>().subscribe(
            name => {
                this.sponsorName$.next(name);
                onSet(name);
            }
        );
    }

    getSponsorName(): Observable<string> {
        return this.sponsorName$;
    }
}
