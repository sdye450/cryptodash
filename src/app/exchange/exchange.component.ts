import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {CryptoService} from '../services/crypo-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {ExchangeModel} from '../services/exchange.model';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
  preserveWhitespaces: false,
})
export class ExchangeComponent implements OnInit, AfterViewInit {
  exchange = <ExchangeModel>{};
  cryptos = ['BTC', 'XRP', 'ETH'];
  refreshMn = [1, 5, 10, 60];
  maxItems = 40;

  selectedCrypto = 'XRP';
  selectedRefresh = 5;
  dtRecup = new Date();
  timeStamp = 0;
  chronoText = '';

  private KEY_STORAGE = 'EXC_CRYPTO';

  chartOk = false;
  dataGraph = [{name: this.selectedCrypto, series: []}];

  valueMax = 10;
  showTicks = false;
  autoTicks = false;
  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(v) {
    this._tickInterval = Number(v);
  }
  private _tickInterval = 1;

  theme = 'dark';

  constructor(private exchangeSvc: CryptoService,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.updateExchange();
  }

  onChangeMax() {
    console.log('change max');
    /*this.chartOk = false;
    this.graphFilterData();*/
    this.updateExchange();
  }

  saveDataLocal(data) {
    let listStore = this.getLocal(this.KEY_STORAGE);
    if (listStore === null) {
      listStore = [];
    }

    const dataStore = {date: this.dtRecup, money: this.selectedCrypto, currency: data};
    listStore.push(dataStore);
    this.saveLocal(this.KEY_STORAGE, listStore);
  }

  graphFilterData() {
    const dataLocal = this.getLocal(this.KEY_STORAGE);
    // sélection des data sur la monnaie sélectionnée
    const filterData = dataLocal.filter((d) => d.money === this.selectedCrypto).sort(this.sortKey);
    // on prend les maxItems
    const filterDataLastItems = filterData.slice(filterData.length - this.maxItems, filterData.length);

    const dataGraphEuro = { name: 'EUR', series: []};
    const dataGraphUsd = { name: 'USD', series: []};

    const dataTmp = { name: this.selectedCrypto, series: []};

    for (let i = 0; i < filterDataLastItems.length; i++) {
      const dt = new Date(filterDataLastItems[i].date);

      dataGraphEuro.series.push({
        name: `${this.formatDateHeure(dt)}`,
        value: filterDataLastItems[i].currency.EUR
      });

      dataGraphUsd.series.push({
        name: `${this.formatDateHeure(dt)}`,
        value: filterDataLastItems[i].currency.USD
      });


      dataTmp.series.push({
        name: `${this.formatDateHeure(dt)}`,
        value: filterDataLastItems[i].currency.EUR
      });
    }

    /* this.dataGraph[0] = dataGraphEuro;
     this.dataGraph[1] = dataGraphUsd; */

    this.dataGraph[0].name = `${this.selectedCrypto} en €`;
    this.dataGraph[0] = dataTmp;
    this.chartOk = true;

    console.log('dataGraph ', this.dataGraph);
  }

  updateExchange() {
    this.chartOk = false;

    this.exchangeSvc.exchange(this.selectedCrypto).subscribe(data => {
      this.exchange = data;
      this.dtRecup = new Date();

      this.saveDataLocal(data);

      this.timeStamp = this.dtRecup.getTime() + (this.selectedRefresh * 60 * 1000);
      this.chrono();

      this.graphFilterData();
    });
  }

  sortKey(a: string, b: string) {
    if (a < b) {
      return -1;
    }

    if ( a > b) {
      return 1;
    }

    return 0;
  }

  getLocal(key) {
    return this.storage.get(key);
  }

  saveLocal(key, val): void {
    this.storage.set(key, val);
  }

  onSelectMoney(event) {
    this.selectedCrypto = event.value;
    this.updateExchange();
  }

  onSelectRefresh(event) {
    this.selectedRefresh = event.value;
    this.updateExchange();
  }

  formatNombre(n, currency = 'EUR') {
    const intlN = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: currency });
    return intlN.format(n);
  }

  formatHeure(dt = this.dtRecup) {
    const options = {hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'};
    const intlD = new Intl.DateTimeFormat('fr-FR', options);
    return intlD.format(dt);
  }

  formatDateHeure(dt) {
    const options = {hour12: false, year: 'numeric', month: '2-digit', day: '2-digit',hour: '2-digit', minute: '2-digit', second: '2-digit'};
    const dtFormat = new Intl.DateTimeFormat('fr-FR', options);

    return dtFormat.format(dt);
  }

  displayChronoText(delai) {
    const minutes = Math.floor(delai / 60);
    const seconds = delai - minutes * 60;
    this.chronoText = `prochaine mise à jour du cours dans ${minutes}mn ${seconds}s`;
  }

  chrono() {
    const dt = new Date();
    const delai = Math.round((this.timeStamp - dt.getTime()) / 1000);

    this.displayChronoText(delai);

    if (delai <= 0) {
      this.updateExchange();
    } else {
      setTimeout(() => this.chrono(), 500 );
    }
  }
}
