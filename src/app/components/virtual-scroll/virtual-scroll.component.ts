import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/interfaces/data.interface';

import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styleUrls: ['./virtual-scroll.component.scss'],
})
export class VirtualScrollComponent implements OnInit {
  public viewportHeigh: number = 0;
  public rowHeight: number = 50;
  public data: Array<Data> = [];

  public visibleRows: number = 4;
  public start: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.data = this.dataService.getData(1, 10);
    this.viewportHeigh = this.rowHeight * this.visibleRows + 1;
  }

  public getTopheight() {
    return this.rowHeight * this.start;
  }

  public getBottomHeight() {
    return this.rowHeight - (this.data.length - this.start * this.visibleRows);
  }

  public onScroll(e: any) {
    this.start = Math.round(e.target.scrollTop / this.rowHeight);
  }
}
