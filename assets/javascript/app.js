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
