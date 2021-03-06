import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { LayoutService } from 'app/layout.service';

import { firebase } from '../environments/firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { ChangesSavedComponent } from 'app/changes-saved/changes-saved.component';
import { HomeLinkComponent } from 'app/home-link/home-link.component';
import { HomeButtonComponent } from 'app/home-button/home-button.component';
import { PeopleService } from 'app/people/people.service';
import { EventsService } from 'app/events/events.service';
import { PresentationService } from 'app/presentation/presentation.service';
import { WorkshopService } from 'app/workshops/workshop.service';
import { TipsComponent } from 'app/tips/tips.component';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { TechService } from 'app/tech/tech.service';
import { AdminComponent } from 'app/admin/admin.component';
import { AdminService } from 'app/admin/admin.service';
import { NewSponsorComponent } from 'app/newSponsor/new-sponsor.component';
import { LoginComponent } from 'app/login/login.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthGuard } from 'app/auth-guard';
import { NotFoundComponent } from 'app/404/not-found.component';
import { SchedulesComponent } from 'app/schedule/schedule.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/new', component: NewSponsorComponent, canActivate: [AuthGuard] },
  { path: '404', component: NotFoundComponent },
  { path: ':guid/schedule', component: SchedulesComponent },
  { path: ':guid', component: PortalComponent },
  { path: ':guid/people', component: PeopleComponent },
  { path: ':guid/social-media', component: SocialMediaComponent },
  { path: ':guid/workshops', component: WorkshopComponent },
  { path: ':guid/tech', component: TechComponent },
  { path: ':guid/swag', component: SwagComponent },
  { path: ':guid/events', component: EventsComponent },
  { path: ':guid/presentation', component: PresentationComponent },
  { path: ':guid/tips', component: TipsComponent },
  { path: '**', redirectTo: '/404' }
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
    ChangesSavedComponent,
    HomeLinkComponent,
    HomeButtonComponent,
    TipsComponent,
    AdminComponent,
    NewSponsorComponent,
    SchedulesComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule.enablePersistence(),
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    BenefitsService,
    PeopleService,
    EventsService,
    PresentationService,
    WorkshopService,
    SponsorsService,
    TechService,
    AdminService,
    LayoutService,
    AngularFireDatabase,
    AngularFireAuth,
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
