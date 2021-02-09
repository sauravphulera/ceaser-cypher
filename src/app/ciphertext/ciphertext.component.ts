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
  mod(x, y) {
    return (x % y + y) % y;
  }

  convertToPlaintext(newCiphertext) {
    let newString = '';
      for(let i = 0; i< newCiphertext.length; i++) {
        //get the character code of each letter
        let c = newCiphertext.charCodeAt(i);

        // handle uppercase letters
        if(c >= 65 && c <=  90) {
          newString += String.fromCharCode( this.mod(c - 65 - parseInt(this.shiftValue),26) + 65); 

        // handle lowercase letters
        }else if(c >= 97 && c <= 122){
          newString += String.fromCharCode( this.mod((c - 97 - parseInt(this.shiftValue)) , 26) + 97);
        }
    }
    newString = newString.trim();
    console.log(newString);
    this.plainDisplayText = newString;
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
