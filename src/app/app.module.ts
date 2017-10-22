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

const appRoutes: Routes = [
  { path: '', component: PortalComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'social-media', component: SocialMediaComponent },
  { path: 'workshops', component: WorkshopComponent },
  { path: 'tech', component: TechComponent },
  { path: 'swag', component: SwagComponent },
  { path: 'events', component: EventsComponent },
  { path: 'presentation', component: PresentationComponent }
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
    PresentationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
