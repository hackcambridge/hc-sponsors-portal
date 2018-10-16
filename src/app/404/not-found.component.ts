import { Component } from '@angular/core';
import { LayoutService } from 'app/layout.service';

@Component({
    selector: 'section[component="not-found"][grid="rows"]',
    templateUrl: 'not-found.component.html'
})
export class NotFoundComponent {
    constructor(private layoutService: LayoutService) {
        this.layoutService.setLayoutMode('width');
    }
}
