import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ExchangeModel} from './exchange.model';

@Injectable()
export class CryptoService {
  private urlRoot = 'https://min-api.cryptocompare.com/data';
  private application = 'cryptodash';
  private exchangeFrom = 'CCCAGG'; // par défaut CCCAGG, Coinbase possible

  constructor(public http: HttpClient) { }

  /**
   * Taux de change d'une monnaie en $ ou € etc
   * @param {string} money : la crypto monnaie (ex: BTC, XRP, ETH, etc)
   * @param {string[]} currency : vers la ou les devises (USR, EUR, etc)
   * @param {string} exchangeFrom : plateforme où prendre les taux, par défaut CCCAGG, Coinbase possible
   */
  exchange(money: string = 'BTC', currency: string[] = ['USD', 'EUR'], exchangeFrom = this.exchangeFrom): Observable<any> {
    const urlPrice = `${this.urlRoot}/price`;
    const toCurrency = currency.join();

    const url = `${urlPrice}?fsym=${money}&tsyms=${toCurrency}&e=${exchangeFrom}&extraParams=${this.application}`;

    return this.http.get<ExchangeModel>(url);
  }

}
