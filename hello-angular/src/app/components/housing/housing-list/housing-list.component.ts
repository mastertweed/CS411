import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { Housing } from "../../../Shared/Models/housing.model";
import { HousingService } from "../../../core/Services/housing.service";

@Component({
  selector: 'app-housing-list',
  templateUrl: './housing-list.component.html',
  styleUrls: ['./housing-list.component.css']
})
export class HousingListComponent implements OnInit, OnDestroy {

  housings: Housing[] = [];
  private housingSub: Subscription;

  constructor(public housingService: HousingService) {}

  ngOnInit() { 
    this.housingService.getUsers();
    this.housingSub = this.housingService.getUserUpdateListener()
        .subscribe((housings: Housing[]) => {
            this.housings = housings;
        });
  }

  ngOnDestroy() {
      this.housingSub.unsubscribe();
  }

}
