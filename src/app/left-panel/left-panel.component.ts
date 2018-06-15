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
  @ViewChild('group') group: KonvaComponent;
  @ViewChild('coverageCircle') coverageCircle: KonvaComponent;
  public imageObj = new Image();
  public showCanvas: boolean = false;
  public configStage;
  public clients: Array<any> = [];
  private _distanceCoefficient = 1000;
  private _radius = this._coverageCalculateService.getDefault() * this._distanceCoefficient;

  constructor(private _coverageCalculateService: CoverageCalculateService) {
    _coverageCalculateService.changeParamsSubject.subscribe((coverageRadius) => {
      this.stage && this.changeCoverageArea(coverageRadius * this._distanceCoefficient);
    });
    this.imageObj.src = '/assets/images/access-point.png';
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
    setTimeout(
      () => this.moveCoverageArea(), 0 //just stack
    )
  }

  public groupConfig = Observable.of({
    draggable: true,
    x: 300,
    y: 300,
    dragBoundFunc: (pos) => {
      let newY = pos.y;
      if (pos.y < 30) {
        newY = 30;
      } else if (pos.y > this.canvasArea.nativeElement.clientHeight) {
        newY = this.canvasArea.nativeElement.clientHeight;
      }
      let newX = pos.x;
      if (pos.x < 30) {
        newX = 30;
      } else if (pos.x > this.canvasArea.nativeElement.clientWidth) {
        newX = this.canvasArea.nativeElement.clientWidth;
      }
      return {
        x: newX,
        y: newY
      };
    }
  });

  public configCoverageCircle = Observable.of({
    x: 90,
    y: 90,
    radius: this.radius,
    fill: 'rgba(68, 137, 244, 0.4)',
    id: 'coverageCircle',
    offset: {
      x: 90,
      y: 90
    }
  });

  public imageConfig = Observable.of({
    x: 50,
    y: 50,
    image: this.imageObj,
    width: 80,
    height: 80,
    offset: {
      x: 90,
      y: 90
    }
  });

  public moveCoverageArea() {
    const circle = this.group.getStage();
    const cx = circle.attrs.x,
      cy = circle.attrs.y;

    for (let item of this.clients) {
      const distance = Math.sqrt(Math.pow(item.value.x - cx, 2) + Math.pow(item.value.y - cy, 2)); //distance between 2 dot
      if (distance <= this.radius) {
        const stage = this.stage.getStage();
        let client = stage.find(`#${item.value.id}`)[0];
        client.to({
          fill: 'green'
        });
      } else {
        const stage = this.stage.getStage();
        let client = stage.find(`#${item.value.id}`)[0];
        client.to({
          fill: 'red'
        });
      }
    }
  }

  public changeCoverageArea(radius) {
    this.radius = radius;
    const stage = this.stage.getStage();
    let coverageCircle = stage.find('#coverageCircle')[0];
    coverageCircle.to({
      radius: radius
    });
    this.moveCoverageArea();
  }

  private onResize() { //todo need refactoring
    const stage = this.stage.getStage();
    setTimeout(() => {
      const width = this.canvasArea.nativeElement.clientWidth;
      const height = this.canvasArea.nativeElement.clientHeight;
      stage.widows = width;
      stage.height = height;
      stage.draw();
      stage.to({
        width: width,
        height: height
      });
      this.moveCoverageArea();
    }, 0)
  }

  ngOnDestroy() {
    this._coverageCalculateService.changeParamsSubject.unsubscribe();
  }

}
