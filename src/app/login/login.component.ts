import { AdminService } from 'app/admin/admin.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { LayoutService } from 'app/layout.service';

@Component({
    selector: 'section[component="login"][grid="rows"]',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    email: string;
    password: string;

    constructor(private adminService: AdminService,
                private router: Router,
                private layoutService: LayoutService) {
        this.layoutService.setLayoutMode('a4');
    }

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
