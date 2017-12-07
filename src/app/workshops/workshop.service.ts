import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { Observable } from 'rxjs/Observable';
import { EventsSummaryModel } from 'app/events/events.model';
import { WorkshopModel } from 'app/workshops/workshop.model';

@Injectable()
export class WorkshopService {
    constructor(private db: AngularFireDatabase,
        private sponsorsService: SponsorsService) {}

    getWorkshop(magicLink: string): Observable<WorkshopModel> {
        return this.sponsorsService.getSponsorGuid(magicLink).flatMap(
            guid => this.db.object(`workshops/${guid}/workshop`).valueChanges()
        );
    }

    getProductDemos(magicLink: string): Observable<WorkshopModel> {
        return this.sponsorsService.getSponsorGuid(magicLink).flatMap(
            guid => this.db.object(`workshops/${guid}/demo`).valueChanges()
        );
    }

    saveWorkshop(magicLink: string, events: WorkshopModel): void {
        this.sponsorsService.getSponsorGuid(magicLink).first().subscribe(
            guid => this.db.object(`workshops/${guid}/workshop`).set(events)
        );
    }

    saveProductDemo(magicLink: string, events: WorkshopModel): void {
        this.sponsorsService.getSponsorGuid(magicLink).first().subscribe(
            guid => this.db.object(`workshops/${guid}/demo`).set(events)
        );
    }
}
