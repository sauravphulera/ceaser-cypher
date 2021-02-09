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
    this.plaintext = this.convertToCiphertext(this.plainDisplayText);
    this.cipherDisplayText = this.plaintext;
  }

  convertToCiphertext(newPlaintext) {
    let newString = '';
    for(let i = 0; i< newPlaintext.length; i++) {
      //get the character code of each letter
      let c = newPlaintext.charCodeAt(i);

      // handle uppercase letters
      if(c >= 65 && c <=  90) {
        newString += String.fromCharCode((c - 65 + parseInt(this.shiftValue)) % 26 + 65); 

      // handle lowercase letters
      }else if(c >= 97 && c <= 122){
        newString += String.fromCharCode((c - 97 + parseInt(this.shiftValue)) % 26 + 97);
      }
  }
    this.cipherDisplayText = newString;
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
