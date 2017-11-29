import { Injectable } from '@angular/core';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { EventsSummaryModel } from 'app/events/events.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventsService {
    constructor(private db: AngularFireDatabase,
                private sponsorsService: SponsorsService) {}

    getHardwareApiCompetition(magicLink: string): Observable<EventsSummaryModel> {
        return this.sponsorsService.getSponsorGuid(magicLink).flatMap(
            guid => this.db.object('competitions/' + guid).valueChanges()
        );
    }

    saveEvents(magicLink: string, events: EventsSummaryModel): void {
        if (!events.hardwareApiCompetition) {
            delete events['hardwareApiCompetition'];
        }

        if (!events.sideEvent) {
            delete events['sideEvent'];
        }

        if (!events.themedCompetition) {
            delete events['themedCompetition'];
        }

        this.sponsorsService.getSponsorGuid(magicLink).first().subscribe(
            guid => this.db.object('competitions/' + guid).set(events)
        );
    }
}
