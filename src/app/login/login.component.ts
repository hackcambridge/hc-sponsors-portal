import { AdminService } from 'app/admin/admin.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'section[component="app-login"][grid="rows"]',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    email: string;
    password: string;

    constructor(private adminService: AdminService,
                private router: Router) {}

    ngOnInit(): void {
        if (this.adminService.isLoggedIn()) {
            this.router.navigate([ '/admin' ]);
        }
    }

    login(): void {
        this.adminService.loginUser(this.email, this.password)
            .then(success => this.router.navigate([ '/admin' ]))
            .catch((error: Error) => {
                alert(error.message);
            });
    }
}
