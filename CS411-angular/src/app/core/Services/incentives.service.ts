import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { Incentives } from "../../Shared/Models/incentives.model";


@Injectable({providedIn: 'root'})
export class IncentivesService {
    private incentives: Incentives[] = [];
    private incentivesUpdated = new Subject<Incentives[]>();

    constructor(private http: HttpClient) {}

    getUsers() {
        this.http.get<Incentives[]>('http://localhost:3000/incentives')
        .subscribe((userData) => {
            this.incentives = userData;
            this.incentivesUpdated.next([...this.incentives]);
        });
    }

    getUserUpdateListener() {
        return this.incentivesUpdated.asObservable();
    }
}