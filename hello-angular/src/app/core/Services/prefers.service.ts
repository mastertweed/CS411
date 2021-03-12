import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { Prefers } from "../../Shared/Models/prefers.model";


@Injectable({providedIn: 'root'})
export class PrefersService {
    private prefers: Prefers[] = [];
    private perfersUpdated = new Subject<Prefers[]>();

    constructor(private http: HttpClient) {}

    getUsers() {
        this.http.get<Prefers[]>('http://localhost:3000/prefers')
        .subscribe((userData) => {
            this.prefers = userData;
            this.perfersUpdated.next([...this.prefers]);
        });
    }

    getUserUpdateListener() {
        return this.perfersUpdated.asObservable();
    }
}