var currentQuestion = 1;
var totalQuestions = document.getElementsByClassName('question').length;

showQuestion(currentQuestion);

function showQuestion(questionNumber) {
    var questions = document.getElementsByClassName('question');
    var progress = Math.round((questionNumber - 1) / totalQuestions * 100);

    for (var i = 0; i < questions.length; i++) {
        questions[i].classList.remove('active');
    }

    questions[questionNumber - 1].classList.add('active');

    document.querySelector('.progress-bar').style.width = progress + '%';
    document.querySelector('.progress-bar').innerHTML = progress + '%';

    if (questionNumber === 1) {
        document.getElementById('prevBtn').style.display = 'none';
    } else {
        document.getElementById('prevBtn').style.display = 'inline';
    }

    if (questionNumber === totalQuestions) {
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('submitBtn').style.display = 'inline';
    } else {
        document.getElementById('nextBtn').style.display = 'inline';
        document.getElementById('submitBtn').style.display = 'none';
    }
}

function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

function prevQuestion() {
    if (currentQuestion > 1) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

// document.getElementById('surveyForm').addEventListener('submit', function (event) {
//     event.preventDefault();

//     var formData = new FormData(this);

//     for (var pair of formData.entries()) {
//         console.log(pair[0] + ': ' + pair[1]);
//     }
// });

