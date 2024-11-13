import { Component } from '@angular/core';
import { StrategoBoard } from '../../stratego-logic/stratego-board';
import { Color, Coords, FENChar, SafeSquares } from '../../stratego-logic/models';
import { NgClass, NgFor } from '@angular/common';
import { SelectedSquare } from './models';

@Component({
  selector: 'app-stratego-board',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './stratego-board.component.html',
  styleUrl: './stratego-board.component.css'
})
export class StrategoBoardComponent {
  private strategoBoard = new StrategoBoard();
  public strategoBoardView: (FENChar|null)[][] = this.strategoBoard.strategoBoardView;
  public get playerColor(): Color {return this.strategoBoard.playerColor};
  public get safeSquares(): SafeSquares {return this.strategoBoard.safeSquares}
  private selectedSquare: SelectedSquare = {piece: null};
  private pieceSafeSquares: Coords[] = [];

  public isSquareSelected(x: number, y: number): boolean {
    if (!this.selectedSquare.piece) return false;
    return this.selectedSquare.x === x && this.selectedSquare.y === y;
  }

  public isSquareSafeForSelectedPiece(x: number, y: number): boolean {
    return this.pieceSafeSquares.some(coords => coords.x === x && coords.y === y);
  }

  public selectingPiece(x: number, y: number): void {
    const piece: FENChar | null = this.strategoBoardView[x][y];
    if (!piece) return;
    if (this.isWrongPieceSelected(piece)) return;

    this.selectedSquare = {piece, x, y};
    this.pieceSafeSquares = this.safeSquares.get(x + "," + y) || [];
  }

  public isWrongPieceSelected(piece: FENChar): boolean {
    const isRedPieceSelected: boolean = piece === piece.toUpperCase();
    return isRedPieceSelected && this.playerColor === Color.Blue || 
      !isRedPieceSelected && this.playerColor === Color.Red;
  }
}
