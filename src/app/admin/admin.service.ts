
import {throwError as observableThrowError,  Observable, defer, of, concat } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireObject, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { SponsorIndexModel } from 'app/admin/sponsor-index.model';
import { SponsorshipBenefitModel } from 'app/benefits/sponsorship-benefit.model';
import { SponsorModel } from 'app/admin/sponsor.model';
import { UUID } from 'angular2-uuid';
import { AngularFireAuth } from 'angularfire2/auth';
import { first, flatMap, map, mapTo } from 'rxjs/operators';

@Injectable()
export class AdminService {
    constructor(private auth: AngularFireAuth,
                private db: AngularFireDatabase) {}

    loginUser(email: string, password: string): Promise<void> {
        return this.auth.auth.signInWithEmailAndPassword(email, password);
    }

    isLoggedIn(): Observable<boolean> {
        return this.auth.authState.pipe(map(
            user => user != null
        ));
    }

    private getSponsorIndexObjects(): AngularFireObject<SponsorIndexModel[]> {
        return this.db.object('admin/sponsors');
    }

    private getSponsorName(guid: string): AngularFireObject<string> {
        return this.db.object(`sponsors/${guid}/name`);
    }

    private getBenefitsObjects(): AngularFireObject<SponsorshipBenefitModel[]> {
        return this.db.object('benefits');
    }

    private getSponsorObjects(): AngularFireList<SponsorModel> {
        return this.db.list('sponsors');
    }

    getSponsors(): Observable<SponsorIndexModel[]> {
        return this.getSponsorIndexObjects().valueChanges();
    }

    getBenefits(): Observable<SponsorshipBenefitModel[]> {
        return this.getBenefitsObjects().valueChanges();
    }

    saveBenefits(benefits: SponsorshipBenefitModel[]): Promise<void> {
        return this.getBenefitsObjects().set(benefits);
    }

    addSponsor(sponsor: SponsorModel): Observable<string | void | {}> {
        if (!(sponsor.benefits &&
                (sponsor.maxRecruiters !== undefined && sponsor.maxRecruiters !== null) &&
                sponsor.name && sponsor.tier)) {
            return observableThrowError(new Error('Sponsor details not filled out'));
        }

        const guid$ = this.generateUniqueGuid().pipe(first());

        return guid$.pipe(flatMap(
            (guid, _) => {
                const setSponsor = defer(() => this.addSponsorObject(guid, sponsor));
                const setIndex = defer(() => this.addSponsorIndex(guid, sponsor.name));
                const setGuid = defer<string>(() => of(guid));

                return concat(setSponsor, setIndex, setGuid);
            }
        ));
    }

    private generateUniqueGuid(): Observable<string> {
        // Mae sure the GUID isn't already taken.
        const guid = UUID.UUID();

        return this.getSponsorName(guid).valueChanges()
        .pipe(first())
        .pipe(flatMap(
            name => {
                if (name) {
                    return this.generateUniqueGuid();
                }
                else {
                    return of(guid);
                }
            }
        ));
    }

    private addSponsorObject(guid: string, sponsor: SponsorModel): Promise<void> {
        return this.db.object(`sponsors/${guid}`).set(sponsor);
    }

    private addSponsorIndex(guid: string, name: string): Observable<void> {
        const index: SponsorIndexModel = {
            id: guid,
            name: name
        };

        const indexObjects = this.getSponsorIndexObjects();

        return indexObjects.valueChanges().pipe(first()).pipe(
            flatMap(
                (indices: SponsorIndexModel[]) => {
                    indices.push(index);
                    return indexObjects.set(indices);
                }
            ));
    }
}
