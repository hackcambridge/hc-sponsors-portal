import { Injectable } from '@angular/core';
import { PersonModel } from 'app/people/person.model';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

@Injectable()
export class PeopleService {
    constructor(private db: AngularFireDatabase) {}

    private getMentorsObject(guid: string): AngularFireObject<PersonModel[]> {
        return this.db.object(`sponsors/${guid}/people/mentors`);
    }

    private getRecruitersObject(guid: string): AngularFireObject<PersonModel[]> {
        return this.db.object(`sponsors/${guid}/people/recruiters`);
    }

    getMentors(guid: string): Observable<PersonModel[]> {
        return this.getMentorsObject(guid).valueChanges();
    }

    getRecruiters(guid: string): Observable<PersonModel[]> {
        return this.getRecruitersObject(guid).valueChanges();
    }

    saveState(guid: string, mentors: PersonModel[], recruiters: PersonModel[]): void {
        this.getMentorsObject(guid).set(mentors);
        this.getRecruitersObject(guid).set(recruiters);
    }
}
