let questionIndex = 0,
    currentQuestion = '',
    questionChoices = '',
    shownQuestionIndex = [],
    wrongAnswers = 0,
    correctAnswers = 0,
    setTimer =15,
    runningTimer = 0,
    timerId;

function init() {
  timerInit();
  questionIndex = Math.floor(Math.random() * (questions.length));
  currentQuestion = question[questionIndex].q;
  questionChoices = question[questionIndex].c;
  console.log(questionIndex, shownQuestionIndex.length, questions.length);
  if (shownQuestionIndex.includes(questionIndex) && shownQuestionIndex.length < questions.length) {
    init();
  }
  else {
    shownQuestionIndex.push(questionIndex);
    $('.game-row').css('display','flex');
    $('.start-area').hide();
    $('.number').text(shownQuestionIndex.length);
    $('total-questions').text(questions.length);
    $('question').text(currentQuestion);
    let choices = "";
    questionChoices.sort(function(){return 0.5 - Math.random()});
    for (let i = 0; i < questionChoices.length; i++) {
      choices += '<button class="btn btn-outline-success answer">' + questionChoices[i] + '</button>';
    }
    $('.choices').html(choices);
  }
}

function timerInit() {
  runningTimer = setTimer;
  $('.timer').text(runningTimer);
  clearInterval(timerId);
  timerId = setInterval(dercrement, 1000);
}

function dercrement() {
  runningTimer--;
  if (runningTimer === 0) {
    timerStop();
    wrongAnswers++;
    $(".choices").html('<div class="times-up"><h3>Times Up!</h3><p>Correct answer is: ' + questions[questionIndex].a + '<p></div>');
    nextQuestion();
  }
}

function timerStop() {
  clearInterval(timerId);
}

function checkAnswer() {
  timerStop();
  if (answer === questions[questionIndex].a) {
    correctAnswers++;
    $(".choices").html('<div class="times-up"><h3 class="h4">You got it!</h3><p>Correct answer is:<span class="correct-answer">' + questions[questionIndex].a + '</span><p></div>');
    nextQuestion();
  }
  else {
    wrongAnswers++;
    $(".choices").html('<div class="result"><h3 class="h4">Wrong!</h3><p>Correct answer is:<span class="correct-answer">' + questions[questionIndex].a + '</span><p></div>');
    nextQuestion();
  }
}

function nextQuestion() {
  if (shownQuestionIndex.length < questions.length) {
    setTimeout(init, 2000);
  }
  else {
    setTimeout(function(){
      $('.status-area').hide();
      $(".question").replaceWith('<h3 class="question">Game Summary</h3>');
      $(".choices").html('<div class="result"><h4>Correct Answers: ' + correctAnswers + '</h4><h4>Wrong Answers: ' + wrongAnswers + '</h4></div>');
      $(".choices").after('<button class="restart-btn btn btn-success">Restart the game!</button>');
    }, 2000);
  }
}

function restart() {
  shownQuestionIndex = [];
  correctAnswers = 0;
  wrongAnswers = 0;
  init();
  $('.status-area').show();
  $('.restart-btn').remove();
}

$(document).on('click', '.start-btn', function() {
  init();
});
$(document).on('click', '.restart-btn', function() {
  restart();
});
$(document).on('click', '.choices .answer', function() {
  let answer = $(this).text();
  checkAnswer(answer);
});
