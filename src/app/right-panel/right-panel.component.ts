import { Component, OnInit } from '@angular/core';
import {CoverageCalculateService} from "../services/coverage-calculate.service";

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {

  public model;
  public previousParams;
  private _defaultParams = {
    tx: 4,
    radio: 2.4
  };

  constructor(private _coverageCalculateService: CoverageCalculateService) {
    this.model = this._defaultParams;
    this.previousParams = this._defaultParams;
  }

  ngOnInit() {}

  public save() {
    this._coverageCalculateService.calculate(this.model);
  }

  public cancel() {
    console.log('prev', this.previousParams);

    // this.model = this.previousParams;
    this.model = this._defaultParams;
    console.log(this.model, this._defaultParams)
  }

  public onTxChange(currentValue, event, type) {
    // debugger;
    // this.previousParams[type] = Object.assign({}, currentValue);
    //   this.previousParams[type] = currentValue;
    this.previousParams.tx = currentValue;
      console.log(this.previousParams);
  }

  public onRadioChange(currentValue, event) {
    this.previousParams.radio = currentValue;
  }
}
