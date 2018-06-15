import {Component} from '@angular/core';
import {CoverageCalculateService} from "../services/coverage-calculate.service";

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent {

  public model;
  public previousParams;
  public distance: number = this._coverageCalculateService.distanceKm;
  private _defaultParams = this._coverageCalculateService.defaultParams;

  constructor(private _coverageCalculateService: CoverageCalculateService) {
    _coverageCalculateService.changeParamsSubject.subscribe((distance) => {
      this.distance = distance;
    });
    this.model = this._defaultParams;
    this.previousParams = this._defaultParams;
  }

  public save() {
    this._coverageCalculateService.setParams(this.model);
  }

  public cancel() {
    this.model.tx = localStorage.getItem('tx');
    this.model.radio = localStorage.getItem('radio');
    this._coverageCalculateService.setParams(this.model);
  }

  public onTxChange(currentValue) {
    localStorage.setItem('tx', currentValue);
  }

  public onRadioChange(currentValue) {
    localStorage.setItem('radio', currentValue);
  }
}
