import { Component } from '@angular/core';

@Component({
  selector: 'cipher-app',
  template: `
            <shift></shift>
            <div class="inputArea">
              <plaintext [(plainDisplayText)]="this.plaintext" (changePlainText)="this.plainTectChange($event)"></plaintext>
              <ciphertext [(cipherDisplayText)]="this.ciphertext" (changeCipher)="this.cipherText($event)"></ciphertext>
            </div>
            `
})
export class AppComponent { 
  plaintext = '';
  ciphertext = '';
  plainTectChange(text) {
    this.ciphertext = text;
  }
  cipherText(text) {
    this.plaintext = text;
  }
}
