import { Component } from '@angular/core';
import { SwagModel } from 'app/swag/swag.model';

@Component({
    selector: 'app-swag',
    templateUrl: './swag.component.html'
})
export class SwagComponent {
    swagList: SwagModel[] = [];

    addSwag(): void {
        this.swagList.unshift(new SwagModel());
    }

    deleteSwag(index: number): void {
        if (this.swagList[index]) {
            this.swagList.splice(index, 1);
        }
    }
}
