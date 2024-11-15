import { Component } from '@angular/core';
import { StrategoBoard } from '../../stratego-logic/stratego-board';
import { Color, Coords, FENChar, SafeSquares, pieceImagePaths } from '../../stratego-logic/models';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { SelectedSquare } from './models';

@Component({
  selector: 'app-stratego-board',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, NgStyle],
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
  private targets: Coords[] = [];
  private noTargets: boolean = false;
  private courierCoords: number[] = [];
  public backgroundImage: string = this.strategoBoard.backgroundImage;

  pieceStats = [
    { name: 'Scout', icon: '/pieces/scout-icon.png', attack: 2, defense: 2 },
    { name: 'Sapper', icon: '/pieces/sapper-icon.png', attack: 3, defense: 3 },
    { name: 'Infantry', icon: '/pieces/infantry-icon.png', attack: 6, defense: 2 },
    { name: 'Courier', icon: '/pieces/courier-icon.png', attack: 5, defense: 5 },
    { name: 'Cavalry', icon: '/pieces/cavalry-icon.png', attack: 6, defense: 6 },
    { name: 'Artillery', icon: '/pieces/artillery-icon.png', attack: 7, defense: 7 },
    { name: 'Dragoon', icon: '/pieces/dragoon-icon.png', attack: 7, defense: 9 },
    { name: 'Marine', icon: '/pieces/marine-icon.png', attack: 9, defense: 9 },
    { name: 'General', icon: '/pieces/general-icon.png', attack: 10, defense: 10 },
    { name: 'Assassin', icon: '/pieces/assassin-icon.png', attack: 1, defense: 1 },
    { name: 'Bomb', icon: '/pieces/bomb-icon.png', attack: 0, defense: 15 },
    { name: 'Flag', icon: '/pieces/redFlag-icon.png', attack: 0, defense: 0 },
  ];

  backgroundImages = [
    '/battlefields/snowy-water-field.png',
    '/battlefields/desert-water-field.png',
    '/battlefields/rocky-water-field.png',
    '/battlefields/wooded-water-field.png'
  ];
  
  constructor() {
    this.init();
  }

  async init() {

    await this.strategoBoard.init();
    this.backgroundImage = this.strategoBoard.backgroundImage;
    this.strategoBoardView = this.strategoBoard.strategoBoardView;
    let c = this.playerColor == Color.Blue ? FENChar.RedFlag : FENChar.BlueFlag;
    this.opponentImagePath = pieceImagePaths[c];

    if (this.playerColor == Color.Red) {
      await this.strategoBoard.waitForMove().then(data => {
        let {x1, y1, x2, y2, gameOver} = data;
        this.strategoBoard.moveOpponent(x1, y1, x2, y2)
        this.strategoBoardView = this.strategoBoard.strategoBoardView;
        this.strategoBoard.gameOver = gameOver;
        // Courier drags a piece
        let again = x2 < 0 ? false : !gameOver && this.strategoBoardView[x2][y2]?.toUpperCase() == "C"
        return again;
      }).then(again => {
        if (again) {
          this.strategoBoard.waitForMove().then(data => {
            let {x1, y1, x2, y2, gameOver} = data;
            this.strategoBoard.moveOpponentDrag(x1, y1, x2, y2)
            this.strategoBoardView = this.strategoBoard.strategoBoardView;
            this.strategoBoard.gameOver = gameOver;
          })
        }
      });
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

  public selectingPiece(x: number, y: number): boolean {
    let courierDetected = false;
    if (this.strategoBoard.gameOver) return courierDetected;
    if (this.playerColor !== this.turnColor) return courierDetected;
    const piece: FENChar | null = this.strategoBoardView[x][y];
    if (!piece) return courierDetected;
    if (this.isWrongPieceSelected(piece)) return courierDetected;

    const isSameSquareClicked: boolean = !!this.selectedSquare.piece && this.selectedSquare.x === x && this.selectedSquare.y === y;
    this.unmarkingPreviouslySelectedAndSafeSquares();
    if (isSameSquareClicked) return courierDetected;
    this.selectedSquare = {piece, x, y};
    this.pieceSafeSquares = this.safeSquares.get(x + "," + y) || [];
    // Drag piece behind Courier
    courierDetected = this.checkCourier();
    return courierDetected;
  }

  private placingPiece(newX: number, newY: number): void {
    if (!this.selectedSquare.piece) return;
    if (!this.isSquareSafeForSelectedPiece(newX, newY)) return;

    const {x: prevX, y: prevY} = this.selectedSquare;
    this.strategoBoard.move(prevX, prevY, newX, newY);
    this.strategoBoardView = this.strategoBoard.strategoBoardView;
    this.unmarkingPreviouslySelectedAndSafeSquares();
    return;
  }

  public move(x: number, y: number): void {
    if ((this.targets.length || this.noTargets) && !this.checkCourier()) {
      for (let t of this.targets) {
        if (t.x == x && t.y == y) {
          this.targets = [];
          this.strategoBoard.drag(x, y, this.courierCoords[0], this.courierCoords[1]);
          this.strategoBoardView = this.strategoBoard.strategoBoardView;
          this.unmarkingPreviouslySelectedAndSafeSquares();
          return;
        }
      }
      this.targets = [];
      if (this.noTargets) this.strategoBoard.invertTurn();
      this.noTargets = false;
      this.strategoBoard.noDrag();
      return;
    }
    let courier = this.selectingPiece(x, y);
    if (!this.checkCourier()) {this.targets = []; this.noTargets = false;}
    if (courier) {
      this.targets = this.strategoBoard.checkCourierTargets(x, y);
      this.noTargets = this.targets.length == 0;
    }
    this.placingPiece(x, y);
    if (this.strategoBoard.gameOver) return;

    // Drag piece behind Courier
    if (courier) {
      this.courierCoords = [x, y];
    }
    if (this.targets.length && !courier) {
      this.strategoBoard.invertTurn();
      return;
    }
    this.strategoBoard.waitForMove().then(data => {
      let {x1, y1, x2, y2, gameOver} = data;
      this.strategoBoard.moveOpponent(x1, y1, x2, y2)
      this.strategoBoardView = this.strategoBoard.strategoBoardView;
      this.strategoBoard.gameOver = gameOver;
      // Courier drags a piece
      let again = x2 < 0 ? false : !gameOver && this.strategoBoardView[x2][y2]?.toUpperCase() == "C"
      return again;
    }).then(again => {
      if (again) {
        this.strategoBoard.waitForMove().then(data => {
          let {x1, y1, x2, y2, gameOver} = data;
          this.strategoBoard.moveOpponentDrag(x1, y1, x2, y2)
          this.strategoBoardView = this.strategoBoard.strategoBoardView;
          this.strategoBoard.gameOver = gameOver;
        })
      }
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

  public checkCourier(): boolean {
    let courierDetected = false;
    if (this.selectedSquare.piece?.toUpperCase() == "C") {
      courierDetected = true;
    }
    return courierDetected;
  }

  public getSafeSquareColor() {
    if (this.playerColor == Color.Red) {
      return '#eb3f29';
    }
    else {
      return '#4b4bee';
    }
  }
}
