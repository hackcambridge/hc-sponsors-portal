import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PortalComponent } from 'app/portal/portal.component';
import { PeopleComponent } from 'app/people/people.component';
import { SocialMediaComponent } from 'app/social-media/social-media.component';
import { WorkshopComponent } from 'app/workshops/workshops.component';
import { TechComponent } from 'app/tech/tech.component';
import { SwagComponent } from 'app/swag/swag.component';
import { EventsComponent } from 'app/events/events.component';
import { PresentationComponent } from 'app/presentation/presentation.component';
import { BenefitsService } from 'app/benefits/benefits.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { firebase } from '../environments/firebase';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { ChangesSavedComponent } from 'app/changes-saved/changes-saved.component';

const appRoutes: Routes = [
  { path: ':code', component: PortalComponent },
  { path: ':code/people', component: PeopleComponent },
  { path: ':code/social-media', component: SocialMediaComponent },
  { path: ':code/workshops', component: WorkshopComponent },
  { path: ':code/tech', component: TechComponent },
  { path: ':code/swag', component: SwagComponent },
  { path: ':code/events', component: EventsComponent },
  { path: ':code/presentation', component: PresentationComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PortalComponent,
    PeopleComponent,
    SocialMediaComponent,
    WorkshopComponent,
    TechComponent,
    SwagComponent,
    EventsComponent,
    PresentationComponent,
    ChangesSavedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule.enablePersistence(),
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    BenefitsService,
    SponsorsService,
    AngularFireDatabase
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
