import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import * as Konva from "konva";
import {KonvaComponent} from "ng2-konva";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {CoverageCalculateService} from "../services/coverage-calculate.service";

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class LeftPanelComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('canvasArea') canvasArea: ElementRef;
  @ViewChild('stage') stage: KonvaComponent;
  @ViewChild('layer') layer: KonvaComponent;
  @ViewChild('coverageCircle') coverageCircle: KonvaComponent;
  public imageObj = new Image();
  public showCanvas: boolean;
  public resize = true;
  public configStage;
  public clients: Array<any> = [];
  private _radius = 80;


  constructor(private _coverageCalculateService: CoverageCalculateService) {
    _coverageCalculateService.changeParamsSubject.subscribe((coverageRadius) => {
      this.changeCoverageArea(coverageRadius);
    });
    this.imageObj.src = '/assets/images/access-point.png'
  }

  set radius(value: number) {
    this._radius = value;
  }

  get radius(): number {
    return this._radius;
  }

  ngOnInit() {
      for (let n = 0; n < 10; n++) {
        this.clients.push(
          new BehaviorSubject({
            x: Math.random() * 800,
            y: Math.random() * 700,
            radius: 7,
            fill: 'red',
            id: n
          })
        );
      }
  }

  ngAfterViewInit() {
    this.configStage = Observable.of({
      width: this.canvasArea.nativeElement.clientWidth,
      height: this.canvasArea.nativeElement.clientHeight
    });
    this.showCanvas = true;
  }

  public groupConfig = Observable.of({
    draggable: true
  });

  public configCoverageCircle = Observable.of({
    x: 90,
    y: 90,
    radius: this.radius,
    fill: 'rgba(68, 137, 244, 0.4)',
    id: 'coverageCircle'
  });

  public imageConfig = Observable.of({
    x: 50,
    y: 50,
    image: this.imageObj,
    width: 80,
    height: 80,
  });

  public moveCoverageArea(ngComponent: KonvaComponent) {
    console.log(ngComponent.getStage());
    const circle = ngComponent.getStage();
    const cx = circle.attrs.x;
    const cy = circle.attrs.y;

    for (let item of this.clients) {
      console.log(item.value.x);
      if (cx <= item.value.x && cy <= item.value.y) {
        if (item.value.x - cx <= this.radius && item.value.y - cy <= this.radius) {
          const stage = this.stage.getStage();
          let client = stage.find(`#${item.value.id}`)[0];
          client.to({
            fill: 'green'
          });
        }
      }
    }
    console.log('recalculation');

  }

  public changeCoverageArea(radius) {
    this.radius = radius;
    const stage = this.stage.getStage();
    let coverageCircle = stage.find('#coverageCircle')[0];
    coverageCircle.to({
      radius: radius
    });
    // this.moveCoverageArea(this.);
  }

  private onResize() {
    // let stage = new Konva.Stage({})
    this.resize = this.showCanvas = false;
    this.configStage.value.width = this.canvasArea.nativeElement.clientWidth;
    this.configStage.value.height = this.canvasArea.nativeElement.clientHeight;
    setTimeout(() => {
      this.resize = this.showCanvas = true;
    }, 100);
    console.log('resize');
  }

  ngOnDestroy() {
    this._coverageCalculateService.changeParamsSubject.unsubscribe();
  }

}
