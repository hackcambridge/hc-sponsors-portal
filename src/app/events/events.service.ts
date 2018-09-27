import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { EventsSummaryModel } from 'app/events/events.model';
import { Observable } from 'rxjs';

@Injectable()
export class EventsService {
    constructor(private db: AngularFireDatabase) {}


    private getCompetitionsObject(guid: string): AngularFireObject<EventsSummaryModel> {
        return this.db.object(`/sponsors/${guid}/competitions`);
    }

    getHardwareApiCompetition(guid: string): Observable<EventsSummaryModel> {
        return this.getCompetitionsObject(guid).valueChanges();
    }

    saveEvents(guid: string, events: EventsSummaryModel): void {
        if (!events.hardwareApiCompetition) {
            delete events['hardwareApiCompetition'];
        }

        if (!events.sideEvent) {
            delete events['sideEvent'];
        }

        if (!events.themedCompetition) {
            delete events['themedCompetition'];
        }

        this.getCompetitionsObject(guid).set(events);
    }
}
