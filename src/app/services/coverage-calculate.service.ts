import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

interface AccessPointParams {
  txPower: number;
  radio: number;
}

@Injectable()
export class CoverageCalculateService {
  changeParamsSubject = new Subject<any>();

  constructor() {}

  public calculate(params: AccessPointParams) {
    this.changeParamsSubject.next(130)
  }

}
