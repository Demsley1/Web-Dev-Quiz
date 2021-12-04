const quizContainer = document.getElementById("quizFrame");
const resultConatiner = document.getElementById("results");
const submitButton = document.getElementById("submit");
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

const timer = function() {
    let i = 101;    
    var myTime = setInterval(function(){i--; timeEl.innerHTML= ""; $("#timer").append( "Time:  " + i );}, 1000)
    setTimeout(function(){clearInterval(myTime)}, ((1000 * 10) * 10))    
}

const buildQuiz = num => {
    let i = num
    const quiz = testQuestions[i];

    var writeQuiz = () => {
        quizContainer.innerHTML = " "

        var questions = quiz.question 
        var answers = quiz.answers
    
        var quizQuest = $("<h3>").text(questions).add("</br>")
        $(quizContainer).append(quizQuest)
        for (x in answers){
            var newAns = $("<div>").text(answers[x])
            var newBtn = $("<button>").text(x).attr('id', "answer").addClass("btn-dark");
            $(newAns).append(newBtn)
            $(quizContainer).append(newAns)
    
        }

        const answerButton = document.querySelectorAll("#answer");

        const subAnswer = () => {
            console.log(x)
            if(x == quiz.correctAnswer){
                console.log("you picked correct")
            }
            else{
                alert("wrong");
            }
    
            i++ 
            buildQuiz(i)
        }
        $(answerButton).click(subAnswer)
    }
    writeQuiz();
} 

const startQuiz = () => {
     timer(); 
     buildQuiz(0);
}

const showResults = () => {}


startButton.addEventListener('click',startQuiz);
submitButton.addEventListener('click', showResults);