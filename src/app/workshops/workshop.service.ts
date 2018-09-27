import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { EventsSummaryModel } from 'app/events/events.model';
import { WorkshopModel } from 'app/workshops/workshop.model';
import { Observable } from 'rxjs';

@Injectable()
export class WorkshopService {
    constructor(private db: AngularFireDatabase) {}

    private getWorkshopObject(guid: string): AngularFireObject<WorkshopModel> {
        return this.db.object(`sponsors/${guid}/workshop`);
    }

    private getProductDemoObject(guid: string): AngularFireObject<WorkshopModel> {
        return this.db.object(`sponsors/${guid}/demo`);
    }

    getWorkshop(guid: string): Observable<WorkshopModel> {
        return this.getWorkshopObject(guid).valueChanges();
    }

    getProductDemos(guid: string): Observable<WorkshopModel> {
        return this.getProductDemoObject(guid).valueChanges();
    }

    saveWorkshop(guid: string, events: WorkshopModel): void {
        this.getWorkshopObject(guid).set(events)
    }

    saveProductDemo(guid: string, events: WorkshopModel): void {
        this.getProductDemoObject(guid).set(events);
    }
}
