import { Injectable } from '@angular/core';
import { TechListingModel } from 'app/tech/tech-listing.model';
import { AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable()
export class TechService {

    constructor(private db: AngularFireDatabase) {}

    private getTechListObject(guid: string): AngularFireObject<TechListingModel[]> {
        return this.db.object(`/sponsors/${guid}/tech`);
    }

    getTechList(guid: string): Observable<TechListingModel[]> {
        return this.getTechListObject(guid).valueChanges();
    }

    setTechList(guid: string, values: TechListingModel[]): Promise<void> {
        return this.getTechListObject(guid).set(values);
    }
}
