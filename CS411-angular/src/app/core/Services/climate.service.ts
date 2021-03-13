import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { Climate } from "../../Shared/Models/climate.model";


@Injectable({providedIn: 'root'})
export class ClimateService {
    private climates: Climate[] = [];
    private climateUpdated = new Subject<Climate[]>();

    constructor(private http: HttpClient) {}

    getUsers() {
        this.http.get<Climate[]>('http://localhost:3000/climate')
        .subscribe((userData) => {
            this.climates = userData;
            this.climateUpdated.next([...this.climates]);
        });
    }

    getUserUpdateListener() {
        return this.climateUpdated.asObservable();
    }
}