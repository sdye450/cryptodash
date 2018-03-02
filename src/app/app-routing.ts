import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GraphComponent} from './graph/graph.component';
import {ExchangeComponent} from './exchange/exchange.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ExchangeComponent
  },
  {path: 'graph', component: GraphComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
