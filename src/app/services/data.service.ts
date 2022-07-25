import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../interfaces/data.interface';
import { SETTINGS } from '../settings';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public getData(offset: number, limit: number): Data[] {
    const data = [];
    const start = Math.max(SETTINGS.minIndex, offset);
    const end = Math.min(offset + limit - 1, SETTINGS.maxIndex);
    if (start < end) {
      for (let i = start; i <= end; i++) {
        data.push({index: i, text: `Item ${i}`})
      }
    }
    return data;
  }
}
