let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "O";
      turn0 = false;
    } else {
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("winner");
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner, pattern) => {
  msg.innerText = `Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  for (let index of pattern) {
    boxes[index].classList.add("winner");
  }
  disableBoxes();
  resetBtn.style.display = "none";

};

const showDraw = () => {
  msg.innerText = "It's a Draw!";
  msgContainer.classList.remove("hide");
  resetBtn.style.display = "none";

};

const checkWinner = () => {
  let winnerFound = false;
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val, pattern);
        winnerFound = true;
        break;
      }
    }
  }
  if (!winnerFound) {
    let allFilled = [...boxes].every((box) => box.innerText !== "");
    if (allFilled) {
      showDraw();
    }
  }
};

const resetGame = () => {
  turn0 = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  resetBtn.style.display = "inline-block";

};

newGamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
