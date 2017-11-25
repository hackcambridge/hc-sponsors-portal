import { Injectable } from '@angular/core';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { PersonModel } from 'app/people/person.model';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class PeopleService {
    constructor(private db: AngularFireDatabase,
                private sponsorsService: SponsorsService) {}

    getMentors(magicLink: string): Observable<PersonModel[]> {
        return this.sponsorsService.getSponsorGuid(magicLink).flatMap(
            guid => this.db.list('people/' + guid + '/mentors').valueChanges()
        );
    }

    getRecruiters(magicLink: string): Observable<PersonModel[]> {
        return this.sponsorsService.getSponsorGuid(magicLink).flatMap(
            guid => this.db.list('people/' + guid + '/recruiters').valueChanges()
        );
    }

    getJudge(magicLink: string): Observable<number> {
        return this.sponsorsService.getSponsorGuid(magicLink).flatMap(
            guid => this.db.object('people/' + guid + '/judge').valueChanges()
        );
    }

    saveState(magicLink: string, mentors: PersonModel[], recruiters: PersonModel[], judge: number) {
        return this.sponsorsService.getSponsorGuid(magicLink).first().subscribe(
            guid => {
                this.db.object('people/' + guid + '/mentors').set(mentors);
                this.db.object('people/' + guid + '/recruiters').set(recruiters);
                this.db.object('people/' + guid + '/judge').set(judge);
            }
        );
    }
}
