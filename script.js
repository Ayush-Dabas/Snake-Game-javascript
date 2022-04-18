// Game Constants & Variables
let inputDir = {x: 0, y: 0};                                                        // Taking the direction of input
const foodSound = new Audio('food.mp3');                                            //Taking the audio and converting them into variables
const gameOverSound = new Audio('gameover.mp3');                                    // using JS
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 10;                                                                     // Setting the speed of the snake
let score = 0;                                              
let lastPaintTime = 0;                                                              // Random variable representing last time the snake rendered
let snakeArr = [
    {x: 13, y: 15}                                                              // snake head's coordinates initially
];

food = {x: 6, y: 7};                                                            // food's coordinates initially

// Game Functions
function main(ctime) {                                                          // the main function to call 
    window.requestAnimationFrame(main);                                         // renders the screen and efficient to generate the fps intead of settimout()
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){                                 // speed set
        return;
    }
    lastPaintTime = ctime;                                                     // changes in variables
    gameEngine();                                                                 // calling the gameEngine() function
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {                                 //Iterating array from the second element to last
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){             //If snake head coordinates are equal to the position of any of the element of the 
            return true;                                                        //body part, we consider it as collision
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;                                                               //if everything fine, chalo behnchod
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){                                // if collision is detected then:
        gameOverSound.play();                               // Play the game over sound
        musicSound.pause();                                 // Game ke music ko pause karo
        inputDir =  {x: 0, y: 0};                           // snake ki direction ka motion pause kardo
        alert("Game Over. Press any key to play again!");   // alert the player ki wo khatam aur uski zindagi jhand hai
        snakeArr = [{x: 13, y: 15}];                        // resetting the snake head position waise kya isko random bhi kar skate hai kya ??
        //musicSound.play();                                // firse music ko play karna chaalu karo ! lekin ye bakchodi lagti hai to isko comment out kardia hai
        score = 0;                                          // score ko reset kardo ! waise negative me daaldo bhosdi waale ko
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){// If snake head position = food position then 進め
        foodSound.play();                                    // food khaane ki sound play karni hai
        score += 1;                                          // Score ko badhana hai, lekin kya isko exponentiol bana sakta hu kya
        if(score>hiscoreval){                                // agar high score score se jyaada nahi hota hai to:
            hiscoreval = score;                              // high score ko score ke equal karna hai
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));    // local storage me hiscore ko JSON ki help se update karna hai
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;                // high score ke HTML element ko update karte hai taaki wo player ko dikhe warna bole ga ki bosdk ye kya hho gaya
        }
        scoreBox.innerHTML = "Score: " + score;              // score ko update karna hai islie HTML ko ched rahe hai
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});   // coordinates ko update Maa ki chu
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}   // randomly generate karo food ko 
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};                       // snake ko ek object ki tarah uske previos instance pe copy kar rahe hai
    }

    snakeArr[0].x += inputDir.x;                                // snake ki direction ko update karna hai
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";                                   
    snakeArr.forEach((e, index)=>{                                  // har element ke lie ::
        snakeElement = document.createElement('div');               // ek div element create hoga
        snakeElement.style.gridRowStart = e.y;                      // start row and columd define kardi hai
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


// Main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});