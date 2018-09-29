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

    private getDoingWorkshopObject(guid: string): AngularFireObject<boolean> {
        return this.db.object(`sponsors/${guid}/doingWorkshop`);
    }

    private getProductDemoObject(guid: string): AngularFireObject<WorkshopModel> {
        return this.db.object(`sponsors/${guid}/demo`);
    }

    private getDoingProductDemoObject(guid: string): AngularFireObject<boolean> {
        return this.db.object(`sponsors/${guid}/doingDemo`);
    }

    getWorkshop(guid: string): Observable<WorkshopModel> {
        return this.getWorkshopObject(guid).valueChanges();
    }

    getProductDemos(guid: string): Observable<WorkshopModel> {
        return this.getProductDemoObject(guid).valueChanges();
    }

    getDoingProductDemo(guid: string): Observable<boolean> {
        return this.getDoingProductDemoObject(guid).valueChanges();
    }

    getDoingWorkshop(guid: string): Observable<boolean> {
        return this.getDoingWorkshopObject(guid).valueChanges();
    }

    saveWorkshop(guid: string, events: WorkshopModel): void {
        this.saveDoingWorkshop(guid, (events != null));
        this.getWorkshopObject(guid).set(events)
    }

    saveProductDemo(guid: string, events: WorkshopModel): void {
        this.saveDoingProductDemo(guid, (events != null));
        this.getProductDemoObject(guid).set(events);
    }

    saveDoingProductDemo(guid: string, doingDemo: boolean): void {
        this.getDoingProductDemoObject(guid).set(doingDemo);
    }

    saveDoingWorkshop(guid: string, doingDemo: boolean): void {
        this.getDoingWorkshopObject(guid).set(doingDemo);
    }
}
