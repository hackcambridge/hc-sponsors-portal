import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable()
export class LayoutService {
    // Observable string sources
    private layoutModeSource = new Subject<string>();
    
    // Observable string streams
    layoutMode$ = this.layoutModeSource.asObservable();
    
    // Service message commands
    setLayoutMode(mode: string) {
        this.layoutModeSource.next(mode);
    }
}
