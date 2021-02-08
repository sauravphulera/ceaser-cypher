import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShiftValueService } from '../shiftvalue.service';

@Component({
  selector: 'ciphertext',
  templateUrl: './ciphertext.component.html'
})
export class CiphertextComponent {

  ciphertext: string;
  @Input() cipherDisplayText: string = "";
  @Output() changeCipher = new EventEmitter<string>();
  plainDisplayText: string = "";
  shiftValue: string;
  constructor(public service: ShiftValueService) { 
    this.service.currentShiftValue.subscribe((shift) => {
      this.shiftValue = shift;
    })
  }

  ngOnChanges() {
    console.log(this.cipherDisplayText)
    this.ciphertext = this.convertToPlaintext(this.cipherDisplayText);
  }

  convertToPlaintext(newCiphertext) {
    console.log(this.shiftValue)
    let newString = '';
    for(let i = 0; i< newCiphertext.length; i++) {
      if(i < parseInt(this.shiftValue)) {
        newString += String.fromCharCode(newCiphertext.charCodeAt(0) + 1);
      } else {
        newString += newCiphertext[i];
      }
    }
    return newString;
  }

  getPlainDisplayText() {
    this.service.currentShiftValue.subscribe((shift) => {
      this.shiftValue = shift;
    })    
  }
  onInputChange(text) {
    this.changeCipher.emit(text);
  }
}
