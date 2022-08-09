import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { Settings } from './interfaces/settings.interface';

import { DataService } from './services/data.service';
import { SETTINGS } from './settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public data: Array<Data> = [];
  public settings!: Settings;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.settings = SETTINGS;
    this.data = this.dataService.getData(1, 10000);
  }
}
