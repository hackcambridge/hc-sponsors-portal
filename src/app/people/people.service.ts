import { Injectable } from '@angular/core';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { PersonModel } from 'app/people/person.model';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

@Injectable()
export class PeopleService {
    constructor(private db: AngularFireDatabase,
                private sponsorsService: SponsorsService) {}

    private getMentorsObject(guid: string): AngularFireObject<PersonModel[]> {
        return this.db.object(`sponsors/${guid}/people/mentors`)
    }

    private getRecruitersObject(guid: string): AngularFireObject<PersonModel[]> {
        return this.db.object(`sponsors/${guid}/people/recruiters`)
    }

    private getJudgeObject(guid: string): AngularFireObject<number> {
        return this.db.object(`sponsors/${guid}/people/judge`)
    }

    getMentors(magicLink: string): Observable<PersonModel[]> {
        return this.sponsorsService.getSponsorGuid(magicLink).flatMap(
            guid => this.getMentorsObject(guid).valueChanges()
        );
    }

    getRecruiters(magicLink: string): Observable<PersonModel[]> {
        return this.sponsorsService.getSponsorGuid(magicLink).flatMap(
            guid => this.getRecruitersObject(guid).valueChanges()
        );
    }

    getJudge(magicLink: string): Observable<number> {
        return this.sponsorsService.getSponsorGuid(magicLink).flatMap(
            guid => this.getJudgeObject(guid).valueChanges()
        );
    }

    saveState(magicLink: string, mentors: PersonModel[], recruiters: PersonModel[], judge: number) {
        return this.sponsorsService.getSponsorGuid(magicLink).first().subscribe(
            guid => {
                this.getMentorsObject(guid).set(mentors);
                this.getRecruitersObject(guid).set(recruiters);
                this.getJudgeObject(guid).set(judge);
            }
        );
    }
}
