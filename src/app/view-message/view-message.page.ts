import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import { TrxService, Transaction } from '../services/trx.service';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
})
export class ViewMessagePage implements OnInit {
  public transactions!: Transaction[];
  private trx = inject(TrxService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  constructor() {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('txType') as string;
    this.transactions = this.trx.getTransactions();
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Dashboard' : '';
  }
}
