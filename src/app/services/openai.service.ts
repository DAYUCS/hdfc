import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export interface Data {
  trxType: string;
}

export interface Result {
  success: boolean;
  data: Data;
}

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {

  constructor(private http: HttpClient) {}

  public getTrxType(humanMsg: string): Observable<Result>{
    console.log('The human message is: ', humanMsg);
    let querParams = new HttpParams().append("trxTypeCommand", humanMsg);
    return this.http.get<Result>(`${environment.aiBaseUrl}/trxtype`, {params: querParams});
  }
}
