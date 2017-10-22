import { Component } from '@angular/core';

@Component({
    selector: 'app-mentors',
    templateUrl: './workshops.component.html'
})
export class WorkshopComponent {
    hasWorkshopSlot = true;
    hasProductDemoSlot = true;

    productDemoTitle = '';
    productDemoDescription = '';
    productDemoSpeaker = '';

    workshopTitle = '';
    workshopDescription = '';
    workshopSpeaker = '';

    doingWorkshop = false;
    doingProductDemo = false;
}
