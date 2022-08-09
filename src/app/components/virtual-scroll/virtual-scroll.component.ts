import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
    const { itemHeight, amount } = this.settings;
    this.renderedData = this.getRenderedData(this.start, amount);
    console.log(this.renderedData)
    this.viewportHeight = itemHeight * amount;
  }

  ngAfterViewInit() {
    const { prefetchedItems, itemHeight } = this.settings;
    const prefetchedHeight = prefetchedItems * itemHeight;
    const initialIndexPosition = this.topPaddingHeight + prefetchedHeight;
    this.container.nativeElement.scrollTop = initialIndexPosition;
    if (!initialIndexPosition) {
      this.onScroll({ target: { scrollTop: 0 } });
    }
  }

  public getTopHeight() {
    const { startIndex, tolerance, minIndex, itemHeight } = this.settings;
    const itemsAbove = startIndex - tolerance - minIndex;
    this.topPaddingHeight = itemsAbove * itemHeight;
  }

  public getBottomHeight(): void {
    const { maxIndex, minIndex, itemHeight } = this.settings;
    const totalHeight = (maxIndex - minIndex + 1) * itemHeight;
    this.bottomPaddingHeight = totalHeight - this.topPaddingHeight;
  }

  public onScroll(e: any) {
    const { minIndex, maxIndex, itemHeight, tolerance, amount } = this.settings;
    const toleranceHeight = tolerance * itemHeight;
    const bufferedItems = amount + 2 * tolerance;
    const totalHeight = (maxIndex - minIndex + 1) * itemHeight;
    const idx = minIndex + Math.floor((e.target.scrollTop - toleranceHeight) / itemHeight);
    const data = this.getRenderedData(idx, bufferedItems);
    this.topPaddingHeight = Math.max((idx - minIndex) * itemHeight, 0);
    this.bottomPaddingHeight = Math.max(
      totalHeight - this.topPaddingHeight - data.length * itemHeight,
      0
    );
    this.renderedData = data;
  }

  private getRenderedData(index: number, bufferedItems: number) {
    let data = [];
    const { minIndex, maxIndex } = this.settings;
    const start = Math.max(minIndex, index);
    const end = Math.min(
      index + bufferedItems - 1,
      maxIndex
    );
    if (start <= end) {
      for (let i = start; i <= end; i++) {
        data.push(this.data[i]);
      }
    }
    return data;
  }
}
