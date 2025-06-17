let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newGame = document.querySelector("#newGame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turnO =  true;  // player X , player O
let count = 0;

const winningPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO){
            box.innerText = "O";    
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner){
            gameDraw();
        }
    });
   

});

const gameDraw = () => {
    msg.innerText = "Game Draw";
    msgContainer.classList.remove("hide");
    disableBoxes();    
    
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        msgContainer.classList.add("hide");
    }
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winningPattern){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if (pos1Val === pos2Val && pos2Val === pos3Val ){
                console.log("winner");
                showWinner(pos1Val);
                

            }
        }
    } 
};

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click",resetGame);
