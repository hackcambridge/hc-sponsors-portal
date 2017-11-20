import { Router, NavigationEnd } from '@angular/router';
import { SponsorModel } from 'app/sponsors/sponsor.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/first';
import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SponsorsService {
    private sponsor$ = new BehaviorSubject<SponsorModel>(undefined);

    /** The route is required to extract the user's magic link from. */
    constructor(private router: Router,
                private db: AngularFireDatabase) {}

    getSponsorGuid(magicLink: string): Observable<string> {
        return this.db.object('magic-links/' + magicLink).valueChanges();
    }

    setSponsorMagicLink(magicLink: string): void {
        this.getSponsorGuid(magicLink)
            .subscribe(guid => {
                if (guid) {
                    this.db.object('sponsors/' + guid).valueChanges().first().subscribe(
                        sponsor => this.sponsor$.next(<SponsorModel>sponsor)
                    );
                }
                else {
                    this.sponsor$.next(undefined);
                }
            });
    }

    getSponsor(): Observable<SponsorModel> {
        return this.sponsor$;
    }
}
