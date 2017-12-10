import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AdminService } from 'app/admin/admin.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
                private adminService: AdminService) { }

    canActivate(): Observable<boolean> {
        return this.adminService.isLoggedIn().map(
            loggedIn => {
                if (!loggedIn) {
                    this.router.navigate(['/login']);
                }

                return loggedIn;
            }
        );
    }
}
