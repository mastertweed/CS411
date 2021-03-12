import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { Prefers } from "../../../Shared/Models/prefers.model";
import { PrefersService } from "../../../core/Services/prefers.service";


@Component({
  selector: 'app-prefers-list',
  templateUrl: './prefers-list.component.html',
  styleUrls: ['./prefers-list.component.css']
})
export class PrefersListComponent implements OnInit, OnDestroy {

  prefers: Prefers[] = [];
  private prefersSub: Subscription;

  constructor(public prefersService: PrefersService) {}

  ngOnInit() { 
    this.prefersService.getUsers();
    this.prefersSub = this.prefersService.getUserUpdateListener()
        .subscribe((prefers: Prefers[]) => {
            this.prefers = prefers;
        });
  }

  ngOnDestroy() {
      this.prefersSub.unsubscribe();
  }

}
