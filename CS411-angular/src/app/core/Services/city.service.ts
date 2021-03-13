import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { City } from "../../Shared/Models/city.model";


@Injectable({providedIn: 'root'})
export class CityService {
    private citys: City[] = [];
    private citysUpdated = new Subject<City[]>();

    constructor(private http: HttpClient) {}

    getUsers() {
        this.http.get<City[]>('http://localhost:3000/city')
        .subscribe((userData) => {
            this.citys = userData;
            this.citysUpdated.next([...this.citys]);
        });
    }

    getUserUpdateListener() {
        return this.citysUpdated.asObservable();
    }
}