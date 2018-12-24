import { Component } from '@angular/core';
import { BaseComponent } from 'app/base.component';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'app/layout.service';

@Component({
    selector: 'section[component="schedule"]',
    templateUrl: './schedule.component.html'
})
export class SchedulesComponent {
    constructor(private layoutService: LayoutService) {
        this.layoutService.setLayoutMode('a4');
    }
}
