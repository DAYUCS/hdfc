import { Injectable } from '@angular/core';

export interface Message {
  txType: string;
  recNumber: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public messages: Message[] = [
    {
      txType: 'BG Issuance',
      recNumber: 9
    },
    {
      txType: 'BG Amendment',
      recNumber: 0
    },
    {
      txType: 'LC Issuance',
      recNumber: 3
    },
    {
      txType: 'LC Amendment',
      recNumber: 0
    },
    {
      txType: 'Remittance',
      recNumber: 2
    }
  ];

  constructor() { }

  public getMessages(): Message[] {
    return this.messages;
  }

}
