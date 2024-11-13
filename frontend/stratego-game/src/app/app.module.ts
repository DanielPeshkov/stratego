import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { StrategoBoardComponent } from './modules/stratego-board/stratego-board.component';



@NgModule({
  declarations: [
    AppComponent,
    StrategoBoardComponent,
  ],
  imports: [
    CommonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
