import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public data: Array<Data> = [];
  public rowHeight: number = 50;
  public visibleRows: number = 5;

  constructor(private dataService: DataService) { }
  
  ngOnInit(): void {
    this.data = this.dataService.getData(1, 10000);
  }
}
