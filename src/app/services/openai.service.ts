import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

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

  
}
