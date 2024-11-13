import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StrategoBoard } from './stratego-logic/stratego-board';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'stratego-game';

  board = new StrategoBoard();
}
