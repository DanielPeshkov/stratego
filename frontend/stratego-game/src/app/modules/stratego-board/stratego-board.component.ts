import { Component } from '@angular/core';
import { StrategoBoard } from '../../stratego-logic/stratego-board';
import { Color, Coords, FENChar, SafeSquares, pieceImagePaths } from '../../stratego-logic/models';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { SelectedSquare } from './models';

@Component({
  selector: 'app-stratego-board',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './stratego-board.component.html',
  styleUrl: './stratego-board.component.css'
})
export class StrategoBoardComponent {
  public pieceImagePaths = pieceImagePaths;
  public opponentImagePath = '';
  private strategoBoard = new StrategoBoard();
  public strategoBoardView: (FENChar|null)[][] = this.strategoBoard.strategoBoardView;
  public get playerColor(): Color {return this.strategoBoard.playerColor};
  public get turnColor(): Color {return this.strategoBoard.turnColor}
  public get safeSquares(): SafeSquares {return this.strategoBoard.safeSquares}
  private selectedSquare: SelectedSquare = {piece: null};
  private pieceSafeSquares: Coords[] = [];
  public get gameOver(): boolean {return this.strategoBoard.gameOver};
  
  constructor() {
    this.init();
  }

  async init() {
    await this.strategoBoard.init();
    this.strategoBoardView = this.strategoBoard.strategoBoardView;
    let c = this.playerColor == Color.Blue ? FENChar.RedFlag : FENChar.BlueFlag;
    this.opponentImagePath = pieceImagePaths[c];

    if (this.playerColor == Color.Red) {
      let {x1, y1, x2, y2, gameOver} = await this.strategoBoard.waitForMove();
      this.strategoBoard.moveOpponent(x1, y1, x2, y2)
      this.strategoBoardView = this.strategoBoard.strategoBoardView;
    }
  }

  public isSquareSelected(x: number, y: number): boolean {
    if (!this.selectedSquare.piece) return false;
    return this.selectedSquare.x === x && this.selectedSquare.y === y;
  }

  public isSquareSafeForSelectedPiece(x: number, y: number): boolean {
    return this.pieceSafeSquares.some(coords => coords.x === x && coords.y === y);
  }

  private unmarkingPreviouslySelectedAndSafeSquares(): void {
    this.selectedSquare = {piece: null};
    this.pieceSafeSquares = [];
  }

  public selectingPiece(x: number, y: number): void {
    if (this.strategoBoard.gameOver) return;
    if (this.playerColor !== this.turnColor) return;
    const piece: FENChar | null = this.strategoBoardView[x][y];
    if (!piece) return;
    if (this.isWrongPieceSelected(piece)) return;

    const isSameSquareClicked: boolean = !!this.selectedSquare.piece && this.selectedSquare.x === x && this.selectedSquare.y === y;
    this.unmarkingPreviouslySelectedAndSafeSquares();
    if (isSameSquareClicked) return;
    this.selectedSquare = {piece, x, y};
    this.pieceSafeSquares = this.safeSquares.get(x + "," + y) || [];
  }

  private placingPiece(newX: number, newY: number): void {
    if (!this.selectedSquare.piece) return;
    if (!this.isSquareSafeForSelectedPiece(newX, newY)) return;

    const {x: prevX, y: prevY} = this.selectedSquare;
    this.strategoBoard.move(prevX, prevY, newX, newY);
    this.strategoBoardView = this.strategoBoard.strategoBoardView;
    this.unmarkingPreviouslySelectedAndSafeSquares();
  }

  public move(x: number, y: number): void {
    this.selectingPiece(x, y);
    this.placingPiece(x, y);
    
    if (this.strategoBoard.gameOver) return;
    this.strategoBoard.waitForMove().then(data => {
      let {x1, y1, x2, y2, gameOver} = data;
      this.strategoBoard.moveOpponent(x1, y1, x2, y2)
      this.strategoBoardView = this.strategoBoard.strategoBoardView;
      this.strategoBoard.gameOver = gameOver;
    });
  }

  public isWrongPieceSelected(piece: FENChar): boolean {
    const isRedPieceSelected: boolean = piece === piece.toUpperCase();
    return isRedPieceSelected && this.playerColor === Color.Blue || 
      !isRedPieceSelected && this.playerColor === Color.Red;
  }

  public visible(x: number, y: number): boolean {
    return this.strategoBoard.visible(x, y);
  }

  public rotate(): boolean {
    return this.playerColor == Color.Red;
  }
}
