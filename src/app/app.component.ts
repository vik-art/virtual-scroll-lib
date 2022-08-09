import { Component, OnInit } from '@angular/core';

import { DataService } from './services/data.service';
import { SETTINGS } from './settings';
import { Data } from './interfaces/data.interface';
import { Settings } from './interfaces/settings.interface';

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
