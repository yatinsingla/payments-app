import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public allowOnlyNumbers(event) {
    const keyCode = event.keyCode;
    if ((keyCode === 8 || keyCode === 46 || keyCode === 37 || keyCode === 39 || keyCode === 9 || keyCode === 13) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (keyCode === 65 || keyCode === 97) ||
      (keyCode === 67 || keyCode === 97) ||
      (keyCode === 86 || keyCode === 97) ||
      ((keyCode >= 48 && keyCode <= 57) && (event.shiftKey === false))) {
      return;
    } else {
      event.preventDefault();
    }
  }
}
