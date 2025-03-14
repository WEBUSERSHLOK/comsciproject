const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelector(".controls i");

let gameOver = false;
let foodX, foodY;
//Intial position of the snake
let snakeX = 5, snakeY = 5;
let snakeBody = [];
//Determining movement direction
let velocityX = 0, velocityY = 0;
let setIntervalID;
let score = 0;
//Size of the grid is a 20x20
const gridSize = 20;

//Get high score or set it to 0
let highScore = localStorage.getItem("high-score") || 0;
//Displaying the high score
highScoreElement.innerText = `High Score: ${highScore}`;

//Function to randomly place food on the grid
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * gridSize) + 1;
    foodY = Math.floor(Math.random() * gridSize) + 1;
    //Random X and Y positions
}

//Function for game over
const handleGameOver = () => {
    //Stop the loop
    clearInterval(setIntervalID);
    //Alert box to restart the game
    alert("Game Over! Press OK");
    //Reload the page as well
    location.reload();
}

//Function to change snake's direction based off keys
const changeDirection = (e) => {
    if (e.key ==="ArrowUp" && velocityY !== 1 /*To prevent reverse*/){
        velocityX = 0;
        velocityY = -1; //Moving up
    } else if(e.key ==="ArrowDown" && velocityY !== -1  ){
        velocityX = 0;
        velocityY = 1;
    } else if(e.key==="ArrowLeft" && velocityX !== 1 /*To prevent X reverse*/){
        velocityX = -1;
        velocityY = 0;
    } else if (e.key=== "ArrowRight" && velocityX !== -1){
        velocityX = 1;
        velocityY = 0;
    }
        
    
    };
//Function to update the game state
const initGame = () => {
    //Stop if game is over
    if (gameOver) return handleGameOver();

    //Create the food
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}; width: 25px; height: 25px;"></div>`

    //Checking if snake hit food
    if (snakeX === foodX && snakeY === foodY){
        //Create a new food position using function 
        changeFoodPosition();
        //Pushing the snake body list and making it bigger
        snakeBody.push([snakeX,snakeY]);
        //Adding the score
        score++;

        //Update the high score
        highScore = score >= highScore ? score : highScore;
        //Saving the high score
        localStorage.setItem("high-score", highScore);
        //Update the score on the box
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`
    }

    //Move snake body 
    for (let i = snakeBody.length -1; i > 0; i--){
        //Shift positions forward
        snakeBody[i] = snakeBody[i-1];
    }
    //Update snake head position
    snakeBody[0] = [snakeX, snakeY];
    //Move snake head based on velocity
    snakeX += velocityX;
    snakeY += velocityY;
    //Check for collisions
    if (snakeX <= 0 || snakeX > 20 || snakeY <= 0 || snakeY > 20) {
        //End the game
        gameOver = true;
    }

    //Check for collisons on snake
    for (let i = 0; i < snakeBody.length; i++) {
        // Adding a div for each part of the snake's body
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        // Checking if the snake head hit the body, if so set gameOver to
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            //End game
            gameOver = true;
        }
    }
    //Update a new board
    playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
//Set food position on init and start the loop
setIntervalID = setInterval(initGame, 125); 
//Listen for input
document.addEventListener("keydown", changeDirection);
