import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { PresentationModel } from 'app/presentation/presentation.model';
import { Observable } from 'rxjs/Observable';
import 'firebase/storage';

@Injectable()
export class PresentationService {
    constructor(private db: AngularFireDatabase,
                private af: FirebaseApp) {}

    private getPresentationObject(guid: string): AngularFireObject<PresentationModel> {
        return this.db.object(`sponsors/${guid}/presentation`);
    }

    getUploadedPresentation(guid: string): Observable<PresentationModel> {
        return this.getPresentationObject(guid).valueChanges();
    }

    uploadPresentation(guid: string, data: File): Promise<PresentationModel> {
        return this.deletePresentation(guid).then(
            success => this.pushUpload(guid, data)
        );
    }

    private deletePresentation(guid: string): Promise<void> {
        const del = this.getUploadedPresentation(guid).flatMap(
            presentation => {
                if (presentation) {
                    const deleteTask = this.af.storage().ref(presentation.refPath).delete();

                    return deleteTask.then(
                        success => this.getPresentationObject(guid).remove()
                    )
                    .catch(
                        error => this.getPresentationObject(guid).remove()
                    );
                }
                else {
                    return Observable.of(null);
                }
            }
        ).first();

        const subscription = del.subscribe();

        return del.toPromise();
    }

    private pushUpload(guid: string, data: File): Promise<PresentationModel> {
        const refPath = `${guid}/${data.name}`;
        const task = this.af.storage().ref(refPath).put(data);

        return task.then(
            snapshot => {
                const presentation: PresentationModel = {
                    name: data.name,
                    url: snapshot.downloadURL,
                    refPath: refPath
                };

                this.getPresentationObject(guid).set(presentation);

                return presentation;
            }
        );
    }
}
