const quizContainer = document.getElementById("quizFrame");
const scoreBtn = document.getElementById("scores");
const startButton = document.getElementById("start");
const timeEl = document.getElementById("timer")
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

let i = 9;
let quiz = testQuestions[i];

const timer = function() {
    let i = 101;    
    var myTime = setInterval(function(){i--; timeEl.innerHTML= ""; $(timeEl).append( "Time:  " + i )}, 1000)
    setTimeout(function(){clearInterval(myTime)}, ((1000 * 10) * 10))  
}

const buildQuiz = () => {
    var writeQuiz = () => {
        quizContainer.innerHTML = " "

        var questions = quiz.question 
        var answers = quiz.answers
         
        var quizQuest = $("<h3>").text(questions).add("</br>")
        $(quizContainer).append(quizQuest)
        for (x in answers){
            var newAns = $("<div>").text(answers[x])
            var newBtn = $("<button>").text(x).attr("onclick", `subAnswer("${x}")`).addClass("btn btn-outline-dark");
            $(newAns).prepend(newBtn)
            $(quizContainer).append(newAns)
        }
    }
    writeQuiz();
} 

const subAnswer = (clickedBtn) => {
    if(clickedBtn == quiz.correctAnswer) {
        i == i++
        if( i == 10){
            return showResults()
        }
        quiz = testQuestions[i]
        return buildQuiz();
    } else {
        alert("You are incorrect");
        return buildQuiz();
    }
}

const startQuiz = () => {
     timer(); 
     buildQuiz();
}

const showResults = () => {
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
            <input type="text" name="initials-text" class="initials form-control" id="initials-text"/>
            <button class="btn btn-outline-success" id="saveScore">Save Score</button>
        </div>
        
    </form>
    `

    quizContainer.innerHTML = resultText

    function saveResult(e){
        e.preventDefault();

        const initials = document.getElementById("initials-text").value;
        
        var savedScores = JSON.parse(localStorage.getItem("HighScore"))
        if(!savedScores){
            savedScores = []
        }
        savedScores.push({ initials, score })
        localStorage.setItem("HighScore", JSON.stringify(savedScores));

        function results(values){
            return `
                ${values.filter((value) => value)
                .map(({initials, score }) => {
                    return `<li>${initials}:  ${score}</li> `;
                }).join('')
            }`
        }

        quizContainer.innerHTML = 
        `
        <h2> Your High Scores! </h2></br>
        <ol>
            ${results(savedScores)}
        </ol>
        `
        
    }
    document.querySelector(".resultForm").addEventListener("submit", saveResult)
}

startButton.addEventListener('click',startQuiz);
scoreBtn.addEventListener('click', showResults);