import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

interface AccessPointParams {
  tx: any;
  radio: any;
}

@Injectable()
export class CoverageCalculateService {
  changeParamsSubject = new Subject<any>();

  public constant = 32.45;
  public receiverSensitivity = -80;
  public distanceKm: number;
  public defaultParams = {
    tx: 4,
    radio: '2.4'
  };

  public setParams(params: AccessPointParams) {
    this.changeParamsSubject.next(this.calculate(params))
  }

  public calculate(params: AccessPointParams): number {
    const frequency = parseFloat(params.radio) * 1000,
      tx = parseFloat(params.tx),
      FreeSpacePathLoss = tx - this.receiverSensitivity;
    this.distanceKm = Math.pow(10, (FreeSpacePathLoss - this.constant - 20 * Math.log10(frequency)) / 20);

    return this.distanceKm;
  }

  public getDefault(): number {
    return this.calculate(this.defaultParams);
  }

}
