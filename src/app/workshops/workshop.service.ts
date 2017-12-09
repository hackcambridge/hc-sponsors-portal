import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { EventsSummaryModel } from 'app/events/events.model';
import { WorkshopModel } from 'app/workshops/workshop.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WorkshopService {
    constructor(private db: AngularFireDatabase,
        private sponsorsService: SponsorsService) {}

    private getWorkshopObject(guid: string): AngularFireObject<WorkshopModel> {
        return this.db.object(`sponsors/${guid}/workshop`);
    }

    private getProductDemoObject(guid: string): AngularFireObject<WorkshopModel> {
        return this.db.object(`sponsors/${guid}/demo`);
    }

    getWorkshop(magicLink: string): Observable<WorkshopModel> {
        return this.sponsorsService.getSponsorGuid(magicLink).flatMap(
            guid => this.getWorkshopObject(guid).valueChanges()
        );
    }

    getProductDemos(magicLink: string): Observable<WorkshopModel> {
        return this.sponsorsService.getSponsorGuid(magicLink).flatMap(
            guid => this.getProductDemoObject(guid).valueChanges()
        );
    }

    saveWorkshop(magicLink: string, events: WorkshopModel): void {
        this.sponsorsService.getSponsorGuid(magicLink).first().subscribe(
            guid => this.getWorkshopObject(guid).set(events)
        );
    }

    saveProductDemo(magicLink: string, events: WorkshopModel): void {
        this.sponsorsService.getSponsorGuid(magicLink).first().subscribe(
            guid => this.getProductDemoObject(guid).set(events)
        );
    }
}
