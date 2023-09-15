import { Component, inject } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { SpeechRecognition  } from '@capacitor-community/speech-recognition';
import { TextToSpeech  } from '@capacitor-community/text-to-speech';
import { MessageComponent } from '../message/message.component';

import { DataService, Message } from '../services/data.service';
import { OpenaiService, Result, Data } from '../services/openai.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private data = inject(DataService);
  private openai = inject(OpenaiService);
  public gettrxtype$!: Observable<any>;
  recording = false;
  promptText = 'Which type of transaction do you want to show?';
  comText = '';
  trxType = '';

  constructor() {
    SpeechRecognition.requestPermissions().then(
      () => {
        console.log('SpeechRecognition.requestPermissions() OK');
    });
  }

  refresh(ev: any) {
    setTimeout(() => {
      this.getMessages();
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  async startRecognition() {
    this.comText = 'Let me check the records of BG Issuance first';
    this.callOpenai();

    /*
    const { available } = await SpeechRecognition.available();

    if (available) {
      this.recording = true;

      SpeechRecognition.start({
        language: "en-US",
        prompt: this.promptText,
        partialResults: true,
      });

      SpeechRecognition.addListener("partialResults", (data: any) => {
        console.log("partialResults was fired: ", data.matches);
        console.log("data matches length is ", data.matches.length);
        if (data.matches && data.matches.length > 0) {
          this.comText = data.matches[0];
          console.log("the command is ", this.comText);
        }
      });
    }
    */
  }
  
  async stopRecognition() {
    this.recording = false;
    if (this.comText && this.comText.length > 0) {
      //this.speakText("Let me think");
      await this.callOpenai();
    } 
    await SpeechRecognition.stop();
  }

  speakText(prompt: string) {
      TextToSpeech.speak({
        text: prompt,
        lang: 'en-US',
        rate: 1.0,
        pitch: 1.0,
        volume: 1.0,
        category: 'abmient',
      });
  }

  callOpenai() {
    //this.speakText("let me ask opanapi");
    this.openai.getTrxType(this.comText).subscribe(
      (data: Result) => {
        this.trxType = data.data.trxType;
        console.log("ChatGPT response: " + this.trxType);
      });
  }

}
