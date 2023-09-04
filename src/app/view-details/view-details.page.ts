import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import { Transaction, TrxService } from 'src/app/services/trx.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.page.html',
  styleUrls: ['./view-details.page.scss'],
})
export class ViewDetailsPage implements OnInit {
  public transaction!: Transaction;
  private trx = inject(TrxService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  constructor() {}

  ngOnInit() {
    const refNo = this.activatedRoute.snapshot.paramMap.get('refNo') as string;
    this.transaction = this.trx.findPendingTransactionByRefNo(refNo);
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Inquiry' : '';
  }
}
