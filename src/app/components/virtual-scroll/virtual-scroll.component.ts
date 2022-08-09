import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Settings } from 'src/app/interfaces/settings.interface';

@Component({
  selector: 'app-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styleUrls: ['./virtual-scroll.component.scss'],
})
export class VirtualScrollComponent implements OnInit {
  public viewportHeight: number = 0;
  public start: number = 0;
  public visibleRows: number = 0;
  public topPaddingHeight: number = 0;
  public bottomPaddingHeight: number = 0;

  public renderedData!: Array<any>;

  @Input() data: Array<any> = [];
  @Input() settings!: Settings;

  @ViewChild('container') container!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    const { itemHeight, amount, startIndex, tolerance, minIndex } = this.settings;
    const itemsAbove = startIndex - tolerance - minIndex;
    this.topPaddingHeight = itemsAbove * itemHeight;
    this.renderedData = this.getRenderedData(this.start, amount);
    this.viewportHeight = itemHeight * amount;
  }

  ngAfterViewInit(): void {
    const { prefetchedItems, itemHeight } = this.settings;
    const prefetchedHeight = prefetchedItems * itemHeight;
    const initialIndexPosition = this.topPaddingHeight + prefetchedHeight;
    this.container.nativeElement.scrollTop = initialIndexPosition;
    if (!initialIndexPosition) {
      this.onScroll({ target: { scrollTop: 0 } });
    }
  }

  public onScroll({ target: { scrollTop } }: any): void {
    const { minIndex, maxIndex, itemHeight, tolerance, amount } = this.settings;
    const toleranceHeight = tolerance * itemHeight;
    const bufferedItems = amount + 2 * tolerance;
    const totalHeight = (maxIndex - minIndex + 1) * itemHeight;
    const idx = minIndex + Math.floor((scrollTop - toleranceHeight) / itemHeight);
    const data = this.getRenderedData(idx, bufferedItems);
    this.topPaddingHeight = Math.max((idx - minIndex) * itemHeight);
    this.bottomPaddingHeight = Math.max(totalHeight - this.topPaddingHeight - this.data.length * itemHeight);
    this.renderedData = data;
  }

  private getRenderedData(index: number, bufferedItems: number): Array<any> {
    let data = [];
    const { minIndex, maxIndex } = this.settings;
    const start = Math.max(minIndex, index);
    const end = Math.min(index + bufferedItems - 1, maxIndex);
    if (start <= end) {
      for (let i = start; i <= end; i++) {
        data.push(this.data[i]);
      }
    }
    return data;
  }
}
