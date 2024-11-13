import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StrategoBoardComponent } from './modules/stratego-board/stratego-board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StrategoBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'stratego-game';
}
