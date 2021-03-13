import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { User } from "../../../Shared/Models/user.model";
import { UserService } from "../../../core/Services/user.service";

@Component
({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

    users: User[] = [];
    private userSub: Subscription;

    constructor(public usersService: UserService) {}

    ngOnInit() { 
        this.usersService.getUsers();
        this.userSub = this.usersService.getUserUpdateListener()
            .subscribe((users: User[]) => {
                this.users = users;
            });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}
