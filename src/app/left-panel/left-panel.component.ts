import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import * as Konva from "konva";

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class LeftPanelComponent implements OnInit, AfterViewInit {

  @ViewChild('canvasArea') canvasArea: ElementRef;
  imageObj = new Image();
  showCanvas: boolean;
  resize = true;
  configStage;


  constructor() {
    this.imageObj.src = '/assets/images/access-point.png'
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.configStage = Observable.of({
      width: this.canvasArea.nativeElement.clientWidth,
      height: this.canvasArea.nativeElement.clientHeight
    });
    this.showCanvas = true;
  }

  public configCircle = Observable.of({
    x: 300,
    y: 200,
    radius: 9,
    fill: 'red',
  });

  public imageConfig = Observable.of({
    x: 50,
    y: 50,
    image: this.imageObj,
    width: 80,
    height: 80,
    draggable: true
  });

  public handleClick(component) {
    console.log('Hello Circle', component);
  }

  public reCalculateCoverage(component) {
    console.log('recalculation');
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

}
