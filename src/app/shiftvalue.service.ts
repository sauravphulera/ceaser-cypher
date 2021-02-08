import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ShiftValueService {
  private shiftSource = new BehaviorSubject<string>("");
  private plainText = new BehaviorSubject<string>("");
  currentShiftValue = this.shiftSource.asObservable();
  constructor() {}

  changeShiftValue(shift: string) {
    this.shiftSource.next(shift);
  }
}
