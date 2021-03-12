import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { User } from "../../Shared/Models/user.model";

@Injectable({providedIn: 'root'})
export class UserService {
    private users: User[] = [];
    private usersUpdated = new Subject<User[]>();


    constructor(private http: HttpClient) {}

    getUsers() {
        this.http.get<User[]>('http://localhost:3000/users')
        .subscribe((userData) => {
            this.users = userData;
            this.usersUpdated.next([...this.users]);
        });
    }

    getUserUpdateListener() {
        return this.usersUpdated.asObservable();
    }

    addUser(user_id: number, user_name: string, income: number, city: string, age: number, password: string) {
         const user: User = {
             user_id: user_id, 
             user_name: user_name, 
             income: income, 
             city: city, 
             age: age, 
             password: password
            }
         this.users.push(user);

         this.usersUpdated.next([...this.users])
    }
}