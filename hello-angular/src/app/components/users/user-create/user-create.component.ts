import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { UserService } from "../../../core/Services/user.service";

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
    enteredTitle = '';
    enteredContent = '';
    
    constructor(public userService: UserService) {}

    onAddUser(form: NgForm) {
        if (form.invalid) {
            return;
        }

        this.userService.addUser(10, form.value.content,form.value.content, form.value.content, 10, form.value.content);
    }
}