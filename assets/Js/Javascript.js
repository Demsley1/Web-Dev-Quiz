const quizContainer = document.getElementById("quizFrame");
const scoreBtn = document.getElementById("scores");
const startButton = document.getElementById("start");
const timeEl = document.getElementById("timer")
// array of objects that holds quiz questions and answers
const testQuestions = [ 
    {
        question : 'Which of the following is true about variable naming conventions in JavaScript?',
        answers : {
            A: 'JavaScript variable names must begin with a letter or the underscore character.',
            B: 'JavaScript variable names are case sensitive.',
            C: 'Both of the above.',
            D: 'None of the above.'
        },
        correctAnswer: 'C'
    },

    {
        question : 'Is JavaScript a case-sensitive language?',
        answers : {
            A: 'true',
            B: 'false',
 
        },
        correctAnswer: 'A'
    },

    {
        question : 'Which of the following is an advantage of using JavaScript?',
        answers : {
            A: 'Less server interaction',
            B: 'Immediate feedback to the visitors',
            C: 'Increased interactivity',
            D: 'All of the above.'
        },
        correctAnswer: 'D'
    },

    {
        question : ' Which of the following type of variable is visible everywhere in your JavaScript code?',
        answers : {
            A: 'global variable',
            B: 'local variable',
            C: 'boolean variable',
            D: 'None of the above.',
        },
        correctAnswer: 'A'
    },

    {
        question : 'Which built-in method returns the character at the specified index?',
        answers : {
            A: 'characterAt',
            B: 'getCharAt',
            C: 'charAt',
            D: 'None of the above.'
        },
        correctAnswer: 'C'
    },

    {
        question : 'Can you assign a anonymous function to a variable?',
        answers : {
            A: 'true',
            B: 'false',
        },
        correctAnswer: 'A'
    },

    {
        question : ' Which of the following type of variable takes precedence over others if names are the same?',
        answers : {
            A: 'global variable',
            B: 'local variable',
            C: 'Both of the above.',
            D: 'None of the above.'
        },
        correctAnswer: 'B'
    },

    {
        question : 'Which of the following is correct about JavaScript?',
        answers : {
            A: 'JavaScript is a lightweight, interpreted programming language.',
            B: 'JavaScript has object-oriented capabilities that allows you to build interactivity into otherwise static HTML pages.',
            C: 'The general-purpose core of the language has been embedded in Netscape, Internet Explorer, and other web browsers.',
            D: 'All of the above.'
        },
        correctAnswer: 'D'
    },

    {
        question : ' Which of the following is the correct syntax to print a page using JavaScript?',
        answers : {
            A: 'window.print;',
            B: 'browser.print;',
            C: 'navigator.print;',
            D: 'document.print;',
        },
        correctAnswer: 'A'
    },

    {
        question : 'Which of the following is correct about callbacks?',
        answers : {
            A: 'A callback is a plain JavaScript function passed to some method as an argument or option.',
            B: 'Some callbacks are just events, called to give the user a chance to react when a certain state is triggered.',
            C: 'Callbacks need to be at the very top of your javaScript page for them to work.',
            D: 'Answers A and B.'
        },
        correctAnswer: 'D'
    }

]

