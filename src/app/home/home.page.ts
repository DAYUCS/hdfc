import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RefresherCustomEvent } from '@ionic/angular';
import { SpeechRecognition  } from '@capacitor-community/speech-recognition';
import { TextToSpeech  } from '@capacitor-community/text-to-speech';
import { MessageComponent } from '../message/message.component';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

import { DataService, Message } from '../services/data.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private data = inject(DataService);
  recording = false;
  promptText = 'Which type of transaction do you want to show?';
  comText = '';
  trxType = '';

  constructor(private router: Router) {
    SpeechRecognition.requestPermissions().then(
      () => {
        console.log('SpeechRecognition.requestPermissions() OK');
    });
  }

  refresh(ev: any) {
    setTimeout(() => {
      // Refresh data here;
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  async startRecognition() {
    //this.comText = 'Let me check the records of BG Issuance first';
    //this.callOpenai();

    const { available } = await SpeechRecognition.available();

    if (available) {
      this.recording = true;

      SpeechRecognition.start({
        language: "en-US",
        prompt: this.promptText,
        partialResults: true,
      });

      SpeechRecognition.addListener("partialResults", (data: any) => {
        console.log("partialResults was fired: " + data.matches);
        if (data.matches && data.matches.length > 0) {
          this.comText = data.matches[0];
          console.log("the command is " + this.comText);
        }
      });
    }
  
  }
  
  async stopRecognition() {
    console.log("stopping recognition");
    console.log("comText is " + this.comText + " and length is " + this.comText.length );
    if (this.comText && this.comText.length > 0) {
      console.log("call OpenAI with command " + this.comText);
      this.callOpenai();
    } else {
      this.speakText("Pardon, would you please try again?");
    }

    // stop listening partial results
    SpeechRecognition.removeAllListeners();
    SpeechRecognition.stop();
    this.recording = false;
    
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
    const options = {
      url: `${environment.aiBaseUrl}/trxtype`,
      params: { trxTypeCommand: this.comText },
    };
    
    CapacitorHttp.get(options).then((response) => {
      console.log("OpenAI Response Status: " + response.status);
      if ( response.status == 200) {
        console.log("OpenAI Response: " + JSON.stringify(response.data));
        const result = JSON.stringify(response.data);
        this.trxType = (JSON.parse(result)).data.trxType;
        console.log("ChatGPT response: " + this.trxType);
        this.speakText("You selected " + this.trxType);
        this.router.navigate(['message/', this.trxType]);
      } else {
        this.speakText("Sorry, I don't understand. Please try again");
      }
    });
    
  }

}
