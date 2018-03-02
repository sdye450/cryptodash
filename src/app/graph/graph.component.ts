import {Component, Input, OnInit} from '@angular/core';
import { colorSets } from '../color-sets';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  @Input()
  chartData = [];

  @Input()
  displayChart = false;

  @Input()
  xLabel = 'les 10 dernières valeurs';

  @Input()
  yLabel = 'échange en €';

  @Input()
  view: any[] = [1200, 600];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    // domain: ['#AAAAAA', '#5AA454',  '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;

  constructor() {

  }

  ngOnInit() {
    // const name = 'fire';
    const name = 'flame';
    // const name = 'nightLights';
    this.colorScheme = colorSets.find(s => s.name === name);
  }

  onSelect(event) {
    console.log(event);
  }
}
