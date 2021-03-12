import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { Climate } from "../../../Shared/Models/climate.model";
import { ClimateService } from "../../../core/Services/climate.service";

@Component({
  selector: 'app-climate-list',
  templateUrl: './climate-list.component.html',
  styleUrls: ['./climate-list.component.css']
})
export class ClimateListComponent implements OnInit, OnDestroy {

  climates: Climate[] = [];
  private climateSub: Subscription;

  constructor(public climateService: ClimateService) {}

  ngOnInit() { 
    this.climateService.getUsers();
    this.climateSub = this.climateService.getUserUpdateListener()
        .subscribe((climates: Climate[]) => {
            this.climates = climates;
        });
  }

  ngOnDestroy() {
      this.climateSub.unsubscribe();
  }

}
