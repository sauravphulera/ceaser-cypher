import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShiftValueService } from '../shiftvalue.service';

@Component({
  selector: 'plaintext',
  templateUrl: './plaintext.component.html'
})
export class PlaintextComponent {

  plaintext: string;
  @Input() plainDisplayText: string = "";
  @Input() cipherText: string = "";
  @Output() changePlainText = new EventEmitter<string>();
  cipherDisplayText: string = "";
  shiftValue: string;
  constructor(public service: ShiftValueService) { 
    this.service.currentShiftValue.subscribe((shift) => {
      this.shiftValue = shift;  
    })
  }
  ngOnChanges() {
    this.plaintext = this.cipherText;
    console.log(this.cipherText);
  }

  convertToCiphertext(newPlaintext) {
    let newString = '';
    for(let i = 0; i< newPlaintext.length; i++) {
      if(i < parseInt(this.shiftValue)) {
        newString += String.fromCharCode(newPlaintext.charCodeAt(0) - 1);
      } else {
        newString += newPlaintext[i];
      }
    }
    return newString;
  }

  getCipherDisplayText() {
    // this.service.cipherText.subscibe((data) => {
    //   this.cipherDisplayText = data;
    // })
  }
  onInputChange(text) {
    this.changePlainText.emit(text)
  }
}
