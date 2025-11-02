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

    function resetGameBoard(){
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                gameBoard[i][j]="";
            }
        }
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

    function checkDrawCondition(){
        console.log("Came");
        let drawCounter=0;
        for(row of gameBoard){
            for(column of row){
                if(column ==="X" || column==="O"){
                    console.log(column);
                    drawCounter++;
                }
            }
        }
        if(drawCounter==9){
            return 1;
        }
        return 0;
    }

    return {updateGameBoard, resetGameBoard, getGameBoard, checkWinCondition, checkDrawCondition};
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


const ScreenController = (function(doc){
    const row1 = doc.querySelector(".row-1");
    const row2 = doc.querySelector(".row-2");
    const row3 = doc.querySelector(".row-3");
    const rows = [row1, row2, row3];
    const currentPlayer = doc.querySelector(".current-player");
    const dialog = document.querySelector("dialog");

    dialog.addEventListener("click", restart);
    rows.forEach((row)=>row.addEventListener("click", cellClick));

    function cellClick(event){
        const rowValue = Number(event.currentTarget.getAttribute("class").replace("row-", ""))-1;
        const columnValue = Number(event.target.getAttribute("class").replace("col-", ""))-1;
        MainController.newMovePlayed(rowValue, columnValue);
    }

    function restart(){
        MainController.restart();
        dialog.close();
    }

    function updateCell(gameBoard){
        for(let row=0; row<3; row++){
            let columns = rows[row].querySelectorAll("[class^='col-']");
            for(let column=0; column<3; column++){
                columns[column].textContent = gameBoard[row][column];
            }
        }
    }


    function updateCurrentPlayer(newPlayer){
        currentPlayer.textContent =   `Turn: ${newPlayer}`;
    }

    function winner(player){
        const congratualations = `${player} wins`;
        dialog.querySelector("#congratulate").textContent = congratualations;
        dialog.showModal();
    }

    function draw(){
        dialog.querySelector("#congratulate").textContent = "It's a draw";
        dialog.showModal();
    }


    return {updateCurrentPlayer, updateCell, winner, draw};

})(document);


const MainController = (function(){

    function newMovePlayed(rowValue, columnValue){
        const currentPlayer = PlayerController.getCurrentPlayer();
        try{
            GameController.updateGameBoard(rowValue, columnValue, currentPlayer);
        }
        catch{
            return;
        }
        PlayerController.updatePlayer();
        ScreenController.updateCurrentPlayer(PlayerController.getCurrentPlayer());
        const updatedGameBoard = GameController.getGameBoard();
        ScreenController.updateCell(updatedGameBoard);
        const winnerCheck = GameController.checkWinCondition();
        if(winnerCheck){
            ScreenController.winner(winnerCheck);
            return;
        }
        const drawCheck = GameController.checkDrawCondition();
        if(drawCheck){
            ScreenController.draw();
        }
    }

    function restart(){
        GameController.resetGameBoard();
        ScreenController.updateCell(GameController.getGameBoard());
    }
    
    return {newMovePlayed, restart};
}());

