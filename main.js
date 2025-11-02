const GameController = (function(){
    let gameBoard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    function updateGameBoard(x, y, value){
        if(gameBoard[x][y]){
            throw Error("Cell is filled");
        }
        gameBoard[x][y]=value;
    }

    function getGameBoard(){
        return gameBoard.slice();
    }

    function checkWinCondition(){
        let xCounter = 0, oCounter=0;
        for(let row of gameBoard){
            for(let column of row){
                if(column==="X"){
                    xCounter++;
                }
                else if(column==="O"){
                    oCounter++;
                }
            }
            if(xCounter==3){
                return "X"; 
            }
            else if(oCounter===3){
                return "O";
            }
            xCounter=0, oCounter = 0;
        }

        for(let column=0; column<3; column++){
            for(let row=0; row<3; row++){
                if(gameBoard[row][column] === "X"){
                    xCounter++;
                }
                else if(gameBoard[row][column] === "Y"){
                    oCounter++;
                }
            }
            if(xCounter==3){
                return "X";
            }
            else if(oCounter==3){
                return "O";
            }
            xCounter=0, oCounter=0;
        }

        //For checking diagonal 
        for(let i=0; i<3; i++){ 
            if(gameBoard[i][i]==="X"){
                xCounter++;
            }
            else if(gameBoard[i][i]==="O"){
                oCounter++;
            }
        }
        if(xCounter==3){
            return "X";
        }
        else if(oCounter==3){
            return "O";
        }
        xCounter=0, oCounter=0;
        
        //for checking other diagonal
        for(let row=0, column=2; row<3 && column>=0; row++, column--){
                if(gameBoard[row][column]==="X"){
                    xCounter++;
                }
                else if(gameBoard[row][column]==="O"){
                    oCounter++;
                }
        }

        if(xCounter==3){
            return "X";
        }
        else if(oCounter==3){
            return "O";
        }

        return 0;
    } 

    return {updateGameBoard, getGameBoard, checkWinCondition};
})();

const PlayerController = (function(){
    /*players[0] == Player One & players[1] == Player Two
      this method is used for switching players role, eg: Player two gets X every other game
    */
    let players = {0: "X", 1:"O"};
    let currentPlayer = 0;

    function updatePlayer(){
        currentPlayer = currentPlayer === 0 ? 1:0;
    }

    function getCurrentPlayer(){
        return players[currentPlayer];
    }

    return {updatePlayer, getCurrentPlayer};
})();

function MainController(){
    // Player scores will be implemented later
    let playerOneScore = 0;
    let playerTwoScore = 0;

    while(true){
        let tictactoeBoard = GameController.getGameBoard();
        for(let row of tictactoeBoard){
            console.log(row);
        }
        let player = PlayerController.getCurrentPlayer();
        let cellRow = Number(prompt("Input row: "))-1;
        let cellColumn = Number(prompt("Input column: "))-1;
        GameController.updateGameBoard(cellRow, cellColumn, player);
        let winner = GameController.checkWinCondition();
        if(winner){
            if(winner === "X"){
                console.log("Player one won");
            }   
            else if(winner === "O"){
                console.log("Player two won");
            }
            break;
        }
        PlayerController.updatePlayer();
    }

    let finalBoard = GameController.getGameBoard();
    for(let row of finalBoard){
        console.log(row);
    }


}

MainController();