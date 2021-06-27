import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})


export class BoardComponent implements OnInit {

  board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];
  currentPlayer = 1;
  isWinner = false;
  isTie = false;
  winnerModal = false;

  //------------------------------------------METHODS-------------------------------
  findWinnerRow() {
    // Loop on every array/row of the board
    for (const el of this.board) {
      // Check if the number at the index of the current player return a valide value (-1 if no current player)
      // I had also added  "&& el.indexOf(this.currentPlayer) < 4)" to ensure that it would avoid looping out of the array/row. But since it would return "undefined" it's ok to leave it like that
      if (el.indexOf(this.currentPlayer) != -1) {
        // Set a starting index to check if there are 4 consecutive num
        // At first I didn't defined a loop but there was an issue when you had a situation like this [1, 0, 0, 1, 1, ,1] where if you would had a chip at [2] the game would only look for a matching chip after [0]
        for (let i = el.indexOf(this.currentPlayer); i < 4; i++) {
          // Check again if the number at the index isn't 0. Without this line, having multiple 0 would trigger "win"
          if (el[i] != 0) {
            // If there are 4 consecutive num starting from the previously set starting index
            if (el[i] === el[i + 1] && el[i + 1] === el[i + 2] && el[i + 2] === el[i + 3]) {
              // Then you have a winner

              this.isWinner = true;
              this.winnerModal = true;

              // console.log(el, "row winner")
              // alert('Winner is Player' + this.currentPlayer)
            };
          };
        };
      };
    };
  };

  findWinnerCol() {
    //Defining variable to keep track
    let tempBoard = this.board;
    let player = this.currentPlayer;
    // Both height and width are set to make the code more flexible in case you'd like to change the size of the board for example
    let height = 6;
    let width = 7;

    // Loop on every col of the board
    for (let x = 0; x < width; x++) {
      // Loop on every row untill there's only 3 row left meaning it can't be a win
      for (let y = 0; y < height - 3; y++) {
        // If the chip at those coord is not the same as the current player, stop the methode cause there can't be a winner this round
        if (tempBoard[y][x] === player) {
          // If 4 chips in a col are the same, then win
          if (tempBoard[y][x] === tempBoard[y + 1][x] && tempBoard[y + 1][x] === tempBoard[y + 2][x] && tempBoard[y + 2][x] === tempBoard[y + 3][x]) {

            this.isWinner = true;
            this.winnerModal = true;

            // console.log('col winner')
            // alert('Winner is Player' + this.currentPlayer)
          };
        };
      };
    };
  };

  findWinnerDiag() {
    // This methode is a copy of findWinnerCol(), only the coord that are checked have been changed
    // Defining variable to keep track
    let tempBoard = this.board;
    let player = this.currentPlayer;
    // Both height and width are set to make the code more flexible in case you'd like to change the size of the board for example
    let height = 6;
    let width = 7;

    // Loop on every col of the board
    for (let x = 0; x < width; x++) {
      // Loop on every row untill there's only 3 row left meaning it can't be a win
      for (let y = 0; y < height - 3; y++) {
        // If the chip at those coord is not the same as the current player, stop the methode cause there can't be a winner this round
        if (tempBoard[y][x] === player) {
          // If 4 chips in a diagonal going to the right are the same, then win
          if (tempBoard[y][x] === tempBoard[y + 1][x + 1] && tempBoard[y + 1][x + 1] === tempBoard[y + 2][x + 2] && tempBoard[y + 2][x + 2] === tempBoard[y + 3][x + 3]) {

            this.isWinner = true;
            this.winnerModal = true;

            // console.log('diag winner')
            // alert('Winner is Player' + this.currentPlayer)
          };
          // If 4 chips in a diagonal going to the left are the same, then win
          if (tempBoard[y][x] === tempBoard[y + 1][x - 1] && tempBoard[y + 1][x - 1] === tempBoard[y + 2][x - 2] && tempBoard[y + 2][x - 2] === tempBoard[y + 3][x - 3]) {

            this.isWinner = true;
            this.winnerModal = true;

            // console.log('diag winner')
            // alert('Winner is Player' + this.currentPlayer)
          };
        };
      };
    };
  };

  findWinnerTie() {
    let freeSpaceCounter = 0;
    for (const row of this.board) {
      for (const el of row) {
        if (el != 0) {
          freeSpaceCounter += 1;
        };
      };
    };
    if (freeSpaceCounter == 42) {
      this.isTie = true;
      this.winnerModal = true;
    };
  };

  restartBoard() {
    // The method will be executed on click on a button
    // Set the board to an empty board
    this.board = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];
    // Reset winner states of the game
    this.currentPlayer = 1;
    this.isWinner = false;
    this.isTie = false;
    this.winnerModal = false;
  };

  // Define a methode with a propriety to use inside the DOM
  play(num: any) {
    // Define variables to be used inside the methode
    // This is a temporary board to play with inside the methode
    let tempBoard = this.board;
    // Value used to set the right row/array
    let row = 0;
    let player = this.currentPlayer;
    // Length is beeing used as an index value inside the board/main array
    let length = this.board.length - 1;

    // Use length to start from the last item of the array / from the last row
    // Use propriety num that has been set inside the DOM to target the right column
    // And then check if the selected index is 0 meaning it's a free space
    // If it's not length gets -1. It's beeing applyed to row and it's use again to check for the next row
    // It can then be replace using .splice by the current player value
    // There's not "ceiling" because it's been taking care in the DOM
    if (tempBoard[length][num] == 0) {
      row = length;
    } else if (tempBoard[length][num] != 0 && tempBoard[length - 1][num] == 0) {
      row = length - 1;
    } else if (tempBoard[length - 1][num] != 0 && tempBoard[length - 2][num] == 0) {
      row = length - 2;
    } else if (tempBoard[length - 2][num] != 0 && tempBoard[length - 3][num] == 0) {
      row = length - 3;
    } else if (tempBoard[length - 3][num] != 0 && tempBoard[length - 4][num] == 0) {
      row = length - 4;
    } else if (tempBoard[length - 4][num] != 0) {
      row = length - 5;
    };

    // Uses the variable Row to get the right index of the board. Then it replace de current value using the HTML input (num) by the current player ID (1 or 2)
    tempBoard[row].splice(num, 1, player);

    // Real Board is beeing set to the value of the temporary board
    this.board = tempBoard;

    this.findWinnerTie();
    this.findWinnerRow();
    this.findWinnerCol();
    this.findWinnerDiag();

    // And right at the end, the current player become the one that has not been playing this round.
    if (this.currentPlayer == 1) {
      this.currentPlayer = 2;
    } else {
      this.currentPlayer = 1;
    }
  };

  constructor(public settings: SettingsService) { }

  ngOnInit(): void {

  }
}
