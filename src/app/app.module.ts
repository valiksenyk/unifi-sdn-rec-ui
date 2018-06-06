import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';

import { KonvaModule } from 'ng2-konva';
import {CoverageCalculateService} from "./services/coverage-calculate.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    RightPanelComponent,
    LeftPanelComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    KonvaModule
  ],
  providers: [CoverageCalculateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
