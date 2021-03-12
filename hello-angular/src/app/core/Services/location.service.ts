import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { Location } from "../../Shared/Models/location.model";


@Injectable({providedIn: 'root'})
export class LocationService {
    private locations: Location[] = [];
    private locationsUpdated = new Subject<Location[]>();

    constructor(private http: HttpClient) {}

    getUsers() {
        this.http.get<Location[]>('http://localhost:3000/locations')
        .subscribe((userData) => {
            this.locations = userData;
            this.locationsUpdated.next([...this.locations]);
        });
    }

    getUserUpdateListener() {
        return this.locationsUpdated.asObservable();
    }
}