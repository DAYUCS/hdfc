import { Injectable } from '@angular/core';

export interface Transaction {
  refNo: string;
  txDate: string;
  txAmount: number;
  txStatus: string;
  txType: string;
  txBeneficiary: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrxService {
  public transactions: Transaction[] = [
    {
      refNo: 'GI00359014',
      txDate: '2020-09-15',
      txAmount: 5000,
      txStatus: 'Pending from Auth1',
      txType: 'BG Issuance',
      txBeneficiary: 'Beneficiary1'
    },
    { 
      refNo: 'GI00359015',
      txDate: '2020-09-15',
      txAmount: 5000,
      txStatus: 'Pending from Auth2',
      txType: 'BG Issuance',
      txBeneficiary: 'Beneficiary2'
    },
    {
      refNo: 'GI00359016',
      txDate: '2020-09-15',
      txAmount: 5000,
      txStatus: 'Pending from Auth2',
      txType: 'BG Issuance',
      txBeneficiary: 'Beneficiary3'
    },
    {
      refNo: 'GL00359010',
      txDate: '2020-09-15',
      txAmount: 5000,
      txStatus: 'Pending from Auth3',
      txType: 'LC Issuance',
      txBeneficiary: 'Beneficiary3'
    }
  ]
  constructor() { }
  
  public findPendingTransactionsByTxType(txType: string): Transaction[] {
    return this.transactions.filter(t => t.txType === txType);
  }
}
