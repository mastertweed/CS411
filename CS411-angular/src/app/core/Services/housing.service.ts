import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { Housing } from "../../Shared/Models/housing.model";


@Injectable({providedIn: 'root'})
export class HousingService {
    private housings: Housing[] = [];
    private housingUpdated = new Subject<Housing[]>();

    constructor(private http: HttpClient) {}

    getUsers() {
        this.http.get<Housing[]>('http://localhost:3000/housing')
        .subscribe((userData) => {
            this.housings = userData;
            this.housingUpdated.next([...this.housings]);
        });
    }

    getUserUpdateListener() {
        return this.housingUpdated.asObservable();
    }
}