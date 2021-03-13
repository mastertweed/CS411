import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { Location } from "../../../Shared/Models/location.model";
import { LocationService } from "../../../core/Services/location.service";

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit, OnDestroy {

  locations: Location[] = [];
  private locationSub: Subscription;

  constructor(public locationService: LocationService) {}

  ngOnInit() { 
    this.locationService.getUsers();
    this.locationSub = this.locationService.getUserUpdateListener()
        .subscribe((locations: Location[]) => {
            this.locations = locations;
        });
  }

  ngOnDestroy() {
      this.locationSub.unsubscribe();
  }

}
