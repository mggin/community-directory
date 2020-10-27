import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  constructor() {}

  getBrithYear() {
    const currentYear = new Date().getFullYear();
    return Array(100)
      .fill(null)
      .map((_null, index) => {
        return currentYear - index;
      });
  }

  getGender() {
    return [
      {
        short: 'M',
        long: 'Male',
      },
      {
        short: 'F',
        long: 'Female',
      },
    ];
  }
}