// function to start the quiz
const startQuiz = () => {
    scoreBtn.style.display = "none";
    let i = 0;
    // variable that selects the question object at each index of the array
    let quiz = testQuestions[i];
    // gloobal variable that controls the time beind counted down by the timer interval
    var time = 101;
    // timer that decrements the time variable at a set rate of 1 second = 1000, if the time reaches zero call end of quiz and clear interval
    const timer = setInterval(function(){ 
        --time;
        timeEl.innerHTML = "Time:  " + time;
        if(time <= 0){
            clearInterval(timer)
            timeEl.innerHTML = "";
            return showResults();
        };
        }, 1000)

    
    // main function to write the quiz to the page and set the values of each answer button
    const buildQuiz = () => {
        
        function writeQuiz() {
        quizContainer.innerHTML = " "

        var questions = quiz.question 
        var answers = quiz.answers
                      
        var quizQuest = $("<h1>").text(questions).add("</br>")
        $(quizContainer).append(quizQuest)
        for (x in answers){
            var newAns = $("<div>").text(answers[x])
            var newBtn = $("<button>").text(x).attr({id: "answer-btn", value: `${x}`}).addClass("btn btn-outline-dark");
            $(newAns).prepend(newBtn)
            $(quizContainer).append(newAns)
        }

        document.querySelectorAll("#answer-btn").forEach(x => {
            x.addEventListener("click", checkAnswer)
        })
        }
        writeQuiz();
    } 
    buildQuiz();

    // function that checks if an answer is correct, incorrect, and if the test has any more questions to run through
    function checkAnswer(event) {
        var clickedBtn = event.target.value
        if(clickedBtn == quiz.correctAnswer) {
            i == i++
            if(i === 10){
                clearInterval(timer);
                return showResults(); 
            }
            quiz = testQuestions[i]
            return buildQuiz();
        } else {    
            alert("wrong answer")
            time -= 5;
            i == i++
            if(i === 10){
                clearInterval(timer);
                return showResults(); 
            }
            quiz = testQuestions[i]
            return buildQuiz();
        }
    }
}

// function that shows the score you got for the current quiz, and a form that asks you to provide yuor initials to save your score by.
const showResults = () => {
    scoreBtn.style.display = "block";
    let currentTime = timeEl.textContent;
    const score = currentTime.split("").slice(7).join("");
    
    const resultText = 
    ` 
    <form class="resultForm">
        <div>
            <h3> Your Final Score: ${score}</h3>
        </div></br>

        <div>
            <label class="form-label" for="initials-text">Type Your Initials:</label>
            <input type="text" name="initials-text" placeholder="Initials" class="initials form-control" id="initials-text"/>
            <button class="btn btn-outline-success" id="saveScore">Save Score</button>
        </div>
        
    </form>
    `
    quizContainer.innerHTML = resultText
    timeEl.innerHTML = ""

    // function to save the intials, and score to the local storage api
    function saveResult(event){
        event.preventDefault();    

        // gets the value for the initals and trims away empty string space
        const initials = document.getElementById("initials-text").value.trim();

        // get the saved scores array from the local storage if it already exists, then adds the new object of scores and intials if the user provided both of these values, and sends it back to the server as a new array
        var savedScores = JSON.parse(localStorage.getItem("HighScore"))
        if(!savedScores){
            savedScores = []
        }
        if(initials && score){
            savedScores.push({ initials, score })
        }
        localStorage.setItem("HighScore", JSON.stringify(savedScores));
        displayResults();
    }
    document.querySelector(".resultForm").addEventListener("submit", saveResult)
}

// displays the all saved scores that exist on a users local storage
function displayResults(){
    // get any saved score results from local storage (if they exist)
    const savedScores = JSON.parse(localStorage.getItem("HighScore"));

    // display quiz results default page
    quizContainer.innerHTML = 
    `
    <h2 class="text-center"> Your High Scores! </h2></br>
    <div id="display-list">
    </div>
    <div class="d-flex">
        <button type="button" class="btn btn-outline-dark" id="home">Restart Quiz</button>
        <button type="button" class="btn btn-outline-danger mx-5" id="reset">Clear High Scores</button>
    </div>
    `

    // check if saveScores has a value to iterate through
    if(savedScores){
    // filters the values of the local storage array and objects
    function results(values){
        return `
            ${values.filter((value) => value)
            .map(({initials, score }) => {
                return `<li class="list-group-item">${initials}:  ${score}</li> `;
            }).join('')
        }`
    }

    // display the list in the DOM
    $("#display-list").html(`
    <ol class="list-group">
        ${results(savedScores)}
    </ol></br>
    `)
    }

    

    // button handlers for th view scores page, one to restart the quiz and one to clear the local storage of all quiz results
    document.getElementById("home").addEventListener("click", (e) => {e.preventDefault(); document.location.reload();})
    document.getElementById("reset").addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("HighScore");
        displayResults();
    });
}

// button handlers to start quiz game, and to show all saved results
startButton.addEventListener('click',startQuiz);
scoreBtn.addEventListener('click', displayResults);