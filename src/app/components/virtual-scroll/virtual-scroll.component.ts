import { Component, Input, OnInit } from '@angular/core';
import { SETTINGS } from 'src/app/settings';

@Component({
  selector: 'app-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styleUrls: ['./virtual-scroll.component.scss'],
})
export class VirtualScrollComponent implements OnInit {
  public viewportHeigh: number = 0;
  public start: number = 1;
  public topPaddingHeight: number = 0;
  public bottomPaddingHeight: number = 0;

  @Input() data: Array<any> = [];
  @Input() rowHeight: number = 0;
  @Input() visibleRows: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.viewportHeigh = this.rowHeight * this.visibleRows + 1;
  }

  public getTopheight() {
    return this.rowHeight * (this.start - 1);
  }

  public getBottomHeight() {
    if(this.start < this.data.length) this.rowHeight - (this.data!.length - this.start * this.visibleRows);
  }

  public onScroll(e: any) {
    this.start =
        SETTINGS.minIndex + Math.round(e.target.scrollTop / this.rowHeight);
  }
}
